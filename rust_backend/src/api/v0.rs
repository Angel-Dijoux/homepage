use axum::{extract::Path, http::StatusCode, routing::get, Json, Router};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use rust_backend::{
    establish_connection,
    models::{self, Label, Project, ProjectWithLabels},
    schema::{label, project, project_label},
};
use serde_json::json;
use uuid::Uuid;

async fn get_all_projects(Path(is_sio): Path<bool>) -> Json<Vec<Project>> {
    let conn = &mut establish_connection();
    let projects = project::table
        .filter(project::is_sio.eq(is_sio))
        .load::<models::Project>(conn)
        .expect("Error loadin projects");
    Json(projects)
}

async fn find_project_by_id(
    Path(id): Path<Uuid>,
) -> Result<Json<ProjectWithLabels>, (StatusCode, Json<serde_json::Value>)> {
    let conn = &mut establish_connection();

    let project = project::table
        .filter(project::id.eq(id))
        .first::<Project>(conn);

    match project {
        Ok(project) => {
            let labels_result: Result<Vec<Label>, diesel::result::Error> = project_label::table
                .inner_join(label::table)
                .filter(project_label::project_id.eq(id))
                .select(label::all_columns)
                .load::<Label>(conn);

            match labels_result {
                Ok(labels) => {
                    let project_with_labels = ProjectWithLabels { project, labels };
                    Ok(Json(project_with_labels))
                }
                Err(_) => {
                    let error_response = (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(json!({"error": "Error loading labels"})),
                    );
                    Err(error_response)
                }
            }
        }
        Err(_) => {
            let error_response = (
                StatusCode::NOT_FOUND,
                Json(json!({"error": "Project not found"})),
            );
            Err(error_response)
        }
    }
}

pub fn app() -> Router {
    return Router::new()
        .route("/projects/:is_sio", get(get_all_projects))
        .route("/project/:id", get(find_project_by_id));
}
