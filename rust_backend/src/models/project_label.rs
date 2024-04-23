use axum::{http::StatusCode, response::IntoResponse, Json};
use diesel::{
    associations::{Associations, Identifiable},
    deserialize::Queryable,
    Selectable,
};
use serde::Serialize;
use serde_json::json;
use uuid::Uuid;

use crate::infra::errors::InfraError;

use super::label::Label;
use super::project::Project;

#[derive(Queryable, Identifiable, Selectable, Associations, Debug, PartialEq, Serialize)]
#[diesel(belongs_to(Label))]
#[diesel(belongs_to(Project))]
#[diesel(table_name = crate::infra::db::schema::project_label)]
#[diesel(primary_key(label_id, project_id))]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ProjectLabel {
    pub project_id: uuid::Uuid,
    pub label_id: uuid::Uuid,
}

#[derive(Serialize)]
pub struct ProjectWithLabels {
    #[serde(flatten)]
    pub project: Project,
    pub labels: Vec<Label>,
}

#[derive(Debug)]
pub enum ProjectLabelError {
    InternalServerError,
    NotFound(Uuid),
    InfraError(InfraError),
}

impl IntoResponse for ProjectLabelError {
    fn into_response(self) -> axum::response::Response {
        let (status, err_msg) = match self {
            Self::NotFound(id) => (
                StatusCode::NOT_FOUND,
                format!("ProjectLabel with id {} has not been found", id),
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
                json!({"resource": "ProjectLabel", "message": err_msg, "happened_at": chrono::Utc::now()})
            )
        ).into_response()
    }
}
