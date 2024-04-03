use diesel::prelude::*;
use serde::Serialize;

#[derive(Queryable, Identifiable, Selectable, Debug, PartialEq, Serialize)]
#[diesel(table_name= crate::schema::label)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Label {
    pub id: i64,
    pub name: String,
}

#[derive(Queryable, Identifiable, Selectable, Debug, PartialEq)]
#[diesel(table_name = crate::schema::project)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Project {
    pub id: i64,
    pub image_url: String,
    pub github_url: String,
    pub project_url: Option<String>,
    pub file_uri: Option<String>,
    pub is_sio: bool,
}

#[derive(Queryable, Selectable, Identifiable, Associations, Debug, PartialEq)]
#[diesel(table_name= crate::schema::project_label)]
#[diesel(belongs_to(Label))]
#[diesel(belongs_to(Project))]
#[diesel(primary_key(label_id, project_id))]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ProjectLabel {
    pub project_id: i64,
    pub label_id: i64,
}
