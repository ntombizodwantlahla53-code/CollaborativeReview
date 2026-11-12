## CollaborativeReview

<img src="https://socialify.git.ci/ntombizodwantlahla53-code/CollaborativeReview/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="CollaborativeReview" width="640" height="320" />

## 1. Project Overview
```
The Collaborative Code Review Platform is a REST API that allows developers and teams to submit code for review and collaborate through comments and feedback.
Users can register, log in, create projects, assign reviewers, submit code, add comments, and manage the review process. The platform uses JWT authentication and role-based access control to manage permissions between Submitters and Reviewers.
The API is built with Node.js, TypeScript, Express, and PostgreSQL.
```

## 2. Use-case Scenario
```
Imagine a small development team working on different software projects. Instead of sharing code and feedback through different communication platforms, team members can use this platform to organise their code reviews.
>> For example:
- A Submitter registers and logs in.
- The Submitter creates a project.
- Reviewers are added as project members.
- The Submitter uploads code for review.
- A Reviewer checks the submitted code and adds comments.
- The Reviewer can approve the submission or request changes.
- The submission status can be checked to see its progress.
```

## 3. Core Features
### Authentication and User Management
```
- Register and log in.
- Password hashing using bcryptjs.
- JWT authentication.
- Two user roles: Submitter and Reviewer.
```

### Projects
```
- Create projects.
- View all projects.
- View a project by its ID.
- Update project details.
- Delete projects.
- Add and remove project members.
```

### Code Submissions
```
- Submit code snippets.
- View submissions belonging to a project.
- View a single submission.
- Update submission status.
- Delete submissions.
```

### Comments
```
- Add comments to submissions.
- Include a line number when commenting on specific code.
- View comments.
- Update and delete comments.
- Only Reviewers can add, update, and delete comments.
```

### Review Workflow
```
- Approve submissions.
- Request changes to submissions.
- View review history.
```

## 4. Technologies Used
```
- **Node.js** -JavaScript runtime environment.
- **TypeScript** -Adds type checking to JavaScript.
- **Express.js** - Used to create the REST API and manage routes.
- **PostgreSQL**- Relational database used to store application data.
- **pg** - PostgreSQL client for Node.js.
- **JWT (jsonwebtoken)** -Used to authenticate users.
- **bcryptjs**- Used to hash passwords.
- **dotenv** -Loads environment variables.
- **Postman**- Used to test API endpoints.
- **Nodemon and tsx** - Used to run the development server.
```
## 5. Project Setup
### Step 1: Clone the Repository
Open terminal and run:
```bash
git clone https://github.com/ntombizodwantlahla53-code/CollaborativeReview.git
```
Navigate into the project folder:
```bash
cd CollaborativeReview
```

### Step 2: Install Dependencies
Install the dependencies already listed in `package.json`:
```bash
npm install
```

### Step 3: TypeScript Configuration
>>The project uses a`tsconfig.json`file to configure TypeScript.
The configuration is:
```json
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
```

### Step 4: Package.json Scripts
The project uses the following scripts:
```json
"scripts": {
  "build": "tsc",
  "start": "ts-node src/server.ts",
  "dev": "nodemon --exec npx tsx src/server.ts"
}
```
- `npm run build` -Runs 
- `npm start` -Starts the application using ts-node.
- `npm run dev` -Starts 
>>NB -restarts the server when files change.

## 6. PostgreSQL Database Setup
>>>, Create a PostgreSQL database named:
```sql
CREATE DATABASE CollaborativeReview;
```

### Connecting to the Database
```
>The application uses a PostgreSQL connection pool configured in `src/config/database.ts`.
```
>> Create a `.env` file in the root folder of the project and add your database details LIKE this >:
```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=CollaborativeReview
DB_PASSWORD=your_database_password
DB_PORT=5432

PORT=5000

JWT_SECRET=your_secret_key
```

- Do not upload your `.env`file to GitHub so better to :
Create a `.gitignore` file in the root folder and add:

```gitignore
.env
node_modules/
dist/
```

## 7. Database Tables

