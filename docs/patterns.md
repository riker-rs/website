# Patterns

## Ask

The Ask pattern allows values to be sent by actors to outside of the actor system. The value is delivered as a `Future`.

Let's look at how this works:

```rust
use riker_patterns::ask;

struct MyActor;

impl Actor for MyActor {
    type Msg = u32;

    fn recv(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: Sender) {

        // sender is the Ask, waiting for a message to be sent back to it
        sender.as_ref()
                .unwrap()
                .try_tell(msg * 2, Some(ctx.myself().into()));
    }
}

fn main() {
    let sys = ActorSystem::new().unwrap();

    let props = Props::new::<MyActor>();
    let my_actor = sys.actor_of_props(props, "my-actor");

    // ask returns a future that automatically is driven
    // to completion by the system.
    let res: RemoteHandle<String> = ask(&sys, &my_actor, 100);

    // the result future can be passed to a library or fuction that
    // expects a future, or it can be extracted locally using `block_on`.
    let res = block_on(res);

    println!("The result value is: {}", res);
}
```

In the background Ask sets up a temporary intermediate actor that lives for the lifetime of the ask. Other actors see this temporary actor as the `sender` and can send a message back to it. When the temporary ask actor receives a message it fulfills the outstanding future and performs a `stop` on itself to cleanup.

Ask is particularly useful when you have part of an application that runs outside of the actor system, or in another actor system, such as a web server (e.g. Hyper) serving API requests. The resulting future can then be chained as part of the future stack.


