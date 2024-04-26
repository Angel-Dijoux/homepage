use crate::{
    infra::repositories::{project_repository::ProjectFilter, Repositories, RepositoryName},
    models::project::{Project, ProjectError},
    utils::PathExtractor,
    AppState,
};
use axum::{extract::State, Json};

use super::ListProjectResponse;

pub async fn list_projects(
    State(state): State<AppState>,
    PathExtractor(params): PathExtractor<ProjectFilter>,
) -> Result<Json<ListProjectResponse>, ProjectError> {
    if let Some(Repositories::Project(project_repo)) =
        state.repositories.get(&RepositoryName::Project)
    {
        let projects = project_repo
            .get_all(&state.pool, params)
            .await
            .map_err(|_| ProjectError::InternalServerError)?;
        Ok(Json(adapt_projects_to_list_projects_response(projects)))
    } else {
        Err(ProjectError::InternalServerError)
    }
}

fn adapt_projects_to_list_projects_response(projects: Vec<Project>) -> ListProjectResponse {
    ListProjectResponse { projects }
}
