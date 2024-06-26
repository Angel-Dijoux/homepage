// @generated automatically by Diesel CLI.

diesel::table! {
    label (id) {
        id -> Uuid,
        #[max_length = 255]
        name -> Varchar,
    }
}

diesel::table! {
    project (id) {
        id -> Uuid,
        #[max_length = 255]
        title -> Varchar,
        description -> Text,
        #[max_length = 255]
        shorten_description -> Varchar,
        #[max_length = 255]
        image_url -> Varchar,
        #[max_length = 255]
        github_url -> Varchar,
        #[max_length = 255]
        project_url -> Nullable<Varchar>,
        #[max_length = 255]
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

diesel::joinable!(project_label -> label (label_id));
diesel::joinable!(project_label -> project (project_id));

diesel::allow_tables_to_appear_in_same_query!(label, project, project_label,);
