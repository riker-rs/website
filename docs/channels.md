# Channels

Riker channels allow for messages to be published to interested subscribers. Channels are actors so starting and messaging a channel works the same way as any othe actor.

## Starting a channel
The `Channel::props()` method returns a `Props` that can be used to create a channel using `actor_of`:

```rust
let chan = sys.actor_of(Channel::props(), "my-channel").unwrap();
```

Other actors that get started could be endowed with the channel's `ActorRef` so that they can subscribe.

## Subscribing
The `ChannelMsg::Subscribe` message is used to subscribe to a channel:

```rust
chan.tell(Subscribe("my-topic".into(), sub1), None);
```

If we have an actor `sub1` we can subscribe that to the `chan` channel that we started earlier. Since the actor to be subscribed is provided in the message it means that any actor can subscribe another actor to a channel. You'll also notice that `Subscribe` requires a topic.

A channel consists of one or more topics, typically that have a common theme. When a message is published it is published to a specific topic on the channel.

!!! note
    When subscribing to a topic, if it does't already exist it will be created and any future messages published to it will be sent to the subscriber.

## Publishing
The `ChannelMsg::Publish` message is used to publish to a channel:

```rust
let msg = Publish("my-topic".into(), "Building better worlds".into());
chan.tell(msg, None);
```

This message will be cloned and sent to each subscriber of `my-topic` on the channel `chan`.

## Example
Let's take a look at an example:

```rust
// start two instances of MyActor
let props = Props::new(Box::new(MyActor::actor));
let sub1 = sys.actor_of(props.clone(), "sub1").unwrap();
let sub2 = sys.actor_of(props, "sub2").unwrap();

// start a channel
let chan = sys.actor_of(Channel::props(), "my-channel").unwrap();

// subscribe actors to channel
chan.tell(Subscribe("my-topic".into(), sub1), None);
chan.tell(Subscribe("my-topic".into(), sub2), None);

// publish a message
let msg = Publish("my-topic".into(), "Remember the cant!".into());
chan.tell(msg, None);
```

Here we start two actors that will be subscribers. A channel `my-channel` is started and we send a `ChannelMsg::Subscribe` for each of the subscribers to subscribe. We then use `chan.tell` to publish a message, which will result in both `sub1` and `sub2` receiving a copy of the message.

## Common channels
When the actor system starts serveral channels are created. These channels help developers receive messages about system events and failed messages.

### Event stream
The event stream provides system events including `ActorCreated`, `ActorRestarted` and `ActorTerminated` events. Each of these are reprented as topic `actor.created`, `actor.restarted` and `actor.terminated` topics respectively.

Example:

```rust
sys.event_stream().tell(Subscribe("actor.created".into(), sub1), None);
```

### Dead letters
Dead letters is a channel that publishes messages that fail to be delivered to their destination actor. This channel can be subscribed to to handle those messages.

Example:

```rust
sys.dead_letters().tell(Subscribe(All, sub1), None);
```

### Default stream
The default stream is a general purpose channel for the user to utilize. It saves the need to create a dedicated channel.

Example:

```rust
sys.default_stream().tell(Subscribe("my-topic".into(), sub1), None);
```

Channels form an integral part of the Riker system and provide essential services to creating dynamic applications where actors collaborate to achieve a common goal.

Next we'll look at scheduling messages to be sent at a time in the future.

[Scheduling Messages](scheduling)