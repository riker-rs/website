# Actor Hierarchy

Actors in Riker form a hierarchy with each actor addressable by a path. An actor's place in the hierarchy is determined by the location of its parent. Let's take a look at what the actor hierarchy looks like immediately after the actor system has started:

```
my-app
└─ user
└─ system
   └─ logger
   └─ event_stream
   └─ dead_letters
   └─ event_store
   └─ default_stream
   └─ io_manager
      └─ tcp
   └─ dl_logger
└─ temp
```

We can see that without starting any actors ourself there's already a number of actors running. At the base of the hierarchy is our application root which has the name provided when the system was started: `ActorSystem::new("my-app")`.

There's then three root actors, `user`, `system` and `temp`. Perhaps the most important of these is `user`, since most actors created as part of the application are created in this branch.

If we start an actor using `system.actor_of(props, "my-actor")` we can see it added under `user`:
```
my-app
└─ user
   └─ my-actor      <-- our new actor is added
└─ system
   └─ logger
   └─ event_stream
   └─ dead_letters
   └─ event_store
   └─ default_stream
   └─ io_manager
      └─ tcp
   └─ dl_logger
└─ temp
```

In this case the newly created `my-actor` has a path of `/user/my-actor`. Since it was started by using `actor_of` on `ActorSystem` it is considered a top-level actor.

Let's look at how the hierarchy changes when another actor is started, this time from within `/user/my-actor`'s `receive` method using `Context.actor_of`.

```rust
impl Actor for MyActor {
    type Msg = String;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: ActorRef<Self::Msg>) {

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
   └─ event_stream
   └─ dead_letters
   └─ event_store
   └─ default_stream
   └─ io_manager
      └─ tcp
   └─ dl_logger
└─ temp
```

Since the new actor was started using `my-actor`'s context it gets added to the hierarchy as a child of `my-actor`. `my-child`'s path becomes `/user/my-actor/my-child`.

Let's move on the next section where the importance of the actor heirarchy to achieve supervision is made clear when building resilient applications.

[Actor supervision](supervision.md)

