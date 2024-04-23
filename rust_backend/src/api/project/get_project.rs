use axum::{extract::State, Json};
use uuid::Uuid;

use crate::{
    infra::{errors::InfraError, repositories::project_repository},
    models::project_label::{ProjectLabelError, ProjectWithLabels},
    utils::PathExtractor,
    AppState,
};

pub async fn get_project(
    State(state): State<AppState>,
    PathExtractor(project_id): PathExtractor<Uuid>,
) -> Result<Json<ProjectWithLabels>, ProjectLabelError> {
    let project = project_repository::get(&state.pool, project_id)
        .await
        .map_err(|db_error| match db_error {
            InfraError::InternalServerError => ProjectLabelError::InternalServerError,
            InfraError::NotFound => ProjectLabelError::NotFound(project_id),
        })?;

    Ok(Json(project))
}
