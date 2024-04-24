use axum::{routing::get, Router};

use crate::AppState;

use super::project::{get_project, list_projects};

pub fn app() -> Router<AppState> {
    return Router::new()
        .route("/projects/:is_sio", get(list_projects))
        .route("/project/:id", get(get_project));
}
