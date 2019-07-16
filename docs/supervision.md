# Fault Tolerence

Riker applications exhibit fault tolerant behavior through self-healing. This is achieved by supervision - each actor has a supervisor that is responsible for determining what to do if the actor panics. In Riker, an actor's parent is its supervisor. This 'parental supervision' is a natural fit since the actor system is a hierarchy.

When an actor fails we can't guarantee its state is not corrupted. Its parent has three choices (strategies):

- `Restart` the actor
- `Escalate` up to the next supervisor
- `Stop` the actor

Supervision isolates failures and errors don't leak or cascade. Instead the system can decide the best way to restore to a clean, working state, or to gracefully stop.

The supervision strategy an actor should use to supervise its children can be set in its `supervisor_strategy` method:

```rust
fn supervisor_strategy(&self) -> Strategy {
    Strategy::Stop
}
```

In this case, if a child fails it will choose to stop it.

!!! note
    If `supervisor_strategy` is not set the default implementation is `Strategy::Restart`.

## Mailboxes

An actor has its own mailbox that messages are queued to during message delivery. When a message is sent to an actor it is added to the actor's mailbox and the actor is then scheduled to run. If during handling of a message the actor fails (panics) messages can still continue to be sent to the actor since the mailbox is separate. This allows the supervisor to handle the failure without losing messages - a restarted actor will then continue handling the queued messages once it restarts.

An actor's mailbox continues to exist until its actor is stopped or the system is stopped.

## Restart Strategy

```rust
fn supervisor_strategy(&self) -> Strategy {
    Strategy::Restart
}
```

The restart strategy attempts to restart the actor in its initial state, which is considered to be uncorrupted.

The sequence followed is:

1. The actor's mailbox is suspended. Messages can be received but they won't be handled
2. All children of the failed actor are sent termination requests
3. Wait for all children to terminate - a non-blocking operation
4. Restart the failed actor
5. Resume the actor's mailbox and message handling

## Escalate Strategy

```rust
fn supervisor_strategy(&self) -> Strategy {
    Strategy::Escalate
}
```

The escalate strategy moves the decison of how to handle the failure up to the supervisor's parent. This works by failing the current supervisor and its parent will determine how to handle the failure.

The sequence followed is:

1. The actor's mailbox is suspended. Messages can be received but they won't be handled
2. The supervisor escalates and its mailbox is suspended
3. The new supervisor decides which supervision strategy to follow

## Stop Strategy

```rust
fn supervisor_strategy(&self) -> Strategy {
    Strategy::Stop
}
```

The stop strategy stops the failed actor, removing it and its mailbox from the system.

## Dead letters

When an actor is terminated all existing `ActorRef`s are invalidated. Messages sent (using `tell`) are instead rerouted to dead letters, a dedicated channel that publishes undeliverable messages to any interested actors. Riker has a default subscriber, `dl_logger`, that simply logs dead letter messages using `info!`.

## Supervisor Design

Good supervisor design is key to designing resilient, fault tolerent systems. At the core of this is creating an actor hierarchy that matches message flow and dependency.

Next we'll see how actor paths can be utilized to message actors without an actor reference and broadcast to entire segments of the actor hierarchy.

[Actor Selection](selection)
