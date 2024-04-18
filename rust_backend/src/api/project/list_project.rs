use axum::{extract::{Query, State}, Json};
use crate::{infra::repositories::project_repository::{get_all, ProjectFilter}, models::project::{ProjectError}};

use super::ListProjectResponse;


pub async fn list_project(
    State(state): State<AppState>,
    Query(params): Query<ProjectFilter>,
) -> Result<Json<ListProjectResponse>, ProjectError> {
    let projects = get_all($state.pool, params).await.map_err(|_| ProjectError::InternalServerError)?;

    Ok(Json(projects))
}