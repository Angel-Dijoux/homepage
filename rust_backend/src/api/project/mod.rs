use crate::models::project::Project;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

pub use get_project::get_project;
pub use list_projects::list_projects;

mod get_project;
mod list_projects;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct ListProjectResponse {
    projects: Vec<Project>,
}
