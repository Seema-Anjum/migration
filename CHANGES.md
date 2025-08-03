
### Overview

This project is a complete refactor and migration of a legacy Flask-based user management API into a Node.js (Express) backend with a React frontend. The goal was to preserve functionality while dramatically improving code structure, security, and maintainability. 


### Major Issues Identified in Code

- Raw SQL queries with string interpolation (SQL Injection risk)
- Monolithic Flask file, no modular separation
- No environment variable usage, hardcoded DB paths and secrets
- Poor HTTP status code usage, no error handling
- No feedback after actions, no real-time data sync on frontend actions


###  Changes Made

**Architecture**

- Replaced Flask backend with Express.js (Node.js)
- Used SQLite with sqlite & sqlite3 for lightweight persistence
- Added modular folder structure (app.js, api.js, components/) 


**Security**

- Replaced raw SQL with parameterized queries
- Added bcrypt to hash passwords before storing
- Added JWT-based login and token generation
- Created .env support


### API

Created RESTful endpoints for:
- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id
- GET /users/search?name=
- POST /users/login


### Frontend

- Built a clean React UI with:
- User list + delete button
- Add user form (withs ubmit)
- Search users by name
- Used Axios for HTTP requests
- Centered content using inline flex styles 


**Assumptions & Trade-offs**

- Used SQLite for simplicity; in production, would switch to PostgreSQL
- Error messages shown via alerts for now; can upgrade to toast/snackbar
- Kept styling minimal (not using Tailwind or CSS modules yet)


### What I’d Do with More Time

- Add full JWT middleware (protected routes)
- Add input validation 
- Implement role-based access control (admin vs user)
- Add pagination, sorting, and advanced filters

**AI Tools Used**

ChatGPT: used for scaffolding, refactoring strategy, React form logic, Axios setup, and error debugging.