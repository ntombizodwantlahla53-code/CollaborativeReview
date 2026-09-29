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
