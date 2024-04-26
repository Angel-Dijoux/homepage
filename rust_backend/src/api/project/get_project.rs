use axum::{extract::State, Json};
use uuid::Uuid;

use crate::{
    infra::repositories::{Repositories, RepositoryName, SpecificReturnType},
    models::project_label::{ProjectLabelError, ProjectWithLabels},
    utils::PathExtractor,
    AppState,
};

pub async fn get_project(
    State(state): State<AppState>,
    PathExtractor(project_id): PathExtractor<Uuid>,
) -> Result<Json<ProjectWithLabels>, ProjectLabelError> {
    if let Some(Repositories::Project(project_repo)) =
        state.repositories.get(&RepositoryName::Project)
    {
        let project = project_repo
            .get_one_by_id(&state.pool, project_id)
            .await
            .map_err(|_| ProjectLabelError::InternalServerError)?;
        match project {
            SpecificReturnType::ProjectWithLabelCase(project) => Ok(Json(project)),
        }
    } else {
        Err(ProjectLabelError::InternalServerError)
    }
}
