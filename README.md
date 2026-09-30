npm init -y
npm i express pg dotenv
npm i -D typescript ts-node nodemon @types/node @types/express @types/pg
npx tsc –init

CREATE TABLE projects (
project_id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255) NOT NULL,
user_id INT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE projects
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
select members_id = array_append(member_id,$1)
where id=$2

ALTER TABLE users
ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'Submitter';

ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (role IN ('Submitter', 'Reviewer'));

DB_USER= postgres DB_HOST=localhost DB_DATABASE=code-review DB_PASSWORD=...... DB_PORT=5432 PORT=3000

JWT_SECRET= this-key-is-very-secret

CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_submission_project
    FOREIGN KEY (project_id)
    REFERENCES projects(project_id)
    ON DELETE CASCADE,

    CONSTRAINT submission_status_check
    CHECK (status IN ('pending', 'approved', 'rejected'))
);