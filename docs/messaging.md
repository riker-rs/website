# Multi-type Messaging

In real world applications, actors will typically receive different message types and execute different behavior based on the type received.

So far you've seen a simple examples where an actor's message type is defined in the `Actor::Msg` associated type. More specifically this defines an actor's mailbox type. To allow an actor to receive multiple message types Riker provides a `Receive<T>` trait and the `#[actor]` attribute.

Let's see how these are used:

```rust
use riker::actors::*;
use std::time::Duration;

// Define the messages we'll use
#[derive(Clone, Debug)]
pub struct Add(i32);

#[derive(Clone, Debug)]
pub struct Sub(i32);

#[derive(Clone, Debug)]
pub struct Print;

// Define the Actor and use the `actor` attribute macro
// to specify which messages it will receive
#[actor(Add, Sub, Print)]
struct Counter {
  count: i32,
}

impl Counter {
  fn actor() -> Counter {
    Counter { count: 0 }
  }
}

impl Actor for Counter {
  // we used the #[actor] attribute so CounterMsg is the Msg type
  type Msg = CounterMsg;

  fn recv(&mut self, ctx: &Context<Self::Msg>, msg: Self::Msg, sender: Sender) {
    // Use the respective Receive<T> implementation
    self.receive(ctx, msg, sender);
  }
}

impl Receive<Add> for Counter {
  type Msg = CounterMsg;

  fn receive(&mut self, _ctx: &Context<Self::Msg>, msg: Add, _sender: Sender) {
    self.count += msg.0;
  }
}

impl Receive<Sub> for Counter {
  type Msg = CounterMsg;

  fn receive(&mut self, _ctx: &Context<Self::Msg>, msg: Sub, _sender: Sender) {
    self.count -= msg.0;
  }
}

impl Receive<Print> for Counter {
  type Msg = CounterMsg;

  fn receive(&mut self, _ctx: &Context<Self::Msg>, _msg: Print, _sender: Sender) {
    println!("Counter value: {}", self.count);
  }
}

fn main() {
  let sys = ActorSystem::new().unwrap();

  let props = Props::new(Counter::actor);
  let actor = sys.actor_of(props, "counter").unwrap();

  actor.tell(Print, None);
  actor.tell(Add(10), None);
  actor.tell(Print, None);
  actor.tell(Sub(5), None);
  actor.tell(Print, None);

  // Actors runs asyncronously, we need to force main thread to wait
  // so that our actor has opportunity to process the messages
  std::thread::sleep(Duration::from_millis(500));
}
```

In this example we've used `#actor[Add, Sub, Print]` to set up the actor to receive `Add`, `Sub` and `Print` types. For each of these the `Receive<T>` trait is implemented on the actor, defining how each message should be handled.

!!! note
    When using the `#[actor()]` attribute the actor's `Msg` associated type should be set to '[DataType]Msg'. E.g. if an actor is a struct named `MyActor` then `Actor::Msg` associated type will be `MyActorMsg`.

By utilizing `Receive<T>` and `#[actor]` complex message handling can be defined clearly and concisely. For more advanced messaging examples see [Advanced Messaging](advanced).

In the next section we'll explore the relationship between actors and how actors form an hierarchy.

[Actor Hierarchy](hierarchy)
