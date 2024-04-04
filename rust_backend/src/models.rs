use diesel::prelude::*;
use serde::Serialize;

#[derive(Queryable, Identifiable, Selectable, Debug, PartialEq, Serialize)]
#[diesel(table_name= crate::schema::label)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Label {
    pub id: uuid::Uuid,
    pub name: String,
}

#[derive(Queryable, Identifiable, Selectable, Debug, PartialEq, Serialize)]
#[diesel(table_name = crate::schema::project)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Project {
    pub id: uuid::Uuid,
    pub title: String,
    pub description: String,
    pub image_url: String,
    pub github_url: String,
    pub project_url: Option<String>,
    pub file_uri: Option<String>,
    pub is_sio: bool,
}

#[derive(Queryable, Identifiable, Selectable, Associations, Debug, PartialEq, Serialize)]
#[diesel(belongs_to(Label))]
#[diesel(belongs_to(Project))]
#[diesel(table_name= crate::schema::project_label)]
#[diesel(primary_key(label_id, project_id))]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ProjectLabel {
    pub project_id: uuid::Uuid,
    pub label_id: uuid::Uuid,
}

#[derive(Serialize)]
pub struct ProjectWithLabels {
    #[serde(flatten)]
    pub project: Project,
    pub labels: Vec<Label>,
}
