use std::{collections::HashMap, sync::Arc};

use axum::async_trait;
use uuid::Uuid;

use crate::models::project_label::ProjectWithLabels;

use self::project_repository::{DynProjectRepository, ProjectRepository};

use super::errors::InfraError;

pub mod project_repository;

pub enum SpecificReturnType {
    ProjectWithLabelCase(ProjectWithLabels),
}

#[async_trait]
pub trait Repository<T, F> {
    async fn get_all(
        &self,
        pool: &deadpool_diesel::postgres::Pool,
        filter: F,
    ) -> Result<Vec<T>, InfraError>;
    async fn get_one_by_id(
        &self,
        pool: &deadpool_diesel::postgres::Pool,
        id: Uuid,
    ) -> Result<SpecificReturnType, InfraError>;
}

#[derive(Clone)]
pub enum Repositories {
    Project(DynProjectRepository),
}

#[derive(Clone, PartialEq, Hash, Eq)]
pub enum RepositoryName {
    Project,
}

pub fn get_repositories_state() -> HashMap<RepositoryName, Repositories> {
    let repo = Arc::new(ProjectRepository()) as DynProjectRepository;

    let mut mapped_repositories: HashMap<RepositoryName, Repositories> = HashMap::new();
    mapped_repositories.insert(RepositoryName::Project, Repositories::Project(repo));

    mapped_repositories
}
