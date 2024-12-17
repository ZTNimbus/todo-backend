# Todo-Backend

The Todo-Backend is a REST API built using Node.js and Express to handle the backend operations for a Todo application. It supports CRUD operations, authentication, and data persistence using SQLite (development) and PostgreSQL (production).

## Features
- ✅ RESTful API for Todo App
- ✅ JWT-based user authentication
- ✅ Password hashing with bcrypt.js
- ✅ SQLite for development, PostgreSQL for production
- ✅ Middleware for route protection

## Tech Stack
- Node.js
- Express.js
- SQLite / PostgreSQL
- JWT Authentication
- bcrypt.js

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/ZTNimbus/todo-backend.git
    cd todo-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add your database URL and JWT secret key:

    ```bash
    DB_URL=sqlite://db.sqlite  
    JWT_SECRET=your_secret_key  
    ```

4. Run the server:

    ```bash
    npm start
    ```

    API available at: `http://localhost:3000`

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Todos
- `GET /api/todos` - Fetch all tasks (protected)
- `POST /api/todos` - Create a new task (protected)
- `PUT /api/todos/:id` - Update a task (protected)
- `DELETE /api/todos/:id` - Delete a task (protected)

## Contributing
Contributions are welcome. Fork the repo, open an issue, and submit a PR.

🔗 [Repo: Todo Backend on GitHub](https://github.com/ZTNimbus/todo-backend)
