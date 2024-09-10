# Car Rental Backend

## Introduction

A robust backend service for a car rental application, designed to manage car listings, bookings, and user authentication.

## Project Description

This project serves as the backend for a car rental platform, allowing users to browse available cars, make bookings, and manage their accounts. The API is built using Node.js and Express, with MongoDB as the database.

## Features

- User authentication (signup, login)
- Car management (create, read, update, delete)
- Booking management (create, read, update)
- Role-based access control (admin and user roles)
- Error handling and validation

## Technology Stack

- **Node.js**: JavaScript runtime for building the server.
- **Typescript**: Typed language for type safety and code quality.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Zod**: Schema validation library.
- **JWT**: For secure user authentication.
- **ESLint**: For code linting.

## Installation Guideline

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm / yarn / pnpm (package manager)

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/labibahmed10/car-rental-backend.git
   cd car-rental-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install / yarn install / pnpm install

   Make sure to delete the pnpm-lock.yaml file and
   run the other package manager installation command.
   ```

3. **Create a `.env` file** in the root directory and add the following configuration variables:

   ```env
   NODE_ENV=development
   PORT=8080
   DATABASE_URL="your_mongodb_connection_uri"
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRES_IN=12h
   REFRESH_TOKEN_EXPIRES_IN=7d
   BCRYPT_SALT_ROUNDS=10
   ```

4. **Run the application**:
   ```bash
   npm run start:dev
   ```

## Usage

- **API Endpoints**:
  - **User**:
    - `POST /api/auth/signup`: Register a new user.
    - `POST /api/auth/signin`: Log in an existing user.
  - **Cars**:
    - `GET /api/cars`: Retrieve all cars.
    - `GET /api/cars/:id`: Retrieve a car by ID.
    - `POST /api/cars`: Create a new car (admin only).
    - `PUT /api/cars/:id`: Update a car (admin only).
    - `PUT /api/cars/return`: Return a car (admin only).
    - `DELETE /api/cars/:id`: Delete a car (admin only).
  - **Bookings**:
    - `POST /api/bookings`: Create a new booking.
    - `GET /api/bookings`: Retrieve all bookings (admin only).
    - `GET /api/bookings/my-bookings`: Retrieve bookings for the logged-in user.

For more detailed usage, refer to the API documentation or the code comments.
