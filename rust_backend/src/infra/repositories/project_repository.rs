use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
    infra::errors::{adapt_infra_error, InfraError},
    models::project::Project,
};

use crate::infra::db::schema::project;

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

pub async fn get(pool: &deadpool_diesel::postgres::Pool, id: Uuid) -> Result<Project, InfraError> {
    let conn = pool.get().await.map_err(adapt_infra_error)?;

    let res = conn
        .interact(move |conn| {
            project::table
                .filter(project::id.eq(id))
                .select(Project::as_select())
                .get_result(conn)
        })
        .await
        .map_err(adapt_infra_error)?
        .map_err(adapt_infra_error)?;

    Ok(res)
}
