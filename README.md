
## Overview
 user management 

## Getting Started

### Prerequisites
- Python 3.8+ installed
- 3 hours of uninterrupted time

### Setup (Should take < 5 minutes)
```bash
# Clone/download this repository
# Navigate to the assignment directory
cd messy-migration

# Install dependencies
pip install -r requirements.txt

# Initialize the database
python init_db.py

# Start the application
python app.py

# The API will be available at http://localhost:5000
```

### Application provides
The application provides these endpoints:
- `GET /` - Health check
- `GET /users` - Get all users
- `GET /user/<id>` - Get specific user
- `POST /users` - Create new user
- `PUT /user/<id>` - Update user
- `DELETE /user/<id>` - Delete user
- `GET /search?name=<name>` - Search users by name
- `POST /login` - User login
