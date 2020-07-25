# Message Scheduling

Riker's timer module provides scheduling features that allow messages to be sent after a given duration or at a specific time. Timer methods are exposed on both `ActorSystem` and `Context`.

## One-time scheduling

There are two methods that provide one-time scheduling:

- `schedule_once` schedules a message to be sent after a given delay.
- `schedule_at_time` schedules a message to be sent at a given specific time.

Examples:

```rust
let delay = Duration::from_secs(20);
let actor = ctx.actor_of::<MyActor>("my-actor").unwrap();

ctx.schedule_once(delay,
                actor,
                None,
                "that's one small step for man".into());
```

Here a message is scheduled to be sent to an actor after 20 seconds.

```rust
let time = SystemTime::now();
let actor = ctx.actor_of::<MyActor>("my-actor").unwrap();

ctx.schedule_at_time(time,
                    actor,
                    None,
                    "one giant leap for mankind".into());
```
Here a message is scheduled to be sent at the specific time `time`.

## Repeat scheduling

Messages can be scheduled to be repeatedly sent at specific intervals:

- `schedule` method schedules a message to be repeatedly sent at a given interval.

Example:

```rust
let delay = Duration::from_millis(100);
let iterv = Duration::from_millis(500);
let actor = ctx.actor_of::<MyActor>("my-actor").unwrap();

ctx.schedule(delay,
            interv,
            actor,
            None,
            "a scheduled msg".into());
```

Here a message is scheduled to be repeated every 500 milliseconds. There is also a 100 millisecond initial delay, i.e. the duration before repeating of the message begins.

!!! note
    Riker's default timer module is not persistent meaning that any scheduling is lost when an application is stopped. It's optimized for short dated durations from a few milliseconds to 48 hours, or your average time between deployments.

## Cancelling

When scheduling a message a schedule ID is returned which can be used at a later time to cancel the schedule.

Example:

```rust
let id = ctx.schedule(delay,
            interv,
            actor,
            None,
            "a scheduled msg".into());

ctx.cancel_schedule(id);
```

Canceling a schedule removes it from the timer and the message will no longer be sent.

Some example use cases of message scheduling include: 

- To wait for a specific time for other actors to provide input, such as bidding systems
- As part of workflow to provide default messages after a timeout interval
- To periodically wake up an actor to check a resource, such as a queue, IO or sensor
- To periodically publish or broadcast messages to other actors

Message scheduling is a core feature of concurrent systems and can drive applications to complete their objectives.

We've covered the basics of the Riker Framework. Other topics include:

[Configuration](config)

[Running Futures](futures)

[Logging](logging)
