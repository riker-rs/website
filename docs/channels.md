# Channels

Riker channels allow for messages to be published to interested subscribers. Channels are actors so messaging a channel works the same way as any othe actor.

## Starting a channel

The `riker::actors::channel` function returns a channel:

```rust
let chan: ChannelRef<PowerStatus> = channel("power-status", &sys).unwrap();
```

## Subscribing

To subscribe to and receive messages from a channel an actor must support the message type of the channel.

In the above example we created a channel that publishes `PowerStatus` messages, notifying components in an autonomous vehicle of changes in available battery energy. Let's create two actors that will subscribe to the channel so they can receive this message:

```rust
#[actor(PowerStatus)]
struct GpsActor;

#[actor(PowerStatus)]
struct NavigationActor;

...

// Each actor would send a Subscribe message to the
// channel, typically in `pre_start`. E.g.:
let sub = Box::new(ctx.myself());
chan.tell(Subscribe { actor: sub, topic: "*".into() }, None);

```

Here we have two actors that each need to receive status changes in available battery power so they can adapt their behavior. They both must support the `PowerStatus` message that the channel publishes. You'll notice that we need to use `Box` to create a trait object of `Tell<PowerStatus>`.

The `Subscribe` message is used to subscribe an actor to a channel, which you'll notice requires a topic. A channel consists of one or more topics, typically that have a common theme. When a message is published it is published to a specific topic on the channel.

!!! note
    When subscribing to a topic, if it does't already exist it will be created and any future messages published to it will be sent to the subscriber.

## Publishing

The `Publish` message is used to publish to a channel:

```rust
let stat = PowerStatus { ... };
chan.tell(Publish { msg: stat, topic: "power".into() }, None);
```

This message will be cloned and sent to each subscriber of `my-topic` on the channel `chan`.

In this case, it may be that the `GpsActor` will choose to lower the GPS sampling rate if the battery level falls below a certain percentage, thus lowering the power used. The `NavigationActor` might override any active mission and force the vehicle to return to base if the power level drops to a critical level. The same use of channels could be applied to ecommerce platforms, payments systems, warehouse logistics, shipping tracking, etc.

## Common channels

When the actor system starts serveral channels are created. These channels help developers receive messages about system events and failed messages.

### System events

The System Events channel provides events including `ActorCreated`, `ActorRestarted` and `ActorTerminated` events. Each of these are reprented as topic `actor.created`, `actor.restarted` and `actor.terminated` topics respectively. The message type is `SystemEvent` enum

Example:

```rust
sys.sys_events()
    .tell(Subscribe { actor: sub1, topic: "actor.created".into() }, None);
```

!!! note
    System events are considered system messages and therefore a subscriber's `Actor::sys_recv` method will be invoked instead of `Actor::recv`.

### Dead letters

The Dead Letters channel publishes messages that failed to be delivered to their destination actor. This channel can be subscribed to to handle those messages. Note: Dead letters use `Debug` representation of the original undelivered message, limiting the use of dead letters to logging of failed messages rather than actually acting upon them.

Example:

```rust
sys.dead_letters().tell(Subscribe { actor: sub1, topic: "*".into() }, None);
```

Channels form an integral part of the Riker system and provide essential services to creating dynamic applications where actors collaborate to achieve a common goal.

Next we'll look at scheduling messages to be sent at a time in the future.

[Scheduling Messages](scheduling.md)