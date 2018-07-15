# Running Futures

Riker can execute and drive futures to completion. In fact, internally actors are executed as futures by the dispatcher. This means Riker can run any future on the same dispatcher, alongside actors.

`ActorSystem` and `Context` both have an `execute` method that accepts a future to run:

```rust
let f = lazy(|_| {
    thread::sleep(Duration::from_millis(2000));
    println!("Future completed");
    ok::<u32, ()>(10)
});

let f = sys.execute(f);
println!("Future is executing...");

res = block_on(f).unwrap();
println!("Result {}", res);
```

`sys.execute` schedules the future for execution and the dispatcher will drive it to completion utilizing the dispatcher's thread pool. `execute` returns a `DispatchHandle` future that can be used to extract the result.

!!! note
    The default Riker dispatcher uses the `Futures` crate's `ThreadPool` to run futures.

In the next section we'll see how to to test Riker applications.

[Testing](testing)