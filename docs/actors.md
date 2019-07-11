# Getting Started

This guide will take you through the fundementals of the Riker Framework, starting with the basics of the Actor Model through to more advanced topics such as application resilience.

If you're familiar with the Actor Model and have used other actor frameworks you will find Riker familair. In particular Riker has been inspired by Scala's [Akka](https://akka.io) and has taken some of the core concepts and terminology from that project.

If you've never used actors in application development before this documentation aims to be concise and easy to understand. No prior knowledge of actors is necessary.

We welcome and encourage contributions to this guide. Please feel free to create Github issues with feedback or create PRs with changes. This documentation's source lives at: [https://github.com/riker-rs/website](https://github.com/riker-rs/website).

!!! note
    Riker is pre-1.0 and as such the framework is evolving. You can expect some API level changes but we do strive to keep breaking changes to an absolute minimum. Between versions 0.1 to 0.2.3 there was only one minor API change, for example.

## Actors

The actor model is a conceptual model to deal with concurrent computation<sup>[1]</sup>. At the core of the Riker framework are four main components:

- `ActorSystem` - Every Riker application has an `ActorSystem` that manages actor lifecycles
- `Actor` - Rust types that implement the `Actor` trait so they may receive messages
- `Props` - Each `Actor` requires a `Props` to describe how an `Actor` should be created
- `ActorRef` - A lightweight type that is inexpensive to clone and can be used to interact with its underlying `Actor` such as sending messages to it

Let's look at each of these and see how a simple application is created.

## Defining Actors

An Actor is the fundamental unit of computation. Actors communicate only through messages in an asynchronous fashion. An actor can perform three distinct action based on the message it receive:

- send a finite number of messages to other actors
- create a finite number of new actors
- change its state or designate the behavior to be used for the next message it receives

Actors interact with each other by passing messages. There is no assumed order to the above actions and they could be carried out concurrently. Two messages that are sent concurrently can arrive in either order.

To define an actor the system needs to understand how an actor should handle messages it receives. To do this, implement the `Actor` trait on your data type and at a minimum provide a `recv` method.

Here's the Rust code:

```rust
struct MyActor;

impl Actor for MyActor {
    type Msg = String;

    fn recv(&mut self,
            ctx: &Context<String>,
            msg: String,
            sender: Sender) {

        println!("received {}", msg);
    }
}
```

In this example a simple struct `MyActor` implements the `Actor` trait. When a message is sent to `MyActor` it is scheduled by the system for immediate execution. The `recv` function is invoked and the message is printed to stdout.

## Creating Actors

Every application has an `ActorSystem`. The actor system provides actor management and the runtime to execute actors when they're sent messages. It also provides essential services such as starting actors and exposing system services.

To start the actor system:

```rust
let sys = ActorSystem::new().unwrap();
```

Here we see that the actor is started using `ActorSystem::new`.
Once we've started the actor system we're ready to create some actors.

We can also configure the system with a custom name using the `SystemBuilder`:

```rust
let sys = SystemBuilder::new()
                        .name("my-app")
                        .create()
                        .unwrap();
```

Once the actor system is started we can begin to create actors:

```rust
let props = Props::new(Box::new(MyActor::new));
let my_actor = sys.actor_of(props, "my-actor");
```

Every actor requires a `Props` that holds the actor's factory function, in this example `MyActor::new`, and any parameters required by that function. `Props` is then used with `actor_of` to create an instance of the actor. A name is also required so that we can look it up later if we need.

Although this is just two lines of code a lot is happening behind the scenes. Actor lifecycles and state are managed by the system. When an actor starts it keeps the properies in case it needs it again to restart the actor if it fails. When an actor is created it gets its own mailbox for receiving messages and other interested actors are notified about the new actor joining the system.

## Actor References

When an actor is started using `actor_of` the system returns a reference to the actor, an `ActorRef`. The actual actor instance remains directly inaccessible, its lifecycle managed and protected by the system. In Rust terms, the system has and always maintains 'ownership' of the actor instance. When you're interacting with actors you're actually interacting with the actor's `ActorRef`! This is a core concept of the actor model.

`ActorRef` always refers to a specific instance of an actor. When two instances of the same `Actor` are started they're still considered separate actors, each with different `ActorRef`s.

!!! note
    `ActorRef`s are inexpensive and can be cloned (they implement `Clone`) without too much concern about resources. References can also be used in `Props` as a field in another actor's factory method, a pattern known as endowment. `ActorRef` is also `Send`, so it can be sent as a message to another actor.

## Sending Messages

Actors communicate only through sending and receiving messages. They are isolated and never expose their state or behavior.

If we want to send a message to an actor we use the `tell` method on the actor's `ActorRef`:

```rust
let my_actor = sys.actor_of(props, "my-actor");
my_actor.tell("Hello my actor!".to_string(), None);
```

Here we've sent a message of type `String` to our `MyActor` actor. The second parameter let's us specify a sender as an `Option<BasicActorRef>` (type alias `Sender`). Since we're sending the message from `main` and not from an actor we're setting the sender as `None`.

## Example

Let's go back to our `MyActor` and combine what we've seen so far in to a complete example:

`Cargo.toml` dependencies:

```toml
[dependencies]
riker = "0.3"
```

`main.rs`:

```rust
use std::time::Duration;
use riker::actors::*;

struct MyActor;

// implement the Actor trait
impl Actor for MyActor {
    type Msg = String;

    fn recv(&mut self,
            _ctx: &Context<String>,
            msg: String,
            _sender: Sender) {

        debug!("Received: {}", msg);
    }
}

// provide factory and props functions
impl MyActor {
    fn actor() -> Self {
        MyActor
    }

    fn props() -> BoxActorProd<MyActor> {
        Props::new(Box::new(MyActor::actor))
    }
}

// start the system and create an actor
fn main() {
    let sys = ActorSystem::new().unwrap();

    let props = MyActor::props();
    let my_actor = sys.actor_of(props, "my-actor").unwrap();

    my_actor.tell("Hello my actor!".to_string(), None);

    // force main to wait before exiting program
    std::thread::sleep(Duration::from_millis(500));
}
```

Here we've started the actor system and an instance of `MyActor`. Lastly we sent a message to the actor. You'll also notice we also provided a factory function `actor()` and props function `props()` as part of `MyActor`'s implementation.

To see the this example project click [here](https://github.com/riker-rs/examples/tree/master/basic).

!!! note
    If an actor's factory method requires parameters you can use `Props::new_args`. See the Rustdocs for an example.

## Message Guarantees

Riker provides certain guarantees when handling messages:

- Message delivery is 'at-most-once'. A message will either fail to be delivered, or delivered one time. There is no repeat delivery of the same message.
- An actor handles one message at any time
- Messages are are stored in an actor's mailbox in order that they are received

On this page you learned the basics of creating a Riker application using actors. Let's move on the next section to see are more comprehensive example using multiple message types:

[Sending multiple message types](messaging)

[1]: https://en.wikipedia.org/wiki/Actor_model