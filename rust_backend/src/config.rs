use dotenvy::dotenv;

use std::{
    env,
    net::{IpAddr, Ipv4Addr},
    time::Duration,
};
use tokio::sync::OnceCell;

#[derive(Debug, Clone, Copy)]
pub struct ServerConfig {
    pub addr: IpAddr,
    pub port: u16,
    pub shutdown_timeout: Option<Duration>,
}

#[derive(Debug)]
pub struct DatabaseConfig {
    pub url: String,
}

#[derive(Debug)]
pub struct Config {
    pub api: ServerConfig,
    pub db: DatabaseConfig,
}

impl Config {
    pub fn db_url(&self) -> &str {
        &self.db.url
    }
}

pub static CONFIG: OnceCell<Config> = OnceCell::const_new();

async fn init_config() -> Config {
    dotenv().ok();

    let addr = IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0));
    let shutdown_timeout = Some(Duration::from_secs(3));
    let port = 8080;

    let api_config = ServerConfig {
        addr,
        port,
        shutdown_timeout,
    };

    let database_config = DatabaseConfig {
        url: env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
    };

    Config {
        api: api_config,
        db: database_config,
    }
}

pub async fn config() -> &'static Config {
    CONFIG.get_or_init(init_config).await
}
