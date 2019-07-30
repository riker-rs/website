# Persisting State

Riker supports persistence so that actors can restore their state when they are restarted. Riker takes an event sourcing approach to persisting data, whereby only changes to state and not the entire current state are persisted. These changes to an actor's state are considered events and are appended to the underlying event store. Actors that persist their state are often referred to as Persistent Actors.

## Event Sourcing

When a persistent actor restarts its state can be restored by replaying all events in the event store, specific to the actor, in the order in which they we're originally persisted. Event sourcing has several advantages over traditional data persistence methods.

Since a persistent actor maintains its state in memory it's not necessary to continually read data from storage. Events are only read from the underlying storage when an actor starts. This allows for extremely high transaction rates.

Event sourcing simplifies data storage since events are typically serialized objects that can be persisted to a single column or field in a database. Other non-database storage methods can also be leveraged, such as persistent queues or transaction logs. The complexities of data querying, such as database schema design and indexes aren't pertinent to event sourcing. In addition, since data structure is simplified migration between data storage solutions is made easier.

An additional added value is that you get inherent auditing through the immutable nature of event sourcing - every event is recorded and remains in perpetuity.

## Enabling Persistence

An actor can be configured to persist state, i.e. be a persistent actor by returning a `PersistenceConf` on the `persistence_conf` method of the `Actor` trait:

```rust
struct MyActor {
    id: String,
    val: u32,
}

fn persistence_conf(&self) -> Option<PersistenceConf> {
    let conf = PersistenceConf {
        id: self.id.clone(),
        keyspace: "my-actor".to_string()
    };

    Some(conf)
}
```

The combiniation of `id` and `keyspace` allow the underlying event storage to separate events so that when an actor re/starts only the events for that actor are queried. How these fields are used depends exclusively on the event store module used.

!!! warning
    Events must be specific to an actual actor instance. Load balancing two actors representing the same logical entity, for example a specific user, will conflict since only the actor handling the event will update its state. 

## Persisting Events

A persistent actor uses the `ctx.persist_event` method to actually persist state. Like all other `Actor` operations in Riker this is a non-blocking operation:

```rust
fn receive(&mut self,
            ctx: &Context<Self::Msg>,
            msg: Self::Msg,
            _sender: Option<ActorRef<Self::Msg>>) {
    
    ctx.persist_event(msg); // <-- schedule event to be persisted
}
```

Here we see that `ctx.persist_event` is used to request the event to be stored. In this case we're using the message received as the event, but this could be any rust type that is part of your configured protocol. There are two important concepts to highlight at this point:

- `persist_event` is a non-blocking operation and execution will continue
- There are no guarantees that the event will be successfully stored

Since these two factors hold it is important to refrain from making any state change until it is known that the event has been successfully written to the event store. The event store is responsible for signaling back to the actor when an event has been successfully committed to storage.

When `ctx.persist_event` is invoked a persistent actor enters a 'persisting' state. During this state no further messages will be handled by the actor until the event store signals back that the event was successfully stored. This occurs to provide a guarantee that when the next message to be handled by `receive` the actor has the latest state.

An actor's `apply_event` method is invoked when an event is successfully stored:

```rust
fn apply_event(&mut self, _ctx: &Context<Self::Msg>, evt: Self::Msg) {
    self.val = evt; // <-- safe to update the state

    // Its also safe to create side effects here
    // e.g.
    // `some_actor.tell("your support request was received", None);`
}
```

It's here in `apply_event` that state can be safely mutated, since any failure at this stage means that the event will be replayed when the actor restarts.

!!! warning
    Never make state changes in `receive` of a persistent actor.

## Replaying Events

When a persistent actor starts its events are queried based on the configured `id` and `keyspace`. It is guaranteed that no messages will be handled by `receive` until the persistent actor finishes replaying all events. The query to load events is a non-blocking operation.

Once all events have been queried the `replay_event` method is invoked for each event:

```rust
fn replay_event(&mut self, _ctx: &Context<Self::Msg>, evt: Self::Msg) {
    self.val += evt; // <-- safe to update the state

    // It is *not* safe to create side effects in replay_event
}
```

`replay_event` is similar to `apply_event` in that state should be mutated in this method. However, there may be undesirable side effects during replay that were necessary during the initial persistence, such as sending other messages. For example, if your actor sends email messages to customers each time they make a request you don't want to send these messages each time your actor restarts.

Let's see a complete example of a persistent actor:

```rust
struct MyActor {
    id: String,
    val: u32,
}

impl Actor for MyActor {
    type Msg = u32;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                _sender: Option<ActorRef<Self::Msg>>) {
        
        ctx.persist_event(msg);
    }

    fn persistence_conf(&self) -> Option<PersistenceConf> {
        let conf = PersistenceConf {
            id: self.id.clone(),
            keyspace: "my-actor".to_string()
        };

        Some(conf)
    }

    fn apply_event(&mut self, _ctx: &Context<Self::Msg>, evt: Self::Msg) {
        self.val += evt;
    }

    fn replay_event(&mut self, _ctx: &Context<Self::Msg>, evt: Self::Msg) {
        self.val += evt;
    }

}
```

