use std::sync::Arc;

use axum::async_trait;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
    infra::errors::{adapt_infra_error, InfraError},
    models::{label::Label, project::Project, project_label::ProjectWithLabels},
};

use crate::infra::db::schema::label;
use crate::infra::db::schema::project;
use crate::infra::db::schema::project_label;

use super::{Repository, SpecificReturnType};

#[async_trait]
pub trait ProjectRepositoryTrait: Repository<Project, ProjectFilter> {}
pub type DynProjectRepository = Arc<dyn ProjectRepositoryTrait + Send + Sync>;

#[derive(Clone)]
pub struct ProjectRepository();

#[derive(Deserialize)]
pub struct ProjectFilter {
    pub is_sio: Option<bool>,
}

impl ProjectRepositoryTrait for ProjectRepository {}

#[async_trait]
impl Repository<Project, ProjectFilter> for ProjectRepository {
    async fn get_all(
        &self,
        pool: &deadpool_diesel::postgres::Pool,
        filter: ProjectFilter,
    ) -> Result<Vec<Project>, InfraError> {
        let conn = pool.get().await.map_err(adapt_infra_error)?;

        let res = conn
            .interact(move |conn| {
                let mut query = project::table.into_boxed::<diesel::pg::Pg>();

                if let Some(is_sio) = filter.is_sio {
                    query = query.filter(project::is_sio.eq(is_sio));
                } else {
                    query = query.filter(project::is_sio.eq(false));
                }

                query.select(Project::as_select()).load::<Project>(conn)
            })
            .await
            .map_err(adapt_infra_error)?
            .map_err(adapt_infra_error)?;

        Ok(res)
    }

    async fn get_one_by_id(
        &self,
        pool: &deadpool_diesel::postgres::Pool,
        id: Uuid,
    ) -> Result<SpecificReturnType, InfraError> {
        let conn = pool.get().await.map_err(adapt_infra_error)?;

        let project = conn
            .interact(move |conn| {
                project::table
                    .filter(project::id.eq(id))
                    .first::<Project>(conn)
            })
            .await
            .map_err(adapt_infra_error)?
            .map_err(adapt_infra_error)?;

        let labels = conn
            .interact(move |conn| {
                project_label::table
                    .inner_join(label::table)
                    .filter(project_label::project_id.eq(id))
                    .select(Label::as_select())
                    .load::<Label>(conn)
            })
            .await
            .map_err(adapt_infra_error)?
            .map_err(adapt_infra_error)?;

        Ok(SpecificReturnType::ProjectWithLabelCase(
            ProjectWithLabels {
                project,
                labels: Some(labels),
            },
        ))
    }
}
