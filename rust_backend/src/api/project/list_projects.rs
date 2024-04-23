use crate::{
    infra::repositories::project_repository::{get_all, ProjectFilter},
    models::project::{Project, ProjectError},
    AppState,
};
use axum::{
    extract::{Query, State},
    Json,
};

use super::ListProjectResponse;

pub async fn list_projects(
    State(state): State<AppState>,
    Query(params): Query<ProjectFilter>,
) -> Result<Json<ListProjectResponse>, ProjectError> {
    let projects = get_all(&state.pool, params)
        .await
        .map_err(|_| ProjectError::InternalServerError)?;

    Ok(Json(adapt_projects_to_list_projects_response(projects)))
}

fn adapt_projects_to_list_projects_response(projects: Vec<Project>) -> ListProjectResponse {
    ListProjectResponse { projects }
}
