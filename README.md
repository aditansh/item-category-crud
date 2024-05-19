A CRUP api for simple item management.

## Tech Stack

- [Node.js](https://nodejs.org): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com): A fast, unopinionated, minimalist web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org): TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- [PostgreSQL](https://www.postgresql.org): A powerful, open source object-relational database system.
- [Docker](https://www.docker.com): Docker is a platform for building, running, and shipping applications.

# How To Run

## Prerequisites:

- [Docker](https://www.docker.com): Docker is a platform for building, running, and shipping applications.
- [Postman](https://www.postman.com)/[Apidog](https://apidog.com): A tool to test backend APIs without having to write frontends.
  [Postman Collection](https://documenter.getpostman.com/view/25706513/2sA3QmCZbj)

## Steps

1. Clone the repository:

```bash
git clone https://github.com/aditansh/item-category-crud.git
```

2. Create a `.env` file in the root directory and add the following environment variables:

```bash
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=guestara

DATABASE_URL="postgresql://postgres:admin@postgres:5432/guestara"
PORT=8080

ACCESS_TOKEN_SECRET=your-access-token-secret-key
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key
ACCESS_TOKEN_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=720h
```

3. Run the following command to start the backend:

```bash
docker-compose up --build -d
```

4.  Use Postman and test the api at the endpoint `http://localhost:8080/`

# Answe to the questions

1. Which database you have chosen and why?
```bash
I have chosen PostgreSQL as the database because the data is structured and relational. PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.
```

2. 3 things that you learned from this assignment?
```bash
- I learned how to use Prisma to interact with the database.
- I learned how to use Docker when there are migrations to be run.
- I learned how to use TypeScript with Express.js.
```

3. What was the most difficult part of the assignment?
```bash
The most difficult part of the assignment was to set up the Prisma ORM with the PostgreSQL database. I had to learn how to use Prisma and how to write the schema for the database.
```

4. What you would have done differently given more time?
```bash
If I had more time, I would have written tests for the API endpoints. I would have also added more features to the API like pagination, filtering, and sorting.
```
