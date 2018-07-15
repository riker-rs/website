# Model & Customization

Riker requires a `Model` to set the message type used throughout the system and specify modules that provide core services. `Model` is a trait that can be implemented on a Rust type which is then used to create the `ActorSystem`.

##  Model Trait
Let's take a look at the `Model` trait:

```rust
pub trait Model : Sized {
    /// The message type used throughout the system.
    /// `Actor.receive` expects this type
    type Msg: Message;

    /// Dispatcher executes actors and futures
    type Dis: Dispatcher;

    /// Logger provides global logging, e.g. info!("hello");
    type Log: LoggerProps<Msg = Self::Msg>;

    /// Dead letters subscribes to the dead letters channel
    type Ded: DeadLetterProps<Msg = Self::Msg>;

    /// Timer provides message scheduling, e.g. `ctx.schedule_once`
    type Tmr: TimerFactory<Msg = Self::Msg>;

    /// Event store provides the storage system for events/messages
    type Evs: EventStore<Msg=Self::Msg>;

    /// Event store manager provides storing and retreiving of events/messages 
    type Esm: EsManagerProps<Msg = Self::Msg, Evs = Self::Evs>;

    type Tcp: IoManagerProps<Msg = Self::Msg>;
    type Udp: IoManagerProps<Msg = Self::Msg>;
}
```

The `Model` trait consists of various trait types that are used to customize a Riker system, including the message type.

## Default Model

A default model is provided by the `riker-default` crate that uses default Riker modules but still allows you to specify your message type (protocol).

Using the default model:

```rust
extern crate riker;
extern crate riker_default;
 
use riker::actors::*;
use riker_default::DefaultModel;
 
// Get a default model with String as the message type
let model: DefaultModel<String> = DefaultModel::new();
let sys = ActorSystem::new(&model).unwrap();
```

The default model helps get the initial stages of your application started. It's also a good choice for integration tests. When you're ready to use other modules, for example an event store module for a specific database, you can use your own model.

## Custom Model

Since `Model` is a trait it can be implemented on a simple struct.

Let's look at how we can create a model to change the event store and logging modules:

```rust
extern crate riker;
extern crate riker_default;
 
use riker::actors::*;
use riker_default::*; // <-- we're still going to use some default modules

struct MyModel;

impl Model for MyModel {
    type Msg = String;
    type Dis = ThreadPoolDispatcher;
    type Ded = DeadLettersActor<Self::Msg>;
    type Tmr = BasicTimer<Self::Msg>;
    type Esm = EsManagerActor<Self::Evs>;
    type Evs = Redis<Self::Msg>; // <-- a module to provide Redis storage 
    type Tcp = TcpManager<Self::Msg>;
    type Udp = TcpManager<Self::Msg>;
    type Log = MyLogger<Self::Msg>; // <-- our own Log module
}

let sys = ActorSystem::new(&MyModel).unwrap();
```

