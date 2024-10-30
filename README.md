# Rotaract Admin Dashboard

This project is a Next.js application configured to use Docker for both the app and a PostgreSQL database, optimized for development with hot reloading.

## Features

- **Next.js** for the frontend
- **Docker** setup for easy deployment and consistent development environments
- **PostgreSQL** as the database
- **Hot Reloading** for development

## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/mydatabase"
AUTH_SECRET="<your_auth_secret>"
AUTH_TRUST_HOST=true
RESEND_API_KEY="<your_resend_api_key>"
DEPLOY_HOOK="<your_deploy_hook_url>"
```

### 3. Build and Run the Docker Containers

```bash
docker-compose up --build
```

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000` to see the application running.
