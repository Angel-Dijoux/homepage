CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE project (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    github_url VARCHAR(255) NOT NULL,
    project_url VARCHAR(255),
    file_uri VARCHAR(255),
    is_sio BOOLEAN NOT NULL
);

CREATE TABLE label (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE project_label (
    project_id UUID,
    label_id UUID,
    PRIMARY KEY (project_id, label_id),
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
    FOREIGN KEY (label_id) REFERENCES label(id) ON DELETE CASCADE
);
