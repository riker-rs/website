**What is Riker's goal?**

Riker's principle goal is to be a framework to make concurrent, resilient software development easy and to make the Actor Model applicable to a wide spectrum of platforms.

Riker achieves this by:

- Exposing a simple `Actor` trait
- Actor supervision based on the actor hierarchy
- Allowing Actors to own their state so `Sync` is not required
- Ensuring an 'at most one-time' message guarantee
- Providing a configurable, modular system
- Promotion of modern, event-based data persistence
- Low memory footprint
- Fast execution
- No `unsafe` code (with the exception of `impl Send` and `impl Sync`)

**Is Riker a remake of Akka for Rust?**

Riker is inspired by [Akka](https://akka.io/), the JVM's popular Actor Model implementation. However it's not Riker's goal to recreate Akka for Rust. Other environments have done this, for example C#'s Akka.NET but the differences of Rust and Scala/Java and others require a fresh Rust-specific approach. And since Riker works well on resource limited hardware such as single board computers there are new challenges and problems to solve that are not applicable to Akka.

**How do actors compare to Futures?**

Both Actors and Futures in general work to solve the challenges of concurrent software design. However they are complimentary since they are solving different issues.

Futures allow software developers to write concurrent code in an almost single-threaded manner. Simple, short-lived workload processing that is non-blocking can be easily written. So Futures can be seen as building blocks for non-blocking application design.

Actors on the other hand are used when state exists and must be maintained between cycles of when an actor is running and when it is idle. Actors are well suited for long running processes that can even span the lifetime of the application itself. Actors also form a hierarchy, with parent and child actors, which communicate with each other via a message based API. Since Actors are aware of other Actors in the system they can heal each other when unexpected things happen, such as panics.

Under the covers, Riker actors are Futures and run as Futures on the underlying thread pool.

**How do actors compare to threads?**

Actors only run and use a CPU thread when they have one or more messages in their mailbox. When an actor is sent a message that actor is scheduled for execution. When a thread is available the actor and its state are transferred (i.e. `Send`) to the thread and the actor processes its messages (i.e. the `receive` method is invoked). It is only then that the actor will use any OS thread resources. When an actor is idle it requires no thread execution time.

It's possible to have thousands or millions of actors that share just two CPU core/threads.

**Can Riker run on muliple hosts?**

Like any application a Riker application can easily be distributed across multiple network hosts or Docker containers. Applications can be load balanced using simple load balancing or form part of a more complex system using a [Kubernetes](https://kubernetes.io/), [Linkerd](https://linkerd.io/), etc.

It is only when an an application uses Riker's CQRS features should additional architecture design be considered to manage entities. In a CQRS environment it is critical to ensure that only one instance of an entity actor be running across multiple hosts. Riker Cluster is currently in development to make this coordination available.

**Can multiple `ActorSystem` instances run in the same app?**

It is possible to create two or more instances using `ActorSystem::new` but there is little benefit in doing so. A single instance is already optimized to run actors on the configured dispatcher which generally uses all cores of a CPU.

An exception to this advice is when an application is handling greatly varying workloads and it is not possible due to architecture constraints to break into multiple applications.

**Does Riker use `unsafe` code?**

Riker does not use `unsafe` for any memory management. We believe it's better to work with the Borrow Checker and compiler than against them.

`unsafe` is only used to explicitly mark a few types as `Send` or `Sync` to assist the compiler. Both of these have empty implementations, i.e. no actual unsafe code:

```
unsafe impl<T: Message> Send for Envelope<T> {}
```

**Are there any benchmarks?**

We're working to provide common actor benchmarks soon. We want to make sure we're using benchmarks that actually mean something to real world scenarios. In terms of pure message throughput, one actor to another, several million messages can be sent per second on a standard 2018 laptop.
