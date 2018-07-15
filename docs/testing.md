# Testing

Testing concurrent systems can be more difficult than single threaded applications, since the test itself and the application are running on separate threads. Moreover, because of Riker's resilient self-healing approach where panics are isolated, handled and the failed component restarted, detecting failures in tests proves challenging.

To help make testing easier, the `riker-testkit` introduces a 'probe' that can be sent to actors either through messaging or as part of an actor's `Props`. Probes can then emmit values back to the test thread.

Here's an example of testing an actor restart:

```rust
#[macro_use]
extern crate riker_testkit;

type TestProbe = ChannelProbe<(), ()>;

#[derive(Clone, Debug)]
enum TestMsg {
    Probe(TestProbe),
    Panic,
}

impl Into<ActorMsg<TestMsg>> for TestMsg {
    fn into(self) -> ActorMsg<TestMsg> {
        ActorMsg::User(self)
    }
}

struct MyActor;

impl MyActor {
    fn new() -> BoxActor<TestMsg> {
        Box::new(MyActor)
    }
}

impl Actor for MyActor {
    type Msg = TestMsg;

    fn receive(&mut self,
                _ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                _sender: Option<ActorRef<Self::Msg>>)
    {
        match msg {
            TestMsg::Panic => {
                // panic the actor to simulate failure
                panic!("// TEST PANIC // TEST PANIC // TEST PANIC //");
            }
            TestMsg::Probe(probe) => {
                // received probe
                // let's emmit () empty tuple back to listener
                probe.event(());
            }
        };
    }
}

#[test]
fn panic_actor() {
    let model: DefaultModel<TestMsg> = DefaultModel::new();
    let sys = ActorSystem::new(&model).unwrap();

    let props = Props::new(Box::new(MyActor::new));
    let actor = sys.actor_of(props, "my-actor").unwrap();

    // Make the test actor panic
    actor.tell(TestMsg::Panic, None);

    // Prepare a probe
    let (probe, listen) = probe::<()>();

    // Send the probe to the panicked actor
    // which would have been restarted
    actor.tell(TestMsg::Probe(probe), None);

    // Testkit provides a macro to assert the result
    // that gets emmitted from the probe to the listener.
    // Here we're expecting () empty tuple.
    p_assert_eq!(listen, ());
}
```

This test shows that our actor successfully restarts after it fails. It is able to continue receiving messages, in this case the probe. The macro `p_assert_eq!` waits (blocks) on the listener until a value is received from the probe.



