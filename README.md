# Simple Todo App

This is a todo app that has simple CRUD functionality and features authentication using the Passport library.

## Setup

Dependencies:
- Node
- PostgreSQL

Clone this repo into your local setup.

```bash
git clone https://github.com/rushitote/simple-todo-app/
cd simple-todo-app
```

Then edit the `DB_NAME`, `USERNAME` and `PASSWORD` fields as per your database config at `backend/sequelize/model.js`.

Then setup and start the frontend:

```bash
cd frontend
npm install
npm start
```

And in a new terminal tab:

```bash
cd backend
npm install
npm start
```

Then try out the app at `http://localhost:3000`.