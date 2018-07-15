# Actor Selection

The primary means to interact with an actor is through it's actor reference (`ActorRef`). Since every actor also has a path it's possible to 'lookup' an actor by that path. It's also possible to interact with all actors that are part of a path.

For example, if an actor is known to live at `/user/comms/high_gain_1`, but we don't have the actor reference for this actor, we can perform a selection:

```rust
let hga = ctx.selection("/user/comms/high_gain_1").unwrap();
```

This will return an `ActorSelection`. In some ways an `ActorSelection` behaves like an `ActorRef` but with key distinctions. The most prominent similarity is that `ActorSelection` implements `Tell`, meaning that messages can be send to the selection, for example:

```rust
let hga = ctx.selection("/user/comms/high_gain_1").unwrap();
hga.tell("I've arrived safely".into(), None);
```

While this example highlights how it's possible to message actors based on their path in practise it should be carefully considered. `ActorRef` is almost always the better choice for actor interaction since messages are directly sent to the actor's mailbox without any preprocessing or cloning. However there are several use cases where `ActorSelection` makes sense:

- You know the path of an actor but due to design you don't have its `ActorRef`
- You want to broadcast a message to all actors within a path

A key distinction of `ActorSelection` is that is can represent more than one actor. It is possible to select all actors under an actor path. It's possible for example to send the same message to all children of a specific actor.

```rust
let sel = ctx.selection("/user/home-control/lighting/*").unwrap();
sel.tell(Protocol::Off, None);
```

In this example an actor responsible for lighting in a home has a child actor for each individual light. If we want to turn off all lights a control message (`Protocol::Off`) could be sent to `/user/home-control/lighting/*`. Each child actor will receive the same message.

!!! note
    Paths are relative to the location where the selection is being made. E.g. from the actor `lighting`'s context, all children could be selected using `ctx.selection("*")`.

We've seen that `ActorSelection` provides flexibility for certain use cases such as when an `ActorRef` isn't known at compile time, but more specifically for messaging multiple actors. This comes at the cost of traversing part of the actor hierarchy and cloning messages.

Next we'll see how Channels provide publish/subscribe features to enable actor choreography.

[Channels](channels.md)