>Create the tables in pgAdmin using the Query Tool. The tables are created in the following order because they are connected through foreign key relationships.: 

### 7.1 Users Table
>Stores registered users and their login information.
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

>>Add user roles:

```sql
ALTER TABLE users
ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'Submitter';

ALTER TABLE users
ADD CONSTRAINT users_role_check
CHECK (role IN ('Submitter', 'Reviewer'));
```

### 7.2 Projects Table
>Stores projects created by users.
```sql
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

>Connect projects to users:
```sql
ALTER TABLE projects
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

>Add a column for project members:
```sql
ALTER TABLE projects
ADD COLUMN members_id INT[] DEFAULT '{}';
```

### 7.3 Submissions Table


>Stores code submitted for review.
```sql
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY NOT NULL,
    code TEXT NOT NULL,
    project_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

>Connect submissions to projects:
```sql
ALTER TABLE submissions
ADD CONSTRAINT fk_submission_project
FOREIGN KEY (project_id)
REFERENCES projects(project_id)
ON DELETE CASCADE;
```

>Add submission status rules:
```sql
ALTER TABLE submissions
ADD CONSTRAINT submission_status_check
CHECK (
    status IN ('pending', 'in_review', 'approved', 'changes_requested')
);
```

### 7.4 Comments Table
>> Stores comments added to code submissions.
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

>Connect comments to submissions:
```sql
ALTER TABLE comments
ADD CONSTRAINT fk_submission
FOREIGN KEY (submission_id)
REFERENCES submissions(submission_id)
ON DELETE CASCADE;
```

>Connect comments to users:
```sql
ALTER TABLE comments
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

### 7.5 Reviews Table
>> Stores the review history of submissions.
```sql
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

>Connect reviews to submissions:
```sql
ALTER TABLE reviews
ADD CONSTRAINT fk_submission
FOREIGN KEY (submission_id)
REFERENCES submissions(submission_id)
ON DELETE CASCADE;
```

>Connect reviews to users:
```sql
ALTER TABLE reviews
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

## 8. Running the Application
>> After setting up the database and `.env` file, start the development server.
```bash
npm run dev
```

>>>The server uses port `5000` by default.
>>>When the server starts successfully, you should see a message similar to:
```text
Database connection successfull
Server is running on http://localhost:5000
```
>>>>The base URL for testing the API is:
```text
http://localhost:5000
```

## 9. Testing the API with Postman

>Postman is used to send HTTP requests to the API and check the responses.

### Understanding API Endpoints

>An endpoint is a URL used to access a particular function of the API.
>>Each endpoint has an HTTP method that tells the API what operation to perform.

| HTTP Method | Meaning                         |
|-------------|---------------------------------|
| GET         | Retrieves information.          |
| POST        | Creates or submits information. |
| PUT         | Updates existing information.   |
| DELETE      | Deletes information.            |

### 9.1 Authentication Endpoints

| Method    | Endpoint            | Description |
|-----------|---------------------|---------------------------------------------------|
| POST      | `/api/auth/register`| Registers a new user.                             |
| POST      | `/api/auth/login`   | Logs in an existing user and returns a JWT token. |

**Example:Registering a user**
Select `POST` in Postman and theb enter:
```text
http://localhost:5000/api/auth/register
```
Under **Body**, select **raw** and thenn choose **JSON**:
```json
{
  "email": "ntombi@gmail.com",
  "password": "ncumoluhle123",
  "role": "Reviewer"
}
```
>>> You can also register a Submitter by changing the role to`"Submitter"`.

**Example: Login**
Select `POST` then enter:
```text
http://localhost:5000/api/auth/login
```
Under **Body > raw > JSON**, enter:
```json
{
  "email": "ntombi@gmail.com",
  "password": "ncumoluhle123"
}
```
>> After a successful login, the API returns a JWT token.
>> now you have to Copy the token because it is needed when testing protected endpoints.
Some endpoints require the user to be logged in.

In Postman follow these steps as theyare:
1. Open the **Authorization** tab
2. Select **Bearer Token**
3. Paste the JWT token returned from login

