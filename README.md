# Yet Another Weather App

This project showcases my journey of mastering Node.js and its related technologies.

### Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)
- [Important Information](#important-information)
- [Questions](#questions)

## Introduction

This app interacts with the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather forecasts based on city queries. It includes database management with CRUD operations, data validation middleware, error handling, and a logging system for console and files.

## Tech Stack

- **Backend Framework**: Express.js
- **Programming Language**: TypeScript
- **Database**: Sequelize
- **Validation**: Express-validator
- **Logging**: Pino, Pino-HTTP, Pino-Pretty
- **Documentation**: Swagger UI, Swagger-parser
- **Environment Variables**: dotenv
- **HTTP Requests**: got
- **Code Quality**: ESLint, Prettier
- **Testing**: Mocha, Chai, Supertest, nyc

## Deployment

1. Clone the repository:
    ```bash
    git clone https://github.com/username/project-name.git
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-name-folder>
    ```
3. Create `.env.prod` and `.env.test` files based on `.env-example`
4. Run the App with Docker (start containers)
    ```bash
    npm run docker:prod
    ```

## Important Information

- An API key is required to fetch weather data from [OpenWeatherMap](https://openweathermap.org/api).
- Proper configuration of `.env` files is essential for smooth operation.
- Use [Postman](https://www.postman.com/downloads/) to test endpoints (recommended).
- The structure is based on [STRV lecture](https://github.com/strvcom/backend-academy-2022/wiki/Lesson-3:-Project-setup-&-Architecture-in-Nodejs-App) and other videos from the [series](https://github.com/strvcom/backend-academy-2022/wiki).
- API documentation is available at `/api-docs` (runtime).
- Tests are currently unavailable due to an error when running Mocha.


## Questions

- **Structure**:

    - Did I correctly implement the suggested project structure? If not, what could be improved?

- **Packages**:

    - Are all necessary dependencies for a complete backend application included?
    - Are the packages used appropriately? If not, what should be changed?
    - Which versions of used packages do you recommend as stable and verified?
    - What additional tools or libraries could enhance this simple project?
    - Do you have a list of commonly used dependencies in STRV backend projects? (e.g., Koa, Knex, Husky, Makefile)
    - Do you use `jsonschema` or `ajv` for input validation in middleware?

- **Node.js**:

    - Why use a Makefile when scripts can be added to `package.json`? Is it a matter of preference, or are there functional advantages?
    - What is the purpose of the `@types` folder in your projects? Do you include all shared types there?
    - Is Node.js version 20.18.0 stable for production use, or should I consider another version?

- **TypeScript**:

    - Does my usage align with your projects, or do you prefer a more OOP-focused structure (e.g., more classes, interfaces)?
    - What are your default settings for `tsconfig` files, and how do you manage separate configurations for general use and builds?

- **Knex**: Do you combine Knex and Sequelize in projects, or is it one or the other?

- **Swagger**:

    - Do you prefer static `.yaml` files with `$ref` or dynamic in-code annotations (e.g., `@swagger`)?
    - Is placing response schemas in a `res` folder a good practice, or should they be defined within each endpoint?
    - How do you generate an `index.html` in the `docs` folder from a `swagger.yaml` file during compilation?

- **Docker**: How do you manage `docker-compose` files for different environments? For example:

    - `docker-compose.no-api.yaml` (testing DB or dev?)
    - `docker-compose.yaml` (API + DB)
    - `docker-compose.test.yaml` (test environment?)

- **GitHub Actions**: How could I integrate GitHub Actions into this app?

- **Testing**:

    - I encounter the following error when running tests:
        ```
        TypeError [ERR_INVALID_ARG_VALUE]: The argument 'id' must be a non-empty string. Received ''
        ```
        Could you help me identify the issue? I think it has to be something with version of `node`, `ts` or `ts-node`.

- **Code Quality**: 
    - STRV provides several ESLint and Prettier configurations on NPM. Which do you use? I attempted to configure them but would appreciate guidance as this is my first time.
    - 
