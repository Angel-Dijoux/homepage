use axum::{http::StatusCode, response::IntoResponse, Json};
use diesel::{associations::Identifiable, deserialize::Queryable, Selectable};
use serde::{Deserialize, Serialize};
use serde_json::json;
use ts_rs::TS;
use uuid::Uuid;

use crate::infra::errors::InfraError;

#[derive(Serialize, Deserialize, Queryable, Selectable, Debug, PartialEq, Clone, Identifiable)]
#[diesel(table_name= crate::infra::db::schema::label)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[derive(TS)]
#[ts(export)]
pub struct Label {
    pub id: uuid::Uuid,
    pub name: String,
}

#[derive(Debug)]
pub enum LabelError {
    InternalServerError,
    NotFound(Uuid),
    InfraError(InfraError),
}

impl IntoResponse for LabelError {
    fn into_response(self) -> axum::response::Response {
        let (status, err_msg) = match self {
            Self::NotFound(id) => (
                StatusCode::NOT_FOUND,
                format!("LabelModel with id {} has not been found", id),
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
                json!({"resource": "LabelModel", "message": err_msg, "happened_at": chrono::Utc::now()})
            )
        ).into_response()
    }
}
