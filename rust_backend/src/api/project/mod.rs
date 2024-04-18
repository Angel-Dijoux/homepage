use serde::{Deserialize, Serialize};

use crate::models::project::Project;

pub mod list_project;

#[derive(Debug, Serialize, Deserialize)]
pub struct ListProjectResponse {
    projects: Vec<Project>,
}
