use crate::{
    infra::repositories::{project_repository::ProjectFilter, Repositories, RepositoriesNames},
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
    if let Some(repo) = state
        .repositories
        .get(&RepositoriesNames::Project.to_string())
    {
        match repo {
            Repositories::Project(project_repo) => {
                let projects = project_repo
                    .get_all(&state.pool, params)
                    .await
                    .map_err(|_| ProjectError::InternalServerError)?;
                Ok(Json(adapt_projects_to_list_projects_response(projects)))
            }
        }
    } else {
        Err(ProjectError::InternalServerError)
    }
}

fn adapt_projects_to_list_projects_response(projects: Vec<Project>) -> ListProjectResponse {
    ListProjectResponse { projects }
}
