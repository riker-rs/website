# Actor Hierarchy

Actors in Riker form a hierarchy with each actor addressable by a path. An actor's place in the hierarchy is determined by the location of its parent. Let's take a look at what the actor hierarchy looks like immediately after the actor system has started:

```
riker
└─ user
└─ system
   └─ logger
   └─ sys_events
   └─ dead_letters
   └─ dl_logger
└─ temp
```

We can see that without starting any actors ourself there's already a number of actors running. At the base of the hierarchy is our application which by default is named `riker` unless a name was provided using `SystemBuilder`.

There's then three root actors, `user`, `system` and `temp`. These are guardian actors under which all other actors are created. Perhaps the most important of these is `user`, since most actors created as part of the application are created in this branch.

If we start an actor using `system.actor_of(props, "my-actor")` we can see it added under `user`:

```
my-app
└─ user
   └─ my-actor      <-- our new actor is added
└─ system
   └─ logger
   └─ sys_events
   └─ dead_letters
   └─ dl_logger
└─ temp
```

In this case the newly created `my-actor` has a path of `/user/my-actor`. Since it was started by using `actor_of` on `ActorSystem` it is considered a top-level actor.

Let's look at how the hierarchy changes when another actor is started, this time from within `/user/my-actor`'s `recv` method using `Context.actor_of`.

```rust
impl Actor for MyActor {
    type Msg = String;

    fn recv(&mut self,
            ctx: &Context<String>,
            msg: String,
            sender: Sender) {

        ctx.actor_of(MyActor::props(), "my-child").unwrap();
    }
}
```

Here `MyActor` will start another actor, which is also an instance of `MyActor`.

```
my-app
└─ user
   └─ my-actor
      └─ my-child   <-- our new actor is added
└─ system
   └─ logger
   └─ sys_events
   └─ dead_letters
   └─ dl_logger
└─ temp
```

Since the new actor was started using `my-actor`'s context it is added to the hierarchy as a child of `my-actor`. `my-child`'s path becomes `/user/my-actor/my-child`.

Let's move on the next section where we'll look at how the actor hierarchy is used in supervision to build resilient, self healing applications.

[Actor supervision](supervision.md)
