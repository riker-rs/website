# Message Protocol

In Riker a single actor system has a defined message type, the protocol. The protocol can be a simple type such as `String`. A simple `String` protocol isn't useful in most real world applications where there might be several actors, each with its own specialized message type requirements. 

Any Rust type can be used as the message protocol as long as it is `Clone` and `Send`. In addition, the `Into` trait must be implemented, specifically `Into<ActorMsg>`.

Example:
```rust
enum Protocol {
    CreateUser(String, String), // username, password
    UpdateUser(String), // password
    DeleteUser(String), // username
}

impl Into<ActorMsg<Protocol>> for Protocol {
    fn into(self) -> ActorMsg<Protocol> {
        ActorMsg::User(self)
    }
}
```

Here `Into` converts the protocol to the required `ActorMsg::User` variant.

To configure a Riker application to use your message type just set it in the model. If you're using the default Riker model from the `riker-default` crate you can use the following:

```rust
let model: DefaultModel<Protocol> = DefaultModel::new();
```

This provides a default model instance configured to use our `Protocol` enum.

If instead you are using a custom model you can see how to set your message protocol in [Model & Customization](customize).

Next you'll see how actors form a hierarchy.

[Actor Hierarchy](hierarchy)