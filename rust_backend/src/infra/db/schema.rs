// @generated automatically by Diesel CLI.

diesel::table! {
    label (id) {
        id -> Uuid,
        name -> Varchar,
    }
}

diesel::table! {
    project (id) {
        id -> Uuid,
        title -> Varchar,
        description -> Text,
        shorten_description -> Varchar,
        image_url -> Varchar,
        github_url -> Varchar,
        project_url -> Nullable<Varchar>,
        file_uri -> Nullable<Varchar>,
        is_sio -> Bool,
    }
}

diesel::table! {
    project_label (project_id, label_id) {
        project_id -> Uuid,
        label_id -> Uuid,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    label,
    project,
    project_label,
);
