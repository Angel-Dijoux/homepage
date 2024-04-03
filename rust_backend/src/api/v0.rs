use axum::{extract::Path, http::StatusCode, routing::get, Json, Router};
use diesel::RunQueryDsl;
use portefolio_back::{
    establish_connection,
    models::{self, Label},
    schema::{label, project_label},
};
use serde::Serialize;

#[derive(Serialize, Default)]
struct Project {
    id: u64,
    title: String,
    description: String,
    image_url: String,
    github_url: String,
    project_url: Option<String>,
    file_uri: Option<String>,
    is_sio: bool,
    labels: Option<Vec<models::Label>>,
}

fn get_labels() -> Vec<Label> {
    let conn = &mut establish_connection();

    let result = project_label::table
        .load::<models::ProjectLabel>(conn)
        .expect("Error Loading pr label");

    return label::table
        .load::<models::Label>(conn)
        .expect("Error Loading label");
}

async fn list_projects() -> Json<Vec<Project>> {
    let projects = vec![
        Project {
            id: 1,
            title: String::from("# project 1"),
            description:format!(
                "# helloe\n__word__\n```javascript\nconsole.log(\"Hello\")\n```\n"
            ),
            image_url: String::from("https://cdn.sanity.io/images/wuakm03c/production/67dc4f6e5d922f4e44481e4084f0d8b4a9ac4299-3840x2160.png?w=3840&fit=max&auto=format"),
            github_url: String::from("https://tanstack.com/"),
            project_url: Option::None,
            file_uri: Option::None,
            is_sio: true,
            labels: Some(get_labels()),
        },
        Project {
            id: 2,
            title: "Test".to_string(),
            description: "Here is some JavaScript code:\n~~~js\nconsole.log('It works!')\n~~~"
                .to_string(),
            image_url: String::from("https://cdn.sanity.io/images/wuakm03c/production/67dc4f6e5d922f4e44481e4084f0d8b4a9ac4299-3840x2160.png?w=3840&fit=max&auto=format"),
            github_url: String::from("https://tanstack.com/"),
            project_url: Some(String::from("https://tanstack.com/")),
            file_uri: Option::None,
            is_sio: false,
            labels: Some(get_labels()),
        },
        Project {
            id: 3,
            title: "Test".to_string(),
            description: "_Descewr_".to_string(),
            image_url: String::from("https://cdn.sanity.io/images/wuakm03c/production/67dc4f6e5d922f4e44481e4084f0d8b4a9ac4299-3840x2160.png?w=3840&fit=max&auto=format"),
            github_url: String::from("https://tanstack.com/"),
            project_url: Some(String::from("https://tanstack.com/")),
            file_uri: Some(String::from("https://tanstack.com/")),
            is_sio: false,
            labels: Some(get_labels()),
        },
        Project {
            id: 4,
            title: "Test".to_string(),
            description: "_Descewr_".to_string(),
            image_url: String::from("https://cdn.sanity.io/images/wuakm03c/production/67dc4f6e5d922f4e44481e4084f0d8b4a9ac4299-3840x2160.png?w=3840&fit=max&auto=format"),
            github_url: String::from("https://tanstack.com/"),
            project_url: Some(String::from("https://tanstack.com/")),
            file_uri: Some(String::from("https://tanstack.com/")),
            is_sio: false,
            labels: Some(get_labels()),
        },
    ];
    Json(projects)
}

async fn find_project_by_id(Path(id): Path<u64>) -> Result<Json<Project>, StatusCode> {
    let projects = list_projects().await;

    let project = projects.0.into_iter().find(|p| p.id == id);

    match project {
        Some(project) => Ok(Json(project)),
        None => Err(StatusCode::NOT_FOUND),
    }
}

pub fn app() -> Router {
    return Router::new()
        .route("/project", get(list_projects))
        .route("/project/:id", get(find_project_by_id));
}
