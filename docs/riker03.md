# Riker 0.3 Release Notes

The release of `Riker 0.3` has introduced several major improvements to the design of the framework.

## Message Type System

Prior to `Riker 0.3` an actor system would share the same message type for all actors. This had critical limitations for applications, including:

- Cumbersome message type matching
- Performance hit since enum size is largest variant
- Library developers would need to create their own actor system

`Riker 0.3` has addressed these limitations by:

Each actor has its own message type:

```rust
struct MyStringActor;

impl Actor for MyStringActor {
    type Msg = String;

    fn recv(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: Sender) {

        println!("received String {}", msg);
    }
}

struct MyU32Actor;

impl Actor for MyU32Actor {
    type Msg = u32;

    fn recv(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: Sender) {

        println!("received u32 {}", msg);
    }
}

let props = Props::new(Box::new(MyStringActor::new));
let my_string = sys.actor_of(props, "my-string").unwrap();
my_string.tell("hello".to_string(), None);

let props = Props::new(Box::new(MyU32Actor::new));
let my_u32 = sys.actor_of(props, "my-u32").unwrap();
my_u32.tell(1, None);
```

Introduction of a `Receive<T>` trait and `#[actor]` attribute to streamline actors receiving more than one message type.

```rust
#[actor(String, u32)]
struct MyActor;

impl Actor for MyActor {
    type Msg = MyActorMsg;

    ...
}

impl Receive<String> for MyActor {
    type Msg = MyActorMsg;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: String,
                sender: Sender) {

        println!("received String {}", msg);
    }
}

impl Receive<u32> for MyActor {
    type Msg = MyActorMsg;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: u32,
                sender: Sender) {

        println!("received u32 {}", msg);
    }
}

let props = Props::new(Box::new(MyActor::new));
let my_actor = sys.actor_of(props, "my-actor").unwrap();
// send String
my_actor.tell("hello".to_string(), None);
// send u32
my_actor.tell(1, None);
```

Introduction of `BasicActorRef`, an un-typed reference to interact with actors when the typed ActorRef is not available.

```rust
// Using the example actor above

let sel = sys.select("/user/my-actor").unwrap();
// send String
sel.try_tell("hello".to_string(), None);
// send u32
sel.try_tell(1, None);
```

`try_tell` is the method used to send messages to `BasicActorRef`s, with a result return type used to indicate if the actor accepted the message type. If the message provided is not supported by the actor `Err` will be returned.

## Removal of Model

`Riker 0.3` used the Model trait to customize the actor system. This was found to be cumbersome and unneccessary. Riker is now included in a single crate and an actor system can be created with a single line that will use built-in defaults. When customization is required a builder is available.

```rust
// Typical pre-0.3 model:
// let model: DefaultModel<String> = DefaultModel::new();

// 0.3 requires only ActorSystem
let sys = ActorSystem::new().unwrap();
```

## Execution Fixed to Futures::ThreadPool

Previous versions of Riker allowed for different futures executors to be used as part of system customization. This caused many issues especially with the evolution of Rust's async/await!. Futures could not be reliably run within actors - a major blocker on Riker's use in production systems. The decision was made to tie Riker's execution to futures::ThreadPool, which was the default executor previously.

This also allows Rust applications to pass around futures between Riker and other application components that use ThreadPool. The builder allows a ThreadPool reference to be passed.

```rust
// clone the executor reference from its original
let exec = exec.clone();

let sys = SystemBuilder::new()
                        .exec(exec)
                        .create()
                        .unwrap();
```

## Removal of Main Thread

Prior to `Riker 0.3` a main thread, or kernel, was used that would be tasked with scheduling actors for execution. This prevented the ability to support a truly multi message typed system and also had a performance impact. In `Riker 0.3`, each actor maintains its own lightweight kernel.

## Trait Objects

`Riker 0.3` no longer handles Actors as trait objects, as a result of each actor using its own kernel. This removes the limitations inherent with trait objects and improves performance.

## Important Unresolved Limitations

Event Sourcing has not be made available, yet, in `Riker 0.3`. This has been impacted by the message system redesign and we're looking at a redesign of what event sourcing should look like in `Riker 0.3`.

We'd also like to point out that `Riker 0.3` has not yet gone through basic performance optimization, removing unneccessay clones, using references over values where possible, etc. In particular `ActorSystem` requires optimization.
