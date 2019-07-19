# Patterns

## Ask

The Ask pattern allows values to be sent by actors to outside of the actor system. The value is delivered as a `Future`.

Let's look at how this works:

```rust
extern crate riker_patterns;

use riker_patterns::ask;

struct MyActor;

impl Actor for MyActor {
    type Msg = u32;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: ActorRef<Self::Msg>) {

        // sender is the Ask, waiting to a message to be sent back to it
        sender.try_tell(msg * 2, Some(ctx.myself()));
    }
}

fn main() {
    let model: DefaultModel<u32> = DefaultModel::new();
    let sys = ActorSystem::new(&model).unwrap();

    let props = MyActor::props();
    let my_actor = sys.actor_of(props, "my-actor");

    // ask returns a future that automatically is driven
    // to completion by the system.
    let res = ask(&sys, &my_actor, 100);

    // the result future can be passed to a library or fuction that
    // expects a future, or it can be extracted locally using `block_on`.

    let res = block_on(res).unwrap();
    println!("The result value is: {}", res);
}
```

In the background Ask sets up a temporary intermediate actor that lives for the lifetime of the ask. Other actors see this temporary actor as the `sender` and can send a message back to it. When the temporary ask actor receives a message it fulfills the outstanding future and performs a `stop` on itself to cleanup.

Ask is particularly useful when you have part of an application that runs outside of the actor system, or in another actor system, such as a web server (e.g. Hyper) serving API requests. The resulting future can then be chained as part of the future stack.

## Transform

Transform makes changing actor behavior based on its current state easier to reason about. Since actors maintain state, and indeed is a primary concern, being able to handle messages differently based on that state is important. The Transform pattern separates message handling by dedicating a receive function per state. This saves excessive `match`ing to handle several possible states, i.e. handling behavior is preempted at the time of state change instead of on each message receive.

!!! info
    If you're familiar with Akka on the JVM, `transform` resembles `become`.

Example:

```rust
#[macro_use]
extern crate riker_patterns;

use riker_patterns::ask;

#[derive(Clone, Debug)]
enum MyMsg {
    SetPassword(String), // password
    Authenticate(String), // password
}

impl Into<ActorMsg<MyMsg>> for MyMsg {
    fn into(self) -> ActorMsg<MyMsg> {
        ActorMsg::User(self)
    }
}

struct UserActor {
    username: String,
    password: Option<String>,

    // rec field is required to store current method to be used
    rec: Receive<UserActor, MyMsg>,
}

impl UserActor {
    fn actor(username: String) -> BoxActor<MyMsg> {
        let actor = UserActor {
            username,
            password: None,
            rec: Self::created, // <-- set initial method to `created` stated
        };

        Box::new(actor)
    }

    fn props(username: String) -> BoxActorProd<MyMsg> {
        Props::new_args(Box::new(UserActor::actor), username)
    }

    /// Receive method for this actor when it is in a created state
    /// i.e. password has not yet been set.
    fn created(&mut self,
                ctx: &Context<MyMsg>,
                msg: MyMsg,
                sender: Option<ActorRef<MyMsg>>) {

        match msg {
            MyMsg::SetPassword(passwd) => {
                self.password = Some(passwd);

                // send back a result to sender
                // e.g. `sender.try_tell(Ok, None);`

                // transform behavior to active state
                transform!(self, UserActor::active);
            }
            MyMsg::Authenticate(passwd) => {
                // `MyMsg::Authenticate` is invalid since no user password
                // has been set.
                // Signal that this is an error for the current state
                self.probe.as_ref().unwrap().0.event(ProbeMsg::Err);
            }
        }
    }

    /// Receive method for this actor when a password has been set
    /// and the user account is now active.
    fn active(&mut self,
                ctx: &Context<MyMsg>,
                msg: MyMsg,
                sender: Option<ActorRef<MyMsg>>) {

        match msg {
            MyMsg::Authenticate(passwd) => {
                // send back an authentication result to sender
                // e.g. `sender.try_tell(Ok, None);`

                // signal that this is correct
                self.probe.as_ref().unwrap().0.event(ProbeMsg::Ok);
            }
            MyMsg::SetPassword(passwd) => {
                // set a new password
                self.password = Some(passwd);
            }
        }
    }
}

impl Actor for UserActor {
    type Msg = MyMsg;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: Option<ActorRef<Self::Msg>>) {

        // just call the currently set transform function
        (self.rec)(self, ctx, msg, sender)
    }
}
```

!!! note
    The `transform!` macro expects the field name of the current receive function on `self` to be named `rec`. It's easy to use a different name and either use your own macro, or just set the fuction using standard code. The advantage of `transform!` is that it is easy to read and identify when transformation is happening since it is distinct from standard code. 






