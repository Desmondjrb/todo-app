# Todo App

A full-stack todo application that can run on Cloudflare Pages with Functions.

## Local Development

1. Install dependencies: `npm install`
2. Start MongoDB: `docker-compose up -d`
3. Start the server: `npm run dev`
4. Open `http://localhost:3000` in your browser

## Deployment to Cloudflare

### Prerequisites

1. MongoDB Atlas account with a cluster
2. Enable Data API in Atlas (under Data API in the left menu)
3. Get your App ID and API Key from Atlas Data API settings

### Setup

1. Update `wrangler.toml` with your MongoDB Atlas Data API credentials:
   - `DATA_API_URL`: `https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1`
   - `API_KEY`: Your Data API key
   - `DATA_SOURCE`: Your cluster name (e.g., "Cluster0")
   - `DATABASE`: "todo_db"
   - `COLLECTION`: "todos"

2. Install Wrangler: `npm install -D wrangler`

3. Deploy to Cloudflare Pages: `npx wrangler pages deploy .`

### Environment Variables

For production, set the environment variables in your Cloudflare Pages dashboard or via Wrangler.

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