>>Replace `YOUR_JWT_TOKEN` with your actual token that you got when you were loging in.

### 9.3 Projects Endpoints

| Method  | Endpoint                    | Description                       |
|---------|-----------------------------|-----------------------------------|
| POST    | `/api/projects`             | Creates a new project.            |
| GET     | `/api/projects`             | Retrieves projects.               |
| GET     | `/api/projects/:project_id` | Retrieves a project using its ID. |
| PUT     | `/api/projects/:project_id` | Updates a project.                |
| DELETE  | `/api/projects/:project_id` | Deletes a project.                |

**Example:Create a project**
```text
POST http://localhost:5000/api/projects
```
Body:
```json
{
  "title": "Library Management System"
}
```

**Example: View project with Id 1**
```text
GET http://localhost:5000/api/projects/1
```

### 9.4 Project Members Endpoints

| Method | Endpoint                                    | Description                      |
|--------|---------------------------------------------|----------------------------------|
| POST   | `/api/projects/:project_id/members`         | Adds a Reviewer to a project.    |
| DELETE | `/api/projects/:project_id/members/:userId` | Removes a member from a project. |

**Example: Add a project member**
```text
POST http://localhost:5000/api/projects/1/members
```
Body:
```json
{
  "user_id": 2
}
```
>> So inHere, the number`1` is the project Id then `2` is the user Id of the Reviewer being added.

### 9.5 Code Submission Endpoints
| Method | Endpoint                        | Description                                   |
|--------|---------------------------------|-----------------------------------------------|
| POST   | `/api/submissions`              | Creates a code submission.                    |
| GET    | `/api/projects/:id/submissions` | Retrieves submissions belonging to a project. |
| GET    | `/api/submissions/:id`          | Retrieves one submission using its ID.        |
| PUT    | `/api/submissions/:id/status`   | Updates a submission's status.                |
| DELETE | `/api/submissions/:id`          | Deletes a submission.                         |

**Example: Create a submission**
```text
POST http://localhost:5000/api/submissions
```
Body:
```json
{
  "project_id": 1,
  "code": "console.log('Hello World');"
}
```

**Example: View submissions for project 1**
```text
GET http://localhost:5000/api/projects/1/submissions
```

**Example: Update submission status**
```text
PUT http://localhost:5000/api/submissions/1/status
```
Body:
```json
{
  "status": "in_review"
}
```
>>> The available statuses are:
- `pending` -the submission is waiting for review.
- `in_review` -the submission is being reviewed.
- `approved`-The submission has been approved.
- `changes_requested` -changes have been requested.

### 9.6 Comments Endpoints
| Method | Endpoint                        | Description                          |
|--------|---------------------------------|--------------------------------------|
| POST   | `/api/submissions/:id/comments` | Adds a comment to a submission.      |
| GET    | `/api/submissions/:id/comments` | Retrieves comments for a submission. |
| GET    | `/api/comments/:id`             | Retrieves a comment using its ID.    |
| PUT    | `/api/comments/:id`             | Updates a comment.                   |
| DELETE | `/api/comments/:id`             | Deletes a comment.                   |

**Example: Add a comment**
```text
POST http://localhost:5000/api/submissions/1/comments
```
Body:
```json
{
  "comment": "Please improve this and that, ui.",
  "line_number": 5
}
```
>> NB-Only users with the Reviewer role can add, update or delete comments.

### 9.7 Review Workflow Endpoints

| Method | Endpoint                               | Description                       |
|--------|----------------------------------------|-----------------------------------|
| POST   | `/api/submissions/:id/approve`         | Approves a submission.            |
| POST   | `/api/submissions/:id/request-changes` | Requests changes to a submission. |
| GET    | `/api/submissions/:id/reviews`         | Retrieves the review history.     |

**Example: Approve submission 1**
```text
POST http://localhost:5000/api/submissions/1/approve
```

**Example: Request changes**
```text
POST http://localhost:5000/api/submissions/1/request-changes
```

**Example: View review history**
```text
GET http://localhost:5000/api/submissions/1/reviews
```
>> NB-Only Reviewers can approve submissions or request changes.

