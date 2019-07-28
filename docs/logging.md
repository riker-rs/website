# Logging

Riker provides logging out of the box which is built on top of the `Log` crate logging facade. The logger module starts during the actor system's start, making log macros such as `info!`, `debug!`, `error!` available immediately after `ActorSystem::new`:

```rust
#[macro_use]
extern crate log;

let sys = ActorSystem::new().unwrap();
info!("My first log message!");
```

The only requirement is importing the `Log` crate into your application.

## Base log level

The base log level is the level at which the `Log` crate's macros determine whether to ignore a message or forward it to the logger module. This is configured in `riker.toml`:

```toml
[log]
level = "debug"
```

## Default logger

Log messages will be routed to the logging module configured in the model.
The rest of this page refers primarily to the default Riker logger, the `riker-logger` crate.

Since the default logger is an actor log messages are handled concurrently, in a non-blocking manner. This means the impact of logging on an application's response time is reduced.

The default logger has the following features:

- Log entry format is configurable using named parameters
- Date and time formats can be configured
- Log entries can be further filtered at the module level
- An optional filter can be configured to omit logs from certain modules

Let's take a look at an example log configuration in `riker.toml`:

```toml
[log]
# max level to log
level = "debug"

# Uncomment this to enable filters on the logger.  The {module} field
# of every log line will be checked, and if the {module} field contains
# any item in this list, the entire log line will be omitted from the
# logging output.
#
# This example will omit any logging output from any module with
# "test" in the name and any module whose name contains "debug".
#
filter = [ "test", "debug" ]

# log format to use
# correlates to format!(log_format, date=, time=, level=, module=, body=);
# since named parameters are used the order of the fields is flexible
# the formatting of each field can be changed also
# e.g. to completely hide a field: {module:.0}
# See: https://doc.rust-lang.org/std/fmt/#syntax

# {date}    the calendar day
# {time}    the calendar time
# {level}   the level for the entry
# {module}  the module path originating the entry
# {body}    the message body
log_format = "{date} {time} {level} [{module}] {body}"
date_format = "%Y-%m-%d"
time_format = "%H:%M:%S%:z"
```

This configuration will produce log entries formatted like:

```
2018-06-11 08:31:58+00:00 DEBUG [riker::system::system] Actor system started
2018-06-11 08:31:58+00:00 DEBUG [main] My first log message!
```

and the log lines which would have otherwise been printed:

```
2018-06-11 08:31:58+00:00 DEBUG [testSystem] A test line which should be filtered out!
2018-06-11 08:31:58+00:00 DEBUG [debug] A debugger module's log message
```

will be omitted from the log output.




