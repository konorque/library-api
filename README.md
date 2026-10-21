# Library

A small full-stack book library: a REST API with authentication and a React frontend that reads the book catalog from it.

Built as a learning project to practice the full path from the database to the browser: authentication, data relations, validation, error handling, security basics, automated tests, Docker, and a React + TypeScript frontend.

## Project structure

This is a monorepo with two independent apps. Each has its own `package.json`, dependencies and commands.

```
backend/     REST API (Node.js, Express 5, TypeScript, MongoDB)
frontend/    Web client (React, TypeScript, Vite)
compose.yaml Docker Compose: API + MongoDB
.github/     CI: runs type checks and tests for the backend
```

Inside `backend/`:

```
app.ts          Express app setup (middleware, routes, error handler)
server.ts       Entry point: connects to the database and starts the server
config/         Database connection
controllers/    Request handlers
middleware/     Authentication and error handling
models/         Mongoose schemas
routes/         Route definitions
tests/          API tests (Supertest)
types/          Shared TypeScript types
utils/          Helpers (e.g. httpError)
postman/        Postman collection for manual testing
```

## Tech stack

**Backend**

- Node.js, Express 5, TypeScript
- MongoDB with Mongoose
- JWT authentication, passwords hashed with bcrypt
- Security: helmet, CORS, rate limiting (express-rate-limit), request logging (morgan)
- Testing: Jest, Supertest, mongodb-memory-server
- Docker and Docker Compose, GitHub Actions CI

**Frontend**

- React, TypeScript, Vite
- ESLint

## Getting started

### Prerequisites

- Node.js 22 (a recent LTS version)
- A MongoDB database (a free MongoDB Atlas cluster works fine) or Docker

### Clone

```bash
git clone https://github.com/konorque/library-api.git
cd library-api
```

### Run the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

| Variable      | Description                                   |
| ------------- | --------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string                     |
| `JWT_SECRET`  | Secret key used to sign and verify JWT tokens |

The `.env` file is listed in `.gitignore` and must never be committed. See `backend/.env.example` for the format.

Then build and start the server:

```bash
npm run build
npm start
```

The API starts on `http://localhost:3000`.

### Run the frontend

In a second terminal, with the backend already running:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The page loads the book list from `GET /books`. Adding and deleting books in the UI currently only changes the local list (no requests to the API yet).

### Run the backend with Docker

From the repository root:

```bash
docker compose up --build
```

This starts the API on `http://localhost:3000` together with a local MongoDB container. The `.env` file in `backend/` still has to contain `JWT_SECRET`; the database address is overridden by `compose.yaml`.

## API

Protected routes require the header `Authorization: Bearer <token>`. The token is returned by `POST /login` and is valid for 1 hour.

| Method | Endpoint            | Auth | Description                           |
| ------ | ------------------- | ---- | ------------------------------------- |
| POST   | `/register`         | no   | Create a new user                     |
| POST   | `/login`            | no   | Log in and get a JWT                  |
| GET    | `/books`            | no   | List all books                        |
| GET    | `/books/:id`        | no   | Get one book by id                    |
| POST   | `/books`            | yes  | Add a new book to the catalog         |
| GET    | `/me/books`         | yes  | Get the current user's book list      |
| POST   | `/me/books/:bookId` | yes  | Add a book to the current user's list |
| DELETE | `/me/books/:bookId` | yes  | Remove a book from the user's list    |

Errors are returned as JSON in the form `{ "error": "message" }` with an appropriate HTTP status code (400, 401, 404, 409, 429, 500).

### Rate limiting

- Global limit: 100 requests per 15 minutes per IP.
- `/login`: 5 failed attempts per 15 minutes per IP.

## Tests

```bash
cd backend
npm test
```

Tests run against an in-memory MongoDB instance, so no real database or `.env` is needed. The same tests, plus a TypeScript check (`npx tsc --noEmit`), run in GitHub Actions on every push to `master` and on every pull request.
