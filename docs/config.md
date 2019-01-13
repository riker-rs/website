# Configuration

## Basics
Riker makes configuration straightforward by using two config files:

- `riker.toml` can be modified to change the behavior of Riker and various modules
- `app.*`, such as `app.toml` or `app.yml` for application specific settings

Configuration is based on the `Config` crate meaning that any format supported by that crate can be used for application setting.

When the system starts `riker.toml` is loaded and if an application config file exists it will be merged into a single `Config` instance. This keeps settings separate for the purposes of maintenance and CI/CD, but makes it uniformly available at runtime.

The `Config` instance is accessible via the `ActorSystem` instance, for example:

```rust
let myval = sys.config().get_str("app.myval").unwrap();
```

This expects the following entry in `app.*`:

```toml
[app]
myval = "five by five"
```

## File Paths
By default Riker looks for `riker.toml` and `app.*` in the `config` directory relative to the current directory of execution.

It's stardard practise to place the `config` directory in the root directory of your Rust application, i.e. on the same level as `src`. This way, `cargo run` and `cargo test` will use the files located in `config`.

Configuration file paths can be overridden using environment variables:

- `RIKER_CONF` to override `riker.toml` file path
- `APP_CONF` to override `app.*` file path

## Best Practises

### Default Values
Default values are discouraged. If a setting is missing from a config file it's better to let `.unwrap()` panic than to use a hidden default settings in code. This makes it clear as to what settings are being used and there is no unexpected behavior at runtime. It's better to not run at all than run with bad, possibly dangerous settings.

### Using .config()
It is highly encouraged in terms of function signatures to not pass around instances of `Config`. Not only is it slower but it makes understanding what a function does difficult. It is always better to extract values from configuration early on in your application and then pass those to functions. If you have many settings to pass to a function a dedicated settings struct could be used.

### Module Settings
It is encouraged to reuse the standard section names for modules. For example, if you have a custom logging module then use `[log]` in `riker.toml`. This makes it easier for people to locate these settings based on module behavior.

Example

```toml

[persistence]
redis_url = "tcp://127.0.0.1"
resis_pwd = "password123"
``` 

Or 

```toml
[persistence]
redis = { url = "tcp://127.0.0.1", pwd = "password123" }
``` 


