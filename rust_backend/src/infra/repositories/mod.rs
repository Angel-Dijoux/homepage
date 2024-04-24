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

macro_rules! enum_to_string {
    ($name:ident { $($variant:ident),* $(,)? }) => {
        #[derive(Debug)]
        pub enum $name {
            $($variant),*
        }

        impl ToString for $name {
            fn to_string(&self) -> String {
                match self {
                    $(Self::$variant => stringify!($variant).to_string()),*
                }
            }
        }
    };
}

enum_to_string!(RepositoriesNames { Project });

pub fn get_repositories_state() -> HashMap<String, Repositories> {
    let repo = Arc::new(ProjectRepository()) as DynProjectRepository;

    let mut mapped_repositories: HashMap<String, Repositories> = HashMap::new();
    mapped_repositories.insert(
        RepositoriesNames::Project.to_string(),
        Repositories::Project(repo),
    );

    mapped_repositories
}
