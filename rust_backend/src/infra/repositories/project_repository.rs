use diesel::{ExpressionMethods, JoinOnDsl, QueryDsl, RunQueryDsl, SelectableHelper};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
    infra::errors::{adapt_infra_error, InfraError},
    models::{
        label::Label,
        project::Project,
        project_label::{ProjectLabel, ProjectWithLabels},
    },
};

use crate::infra::db::schema::label;
use crate::infra::db::schema::project;
use crate::infra::db::schema::project_label;

#[derive(Deserialize)]
pub struct ProjectFilter {
    pub is_sio: Option<bool>,
}

pub async fn get_all(
    pool: &deadpool_diesel::postgres::Pool,
    filter: ProjectFilter,
) -> Result<Vec<Project>, InfraError> {
    let conn = pool.get().await.map_err(adapt_infra_error)?;

    let res = conn
        .interact(move |conn| {
            let mut query = project::table.into_boxed::<diesel::pg::Pg>();

            if let Some(is_sio) = filter.is_sio {
                query = query.filter(project::is_sio.eq(is_sio));
            }

            query.select(Project::as_select()).load::<Project>(conn)
        })
        .await
        .map_err(adapt_infra_error)?
        .map_err(adapt_infra_error)?;

    Ok(res)
}

pub async fn get(
    pool: &deadpool_diesel::postgres::Pool,
    id: Uuid,
) -> Result<ProjectWithLabels, InfraError> {
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

    let res = ProjectWithLabels {
        project,
        labels: Some(labels),
    };

    Ok(res)
}
