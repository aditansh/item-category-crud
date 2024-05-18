A CRUP api for simple item management.

## Tech Stack

- [Node.js](https://nodejs.org): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com): A fast, unopinionated, minimalist web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org): TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- [PostgreSQL](https://www.postgresql.org): A powerful, open source object-relational database system.

# How To Run

## Prerequisites:

- [Node.js](https://nodejs.org): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Postman](https://www.postman.com)/[Apidog](https://apidog.com): A tool to test backend APIs without having to write frontends.

## Steps

1. Clone the repository:

```bash
git clone
```

2. Create a `.env` file in the root directory and add the following environment variables:

```bash
DATABASE_URL="postgresql://postgres:admin@localhost:5432/guestara"
PORT=8080

ACCESS_TOKEN_SECRET=your-access-token-secret-key
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key
ACCESS_TOKEN_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=720h
```

3. Install the dependencies:

```bash
npm install
```

4. Run the following command to migrate the database:

```bash
npm run migrate
```

5. Run the following command to start the backend:

```bash
npm run start
```

6.  Use Postman and test the api at the endpoint `http://localhost:8080/`
