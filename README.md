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

