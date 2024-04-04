mod v0;

use anyhow::{Context, Result};
use api_version::api_version;
use axum::{
    body::Body,
    http::{Method, Request},
    Router, ServiceExt,
};
use serde::Deserialize;
use serde_json::json;
use std::{collections::HashMap, net::IpAddr, time::Duration};
use time::{format_description::well_known::Rfc3339, OffsetDateTime};
use tokio::{
    net::TcpListener,
    signal::unix::{signal, SignalKind},
    time::sleep,
};
use tower::Layer;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::{info_span, Span};

use self::v0::app;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub struct Config {
    addr: IpAddr,
    port: u16,
    #[serde(with = "humantime_serde")]
    shutdown_timeout: Option<Duration>,
}

pub async fn serve(config: Config) -> Result<()> {
    let origins = [
        "http://localhost:5173".parse().unwrap(),       // Dev mode
        "http://localhost:4173".parse().unwrap(),       // Preview mode
        "http://angel.dijoux.free.fr".parse().unwrap(), // Prod mode
    ];

    let Config {
        addr,
        port,
        shutdown_timeout,
    } = config;

    let app = Router::new()
        .nest("/v0/api/", app())
        .layer(
            CorsLayer::new()
                .allow_origin(origins)
                .allow_methods([Method::GET]),
        )
        .layer(TraceLayer::new_for_http().make_span_with(make_span));

    let app = api_version!(0..=0).layer(app);

    let listener = TcpListener::bind((addr, port))
        .await
        .context("bind TcpListener")?;
    axum::serve(listener, app.into_make_service())
        .with_graceful_shutdown(shutdown_signal(shutdown_timeout))
        .await
        .context("run server")
}

async fn shutdown_signal(shutdown_timeout: Option<Duration>) {
    signal(SignalKind::terminate())
        .expect("install SIGTERM handler")
        .recv()
        .await;
    if let Some(shutdown_timeout) = shutdown_timeout {
        sleep(shutdown_timeout).await;
    }
}

fn make_span(request: &Request<Body>) -> Span {
    let headers = request.headers();
    let path = request.uri().path();

    let headers_map: HashMap<_, _> = headers
        .iter()
        .map(|(name, value)| (name.as_str(), value.to_str().unwrap()))
        .collect();

    let now = OffsetDateTime::now_utc().format(&Rfc3339).unwrap();
    let debug = serde_json::to_string(&json!({
        "timestamp": now,
        "level": "DEBUG",
        "path": &path,
        "headers": headers_map,
    }));

    if let Ok(debug_str) = debug {
        tracing::debug!("{}", debug_str);
    } else {
        tracing::debug!("Failed to serialize debug information");
    }

    info_span!("incoming request", path = %path, headers = ?headers_map, trace_id = tracing::field::Empty)
}
