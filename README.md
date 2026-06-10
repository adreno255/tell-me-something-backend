# Tell Me Something API

A REST API for sending anonymous messages to recipients. Built with Node.js, Express, TypeScript, and MongoDB.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Pagination](#pagination)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

---

## Overview

Tell Me Something lets users send anonymous posts to a named recipient. Posts include a recipient name, a message, and a signature. The API supports paginated retrieval, recipient-based filtering, and sorting.

---

## Tech Stack

- **Runtime** — Node.js 26
- **Framework** — Express 5
- **Language** — TypeScript (ESM)
- **Database** — MongoDB via Mongoose
- **Validation** — Zod
- **Logging** — Winston + Morgan
- **Documentation** — swagger-jsdoc + swagger-ui-express
- **Containerization** — Docker (multi-stage)

---

## Project Structure

```
src/
  config/
    cors.ts           # CORS configuration
    database.ts       # Mongoose connection
    env.ts            # Environment variable validation
    swagger.ts        # swagger-jsdoc configuration
  controllers/
    post.controller.ts
  docs/
    components.ts     # Shared OpenAPI schemas
  middlewares/
    error-handler.ts  # Centralized error handler
    validate.ts       # Zod validation middleware
  models/
    post.model.ts     # Mongoose schema + Zod schemas
  routes/
    post.routes.ts
  services/
    app.service.ts    # Root endpoint info
    post.service.ts
  types/
    pagination.types.ts
  utils/
    app-error.ts      # Custom error class
    logger.ts         # Winston logger
    pagination.utils.ts # PaginationHelper + PaginationQuerySchema
  app.ts              # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- Docker (optional)

### Local Setup

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/tell-me-something-backend.git
cd tell-me-something-backend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up environment variables:**

```bash
cp .env.example .env.development
```

Fill in the values in `.env.development` — see [Environment Variables](#environment-variables).

**4. Start the development server:**

```bash
npm run dev
```

The server starts at `http://localhost:3000`. API docs are available at `http://localhost:3000/docs`.

### Docker Setup

**Development:**

```bash
docker build --target development -t tell-me-something-backend:dev .
docker run --env-file .env.development -p 3000:3000 tell-me-something-backend:dev
```

**Production:**

```bash
docker build --target production -t tell-me-something-backend:prod .
docker run --env-file .env.production -p 3000:3000 tell-me-something-backend:prod
```

---

## Environment Variables

Create a `.env.development` file in the project root with the following variables:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment | `development` |
| `PORT` | No | Server port (default: 3000) | `3000` |
| `CLIENT_URL` | Yes | Allowed CORS origin | `http://localhost:5173` |
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb://localhost:27017/tell-me-something-db` |

> Never commit `.env.development` or `.env.production` to version control.

---

## API Reference

Base URL: `http://localhost:3000`

Interactive documentation: `http://localhost:3000/docs`

---

### Health Check

#### `GET /`

Returns server info.

**Response `200`:**
```json
{
  "name": "Tell Me Something API Server",
  "status": "ok",
  "environment": "development",
  "version": "1.0.0"
}
```

---

### Posts

#### `POST /posts`

Create a new post.

**Request body:**
```json
{
  "recipient": "Angelo",
  "content": "You are doing great!",
  "signature": "A friend"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `recipient` | string | 1–20 characters |
| `content` | string | 1–4000 characters |
| `signature` | string | 1–20 characters |

**Response `201`:**
```json
{
  "message": "Post created successfully!",
  "post": {
    "_id": "...",
    "recipient": "Angelo",
    "content": "You are doing great!",
    "signature": "A friend",
    "createdAt": "2025-03-12T10:45:23.123Z",
    "updatedAt": "2025-03-12T10:45:23.123Z"
  }
}
```

---

#### `GET /posts`

Get all posts with pagination, filtering, and sorting.

**Query parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `limit` | integer | `10` | Items per page |
| `recipient` | string | — | Filter by recipient (left-anchored, case-insensitive) |
| `sortOrder` | `asc` \| `desc` | `desc` | Sort by creation date |

**Response `200`:**
```json
{
  "data": [...],
  "meta": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

#### `GET /posts/:id`

Get a post by ID.

**Response `200`:**
```json
{
  "message": "Post fetched successfully!",
  "post": {
    "_id": "...",
    "recipient": "Angelo",
    "content": "You are doing great!",
    "signature": "A friend",
    "createdAt": "2025-03-12T10:45:23.123Z",
    "updatedAt": "2025-03-12T10:45:23.123Z"
  }
}
```

**Response `404`:** Post not found.

---

## Pagination

All paginated endpoints return a `meta` object alongside the `data` array:

```json
{
  "data": [],
  "meta": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

## Error Handling

All errors return a consistent envelope:

```json
{
  "statusCode": 404,
  "timestamp": "2025-03-12T10:45:23.123Z",
  "path": "/posts/invalid-id",
  "message": "Post not found"
}
```

Validation errors return a structured `message`:

```json
{
  "statusCode": 400,
  "timestamp": "2025-03-12T10:45:23.123Z",
  "path": "/posts",
  "message": [
    { "field": "recipient", "message": "Required" }
  ]
}
```

---

## Deployment

The API is deployed on **Render** using the production Docker image.

The production image:
- Runs as a non-root user
- Contains only compiled JavaScript and production dependencies
- Has a health check configured on `GET /`

To deploy your own instance:

1. Push your repository to GitHub
2. Create a new **Web Service** on Render
3. Connect your repository
4. Set **Environment** to **Docker**
5. Add your environment variables under **Environment**
6. Deploy

---

## License

MIT