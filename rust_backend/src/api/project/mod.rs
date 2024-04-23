use crate::models::project::Project;
use serde::{Deserialize, Serialize};

pub use get_project::get_project;
pub use list_projects::list_projects;

mod get_project;
mod list_projects;

#[derive(Debug, Serialize, Deserialize)]
pub struct ListProjectResponse {
    projects: Vec<Project>,
}
