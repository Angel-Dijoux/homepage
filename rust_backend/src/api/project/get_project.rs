use axum::{extract::State, Json};
use uuid::Uuid;

use crate::{
    infra::{errors::InfraError, repositories::project_repository},
    models::project::{Project, ProjectError},
    utils::PathExtractor,
    AppState,
};

pub async fn get_project(
    State(state): State<AppState>,
    PathExtractor(project_id): PathExtractor<Uuid>,
) -> Result<Json<Project>, ProjectError> {
    let project = project_repository::get(&state.pool, project_id)
        .await
        .map_err(|db_error| match db_error {
            InfraError::InternalServerError => ProjectError::InternalServerError,
            InfraError::NotFound => ProjectError::NotFound(project_id),
        })?;

    Ok(Json(project))
}
