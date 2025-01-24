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
    npm run api:prod
    ```

## Important Information

- An API key is required to fetch weather data from [OpenWeatherMap](https://openweathermap.org/api).
- Proper configuration of `.env` files is essential for smooth operation.
- Use [Postman](https://www.postman.com/downloads/) to test endpoints (recommended).
- The structure is based on [STRV lecture](https://github.com/strvcom/backend-academy-2022/wiki/Lesson-3:-Project-setup-&-Architecture-in-Nodejs-App) and other videos from the [series](https://github.com/strvcom/backend-academy-2022/wiki).
- API documentation is available at `/api-docs` (runtime).
- Tests are currently unavailable due to an error when running Mocha.
