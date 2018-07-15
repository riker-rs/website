Riker is a framework for building modern, concurrent and resilient applications using the Rust language. The framework is built around an Actor model providing a message based execution runtime. Riker is highly modular allowing for core services to be switched out for alternative modules.

**Actor Based Concurrency**

Actors are lightweight abstractions that make it easier to develop concurrent software. Actors expose an API via messaging resulting in fast, non-blocking code execution while also eliminating race conditions to make concurrent code a breeze to write.

**Resilient & Self Healing Applications**

Build applications that isolate and recover from failures. Actors provide a Supervision Strategy that form the core of resilient application design in Riker.

**Event Sourcing & CQRS**

Use event sourcing and Command Query Responsibility Separation (CQRS) to drive extremely fast persistent data applications.

**Modern**

Scale Microservices to hundreds of instances, or run high performance drone systems on limited hardware. Riker applications compile to OS binaries (thanks to Rust), have no VM overhead, and require only a few megabytes of memory to run.

**Note: Riker is pre-1.0. Expect changes to APIs, potential unexpected behavior, etc.**

If you're familiar with the JVM's Akka you'll feel at home with Riker.
