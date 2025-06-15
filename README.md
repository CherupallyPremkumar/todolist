# Todo List Backend

The backend server for the Todo List application built with Node.js, Express, and MongoDB. This server provides a RESTful API for managing tasks.

## Features

- RESTful API endpoints
- MongoDB database integration
- Error handling
- Input validation
- Unit tests
- CORS enabled
- Environment configuration

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the server directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todolist
```

## Running the Server

Start the development server:

```bash
npm start
```

The server will start running on http://localhost:5000

## Running Tests

Run the test suite:

```bash
npm test
```

## Project Structure

```
server/
├── src/
│   ├── models/          # MongoDB models
│   │   └── Task.js      # Task model
│   ├── routes/          # API routes
│   │   └── tasks.js     # Task routes
│   ├── tests/           # Test files
│   │   └── tasks.test.js # Task tests
│   └── index.js         # Entry point
├── package.json
└── README.md
```

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Request/Response Examples

#### Create Task

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description"
}
```

#### Update Task

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Jest for testing
- dotenv for environment variables
- cors for cross-origin requests

## Available Scripts

- `npm start` - Starts the server
- `npm run dev` - Starts the server in development mode with nodemon
- `npm test` - Runs the test suite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
