use axum::{http::StatusCode, response::IntoResponse, Json};
use diesel::{deserialize::Queryable, Selectable};
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::infra::errors::InfraError;

#[derive(Serialize, Deserialize, Queryable, Selectable, Debug, PartialEq, Clone)]
#[diesel(table_name = crate::infra::db::schema::project)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Project {
    pub id: uuid::Uuid,
    pub title: String,
    pub description: String,
    pub shorten_description: String,
    pub image_url: String,
    pub github_url: String,
    pub project_url: Option<String>,
    pub file_uri: Option<String>,
    pub is_sio: bool,
}

#[derive(Debug)]
pub enum ProjectError {
    InternalServerError,
    NotFound(Uuid),
    InfraError(InfraError),
}

impl IntoResponse for ProjectError {
    fn into_response(self) -> axum::response::Response {
        let (status, err_msg) = match self {
            Self::NotFound(id) => (
                StatusCode::NOT_FOUND,
                format!("ProjectModel with id {} has not been found", id),
            ),
            Self::InfraError(db_error) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Internal server error: {}", db_error),
            ),
            _ => (
                StatusCode::INTERNAL_SERVER_ERROR,
                String::from("Internal server error"),
            ),
        };
        (
            status,
            Json(
                json!({"resource": "ProjectModel", "message": err_msg, "happened_at": chrono::Utc::now()})
            )
        ).into_response()
    }
}
