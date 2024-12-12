# Backend - Fonomed Project

The backend of the Fonomed project is built using Node.js and Express.js.
It provides RESTful APIs for user management, appointment scheduling, and more.

## Features

- User authentication with JWT and Two-Factor Authentication (2FA).
- Integration with PostgreSQL using Sequelize ORM.
- Push notifications via OneSignal.
- Payment gateway integration with Pagadito.
- AI-based predictive analysis using Python models.

## Directory Structure

- **routes/**: Contains all API route files (e.g., `auth.js`, `payments.js`).
- **models/**: Database models for users, appointments, and achievements.
- **Dockerfile**: Configuration for containerizing the backend.

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```
2. Run the server:
    ```bash
    npm start
    ```
3. API documentation is available at `/api-docs` (if integrated with Swagger).
