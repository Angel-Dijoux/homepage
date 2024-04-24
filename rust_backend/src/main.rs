use crate::infra::repositories::{get_repositories_state, Repositories};
use anyhow::{Context, Result};
use deadpool_diesel::postgres::{Manager, Pool};
use serde_json::json;
use std::{collections::HashMap, fmt::Display, panic, sync::Arc};
use time::{format_description::well_known::Rfc3339, OffsetDateTime};
use tracing::{error, info};
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

mod api;
mod config;
mod errors;
mod infra;
mod models;
mod utils;

#[derive(Clone)]
pub struct AppState {
    pool: Pool,
    repositories: HashMap<String, Repositories>,
}

#[tokio::main]
async fn main() {
    // If tracing initialization fails, nevertheless emit a structured log event.
    let result = init_tracing();
    if let Err(ref error) = result {
        log_error(error);
        return;
    };

    // Replace the default panic hook with one that uses structured logging at ERROR level.
    panic::set_hook(Box::new(|panic| error!(%panic, "process panicked")));

    // Run and log any error.
    if let Err(ref error) = run().await {
        error!(
            error = format!("{error:#}"),
            backtrace = %error.backtrace(),
            "process exited with ERROR"
        );
    }
}

fn init_tracing() -> Result<()> {
    tracing_subscriber::registry()
        .with(EnvFilter::from_default_env())
        .with(fmt::layer().json().flatten_event(true))
        .try_init()
        .context("initialize tracing subscriber")
}

fn log_error(error: &impl Display) {
    let now = OffsetDateTime::now_utc().format(&Rfc3339).unwrap();
    let error = serde_json::to_string(&json!({
        "timestamp": now,
        "level": "ERROR",
        "message": "process exited with ERROR",
        "error": format!("{error:#}")
    }));
    // Not using `eprintln!`, because `tracing_subscriber::fmt` uses stdout by default.
    println!("{}", error.unwrap());
}

async fn run() -> Result<()> {
    let config = config::config().await;

    let manager = Manager::new(
        config.db_url().to_string(),
        deadpool_diesel::Runtime::Tokio1,
    );
    let pool = Pool::builder(manager).build().unwrap();

    let state = AppState {
        pool,
        repositories: get_repositories_state(),
    };

    info!(?config, "starting");

    api::serve(config.api, state).await
}
