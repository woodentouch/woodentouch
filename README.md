# Woodentouch Deployment Guide

This repository contains a Spring Boot backend and a React frontend. The project can be deployed locally or on [Railway](https://railway.app/).

## Local Development

1. **Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The backend listens on port `8080` by default and expects a MySQL database named `wooden` running locally.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deploying on Railway

### 1. Create the Services

Create two Railway services using the provided Dockerfiles:

- **Backend** – use `backend/Dockerfile`.
- **Frontend** – use `frontend/Dockerfile`.

### 2. Database

Add a **MySQL plugin** to the backend service. Railway will automatically provide the following environment variables:
`MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD` and `MYSQLDATABASE`.

The backend configuration reads these variables. No manual changes are required other than attaching the plugin.

### 3. Environment Variables

Backend also uses the `PORT` variable set by Railway. Frontend requires `VITE_APP_BASE_API` at build time to point to the backend URL. Set this variable in the frontend service settings before deploying.

### 4. Deploy

Trigger a deployment for each service. Railway will build the Docker images and start your application. Once the backend is running you can seed the database with your own data.

## SumUp Integration
The backend can periodically sync products, categories and transactions from SumUp.
Set the access token using the `SUMUP_TOKEN` environment variable. Transactions
are imported into the `panier` tables every 10 minutes so statistics and stock
remain consistent.
