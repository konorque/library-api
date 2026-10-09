# Library API

A REST API for a small book library. Users can register, log in, browse the book catalog, add new books, and keep a personal "my books" list.

Built as a learning project to practice backend fundamentals: authentication, data relations, validation, error handling, security basics, and automated tests.

## Tech stack

- Node.js, Express 5
- MongoDB with Mongoose
- JWT authentication, passwords hashed with bcrypt
- Security: helmet, CORS, rate limiting (express-rate-limit), request logging (morgan)
- Testing: Jest, Supertest, mongodb-memory-server

## Getting started

### Prerequisites

- Node.js (a recent LTS version)
- A MongoDB database (a free MongoDB Atlas cluster works fine)

### Installation

```bash
git clone https://github.com/konorque/library-api.git
cd library-api
npm install
```

### Environment variables

Create a `.env` file in the project root:

| Variable      | Description                                  |
| ------------- | -------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string                    |
| `JWT_SECRET`  | Secret key used to sign and verify JWT tokens |

The `.env` file is listed in `.gitignore` and must never be committed.

### Run

```bash
npm start
```

The server starts on `http://localhost:3000`.

## API

Protected routes require the header `Authorization: Bearer <token>`. The token is returned by `POST /login` and is valid for 1 hour.

| Method | Endpoint             | Auth | Description                         |
| ------ | -------------------- | ---- | ----------------------------------- |
| POST   | `/register`          | no   | Create a new user                   |
| POST   | `/login`             | no   | Log in and get a JWT                |
| GET    | `/books`             | no   | List all books                      |
| GET    | `/books/:id`         | no   | Get one book by id                  |
| POST   | `/books`             | yes  | Add a new book to the catalog       |
| GET    | `/me/books`          | yes  | Get the current user's book list    |
| POST   | `/me/books/:bookId`  | yes  | Add a book to the current user's list |
| DELETE | `/me/books/:bookId`  | yes  | Remove a book from the user's list  |

Errors are returned as JSON in the form `{ "error": "message" }` with an appropriate HTTP status code (400, 401, 404, 409, 429, 500).

### Rate limiting

- Global limit: 100 requests per 15 minutes per IP.
- `/login`: 5 failed attempts per 15 minutes per IP.

## Tests

```bash
npm test
```

Tests run against an in-memory MongoDB instance, so no real database or `.env` is needed.

## Project structure

```
app.js          Express app setup (middleware, routes, error handler)
server.js       Entry point: connects to the database and starts the server
config/         Database connection
controllers/    Request handlers
middleware/     Authentication and error handling
models/         Mongoose schemas
routes/         Route definitions
tests/          API tests (Supertest)
utils/          Helpers (e.g. httpError)
```