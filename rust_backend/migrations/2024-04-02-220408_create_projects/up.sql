CREATE TABLE project (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    github_url VARCHAR(255) NOT NULL,
    project_url VARCHAR(255),
    file_uri VARCHAR(255),
    is_sio BOOLEAN NOT NULL
);

CREATE TABLE label (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE project_label (
    project_id BIGINT,
    label_id BIGINT,
    PRIMARY KEY (project_id, label_id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    FOREIGN KEY (label_id) REFERENCES label(id)
);
