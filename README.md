# Mini Blog

Mini blog is just another small project to practice several technologies on both frontend and backend. Objectives of the project were generate by AI - see [instructions for the project here](INSTRUCTIONS.md):

- Express.js
- Postgres 
- TypeORM
- JWT
- React
- Redux
- Typescript

As all of my side projects - still WIP...

## Setup backend

**1. Install postgres**
 - https://www.postgresql.org/download/

**2. Prepare database for local development**

- create postgres user for the app with username `mini_blog_development` and password `mini_blog_development`:
```bash
psql -U postgres -c "CREATE USER mini_blog_development WITH PASSWORD 'mini_blog_development';"
```

- create `mini_blog_development` database with owner `mini_blog_development`:
```bash
psql -U postgres -c "CREATE DATABASE mini_blog_development OWNER mini_blog_development;"
```

**3. Install project dependencies**

```bash
yarn install
```

**4. Run migrations and seed database**

```bash
yarn db:migrate && yarn db:seed
```

**5. Run server**

```bash
yarn dev
```

## Setup frontend

**0. Open new terminal window and go into `frontend` folder**

```bash
cd frontend
```

**1. Install dependencies**

```bash
yarn install
```

**2. Run frontend app**

```bash
yarn dev
```

You can now open application on http://localhost:5173
Primary user for testing purposes is user with username `test` and password `12345678`
