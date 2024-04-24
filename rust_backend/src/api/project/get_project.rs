use axum::{extract::State, Json};
use uuid::Uuid;

use crate::{
    infra::repositories::{Repositories, RepositoriesNames, SpecificReturnType},
    models::project_label::{ProjectLabelError, ProjectWithLabels},
    utils::PathExtractor,
    AppState,
};

pub async fn get_project(
    State(state): State<AppState>,
    PathExtractor(project_id): PathExtractor<Uuid>,
) -> Result<Json<ProjectWithLabels>, ProjectLabelError> {
    if let Some(repo) = state
        .repositories
        .get(&RepositoriesNames::Project.to_string())
    {
        match repo {
            Repositories::Project(project_repo) => {
                let project = project_repo
                    .get_one_by_id(&state.pool, project_id)
                    .await
                    .map_err(|_| ProjectLabelError::InternalServerError)?;
                match project {
                    SpecificReturnType::ProjectWithLabelCase(project) => Ok(Json(project)),
                }
            }
        }
    } else {
        Err(ProjectLabelError::InternalServerError)
    }
}
