## CollaborativeReview

<img src="https://socialify.git.ci/ntombizodwantlahla53-code/CollaborativeReview/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="CollaborativeReview" width="640" height="320" />

## Project Description
```
The Collaborative Code Review Platform is a REST API that allows developers and teams to submit code for review and collaborate through comments and feedback. Users can create projects, submit code, assign reviewers, add comments to submissions, and manage the review process.
The platform uses authentication and role-based access control to help manage permissions between Submitters and Reviewers. It also tracks submission statuses and review history to provide a structured code review process.

```
## 1. Project Setup

Clone the repository and open the project folder:
```bash
git clone https://github.com/ntombizodwantlahla53-code/CollaborativeReview.git
cd CollaborativeReview
```

## 2. Install Dependencies
Install all project dependencies from `package.json`:
```bash
npm install

npm init -y

The project uses:
* Express
* PostgreSQL (`pg`)
* dotenv
* JSON Web Token (`jsonwebtoken`)
* bcryptjs
* TypeScript
* ts-node
* Nodemon
* tsx

put these 1by1 on your terminal to install dependencies:

npm i express pg dotenv
npm i -D typescript ts-node nodemon @types/node @types/express @types/pg
npx tsc –init
npm i jsonwebtoken bcryptjs
npm i -D @types/jsonwebtoken @types/bcryptjs
npm i tsx --save-dev

```

## 3. TypeScript Setup

The project uses TypeScript and includes a `tsconfig.json` configuration file.|
here is what should be on your tsconfig.json.

```
{
"compilerOptions": {
"target": "ES2022",
"module": "NodeNext",
"moduleResolution": "NodeNext",
"esModuleInterop": true,
"strict": true,
"outDir": "./dist",
"rootDir": "./src",
"noEmit": true

  },
"include": ["src/**/*"],
"files": ["src/types/express.d.ts"]
}

Also on your package.json inside change scripts and put this one :

"scripts": {
    "build": "tsc",
    "start": "ts-node src/server.ts",
    "dev": " nodemon --exec npx tsx src/server.ts"}
```

## 4. PostgreSQL Database Setup

Create a PostgreSQL database for the project.

## The application uses the following environment variables to connect to PostgreSQL:

```.env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=CollaborativeReview
DB_PASSWORD=your_database_password
DB_PORT=5432
PORT=3000

JWT_SECRET=your_secret_key
```

Create a `.env` file in the root of the project and add your own database password and JWT secret.

Do not upload the `.env` file to GitHub. CREATE (.gitignore) file then 
put .*env on .gitignore file and put *node_modules so that your env will not go to you github when you push your task to github.

## 5. Database Tables

Create the database tables on your PGAdmin ,in the following order because the tables have relationships with each other:

### 5.1 Users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
Add user roles:
```sql
ALTER TABLE users
ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'Submitter';

ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (role IN ('Submitter', 'Reviewer'));
```

### 5.2 Projects

```sql
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

Connect projects to users:

```sql
ALTER TABLE projects
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```
Add project members:
```sql
ALTER TABLE projects
ADD COLUMN members_id INT[] DEFAULT '{}';
```

### 5.3 Submissions

```sql
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY NOT NULL,
    code TEXT NOT NULL,
    project_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
Connect submissions to projects:

```sql
ALTER TABLE submissions
ADD CONSTRAINT fk_submission_project
FOREIGN KEY (project_id)
REFERENCES projects(project_id)
ON DELETE CASCADE;
```
Add submission status rules:

```sql
ALTER TABLE submissions
ADD CONSTRAINT submission_status_check
CHECK (
    status IN ('pending','in_review','approved','changes_requested')
);
```

### 5.4 Comments

```sql
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY NOT NULL,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    line_number INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
Connect comments to submissions:

```sql
ALTER TABLE comments
ADD CONSTRAINT fk_submission
FOREIGN KEY (submission_id)
REFERENCES submissions(submission_id)
ON DELETE CASCADE;
```
Connect comments to users:
```sql
ALTER TABLE comments
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

### 5.5 Reviews

```sql
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
Connect reviews to submissions:

```sql
ALTER TABLE reviews
ADD CONSTRAINT fk_submission
FOREIGN KEY (submission_id)
REFERENCES submissions(submission_id)
ON DELETE CASCADE;
```
Connect reviews to users:

```sql
ALTER TABLE reviews
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

## 6. Run the Application

Run the development server with:
```bash
npm run dev
```

## 7. Test the API with Postman

The API endpoints are tested using **Postman**.
First register a user and then log in:

```text
POST /api/auth/register
POST /api/auth/login
```
After login, copy the JWT token returned by the API.

## For protected endpoints, use the following authorization header in Postman:
```text
Authorization: Bearer YOUR_JWT_TOKEN
```
The API can then be tested in Postman for:

# 1 Authentication
# 2 Users
# 3 Projects
# 4 Project members
# 5 Code submissions
# 6 Comments
# 7 Reviews