## Event Store

In Riker events are persisted to an 'event store' configured in the model when the actor system is created. The event store is responsible for storing and loading events. To support your specific storage or database the `EventStore` trait can be implemented:

```rust
pub trait EventStore : Clone + Send + Sync + 'static {
    type Msg: Message;

    fn new(config: &Config) -> Self;

    fn insert(&mut self, id: &String, keyspace: &String, evt: Evt<Self::Msg>);

    fn load(&self, id: &String, keyspace: &String) -> Vec<Self::Msg>;
}
```

An implementation of `EventStore` simply needs to provide an instance of `Self` in the `new` function that will be invoked when the actor system starts. `insert` and `load` methods perform any serialization and deserialization necessary. The methods are invoked when `persist_event` is used and when an actor starts respectively.

!!! note
    Since an event store only contains events and not whole state data can be serialized and stored in a single column of a database table for example. CBOR, JSON, MessagePack or any other serialization format could be used.

    The default model uses a simple in-memory event store which can be useful in tests and simple applications. All events are lost when the actor system is stopped.

## CQRS

Command Query Responsibility Separation (CQRS) builds of top of event sourcing to provide a more structured approach to persistence. Event sourcing alone works well for restoring individual actor state in an actor system with a fixed number of actors. This could be taken further so that data entities can be modeled as actors. For example, an entity could be a User, Account, Post, Transaction, Order, etc, where every instance is represented by its own actor instance.

To make changes to an entity commands are sent to the actor representing that entity. For example, to change the password of a `User` entity an `UpdatePasswordCmd` can be sent, or to disable the user a `DisableUserCmd` can be sent. When an actor receives a command it validates it and then emits an event that will be persisted and applied:

```
UpdatePasswordCmd => PasswordUpdatedEvt
DisableUserCmd => UserDisabledEvt
```

To help with setting up entities and command management Riker CQRS is a separate crate (`riker-cqrs`) that introduces:

- Entity management
- Command based messaging

Since each entity has its own actor there needs to be a coordinator that creates actors when needed and routes commands to the right actor. Basic bookkeeping is also required, so that actors can sleep and be removed from memory after a period of inactivity and then restored when they're needed to handle a command.

Let's look at how to set up an entity manager that represents bank accounts `BankAccount`:

```rust
use riker_cqrs::*;

let model: DefaultModel<TestMsg> = DefaultModel::new();
let sys = ActorSystem::new(&model).unwrap();

let em = Entity::new(&sys,
                    BankAccountProps,
                    "BankAccont",
                    None).unwrap();
```

Here an `Entity` has been created that will manage all instances of bank accounts. It will create new actors if necessary and route commands.

Let's create a new bank account and make a first deposit:

```rust
let number = "12345678";
let name = "Dolores Abernathy";

// create bank account
let cmd = CQMsg::Cmd(number.into(), Protocol::CreateAccountCmd(name.into()));
em.tell(cmd, None);

// deposit $1000
let cmd = CQMsg::Cmd(number.into(), Protocol::DepositCmd(1000));
em.tell(cmd, None);
```

Commands require an ID and based on that ID the entity manager will route the command to the actor for that ID. If there is no currently live actor in memory for that ID the manager will start an actor. Any events associated with that ID will be loaded and the actor state restored before handling the command.

Instead of managing actor creation directly using `actor_of` the entity manager does this instead. You will have noticed that `Entity::new` in the example was passed `BankAccountProps`. This is a struct that implements the `EntityActorProps` trait.

Since each entity actor requires its own unique ID the standard `Props` used in `actor_of` is not sufficient. Instead `EntityActorProps` is implemented:

```rust
struct BankAccountProps;

impl EntityActorProps for BankAccountProps {
    type Msg = Protocol;

    fn props(&self, id: String) -> BoxActorProd<Self::Msg> {
        Props::new_args(Box::new(BankAccountActor::new), id)
    }
}
```

!!! note
    If other systems outside of the actor system need to view the current state, which is generally the case, materialized views can be generated and stored in a separate data storage each time an event is persisted. This provides a clear separation between the command-side and query-side of state management.

By default, if an entity actor instance has no activity for more the 120 seconds the manager will put the actor in to a sleep state. During this state the actor and its state is no longer in memory. When a command is sent to an actor in sleep state it is woken up by the manager, its state restored, and the command handled.

The inactivity time to sleep can be changed in `riker.toml`:

```toml
[cqrs]
# number of seconds of inactivity after which a cqrs actor will sleep
sleep_after_secs = 120
```

To see a example project using Riker CQRS click here [TODO]
