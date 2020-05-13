# Testing

Testing concurrent systems can be more difficult than single threaded applications, since the test itself and the application are running on separate threads. Moreover, because of Riker's resilient self-healing approach where panics are isolated, handled and the failed component restarted, detecting failures in tests proves challenging.

To help make testing easier, the `riker-testkit` introduces a 'probe' that can be sent to actors either through messaging or as part of an actor's `Props`. Probes can then emit values back to the test thread.

Here's an example of testing an actor restart:

```rust
#[macro_use]
extern crate riker_testkit;

use riker::actors::*;

use riker_testkit::probe::{Probe, ProbeReceive};
use riker_testkit::probe::channel::{probe, ChannelProbe};

#[derive(Clone, Debug)]
pub struct Add;

#[derive(Clone, Debug)]
pub struct TestProbe(ChannelProbe<(), ()>);

#[actor(TestProbe, Add)]
struct Counter {
    probe: Option<TestProbe>,
    count: u32,
}

impl Actor for Counter {
    // we used the #[actor] attribute so CounterMsg is the Msg type
    type Msg = CounterMsg;
    type Evt = ();

    fn recv(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: Sender) {
        self.receive(ctx, msg, sender);
    }
}

impl Receive<TestProbe> for Counter {
    type Msg = CounterMsg;

    fn receive(&mut self,
                _ctx: &Context<Self::Msg>,
                msg: TestProbe,
                _sender: Sender) {
        self.probe = Some(msg)
    }
}

impl Receive<Add> for Counter {
    type Msg = CounterMsg;

    fn receive(&mut self,
                _ctx: &Context<Self::Msg>,
                _msg: Add,
                _sender: Sender) {
        self.count += 1;
        if self.count == 1_000_000 {
            self.probe.as_ref().unwrap().0.event(())
        }
    }
}

#[test]
fn actor_tell() {
    let sys = ActorSystem::new().unwrap();

    let actor = sys.actor_of::<Counter>("counter-1").unwrap();

    let (probe, listen) = probe();
    actor.tell(TestProbe(probe), None);

    for _ in 0..1_000_000 {
        actor.tell(Add, None);
    }

    p_assert_eq!(listen, ());
}
```

This test sends a test probe to the test actor, which is keeps and uses to signal back after one million test messages were received. The macro `p_assert_eq!` waits (blocks) on the listener until a value is received from the probe.
