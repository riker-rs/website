# Running Futures

Riker can execute and drive futures to completion. In fact, internally actors are executed as futures by the dispatcher. This means Riker can run any future on the same executor, alongside actors.

`ActorSystem` and `Context` both have a `run` method that takes a future to run:

```rust
let handle = system.run(async move {
    "someval".to_string()
});

assert_eq!(block_on(handle), "someval".to_string());
```

`sys.run` schedules the future for execution it will drive it to completion utilizing the dispatcher's thread pool. `run` returns a `futures::future::RemoteHandle` future that can be used to extract the result.

!!! note
    Riker executes futures using the `Futures` crate's `futures::executor::ThreadPool`.

In the next section we'll see how to to test Riker applications.

[Testing](testing.md)