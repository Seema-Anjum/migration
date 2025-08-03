const express = require('express');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
// Removed unused 'get' import from 'http'
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, 'users.db'); 
let db = null;

const initializeDBAndServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver:sqlite3.Database,
        })
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        })
    } catch(error){
        console.error(`DB Error: ${error.message}`);
        process.exit(1);
    }
}

initializeDBAndServer();

// Home route 
app.get('/', (req, response) => {
    response.send("User Management System");
}) 

// Get all users 
app.get('/users/', async(req, response) => {
    const getUsersQuery = `SELECT * FROM users;`;
    const users = await db.all(getUsersQuery);
    response.send(users);
})

// Get user by ID 
app.get('/users/:Id/', async(request, response) => {
    const {Id} = request.params;
    const getUserQuery = `SELECT * FROM users WHERE id = ${Id};`;
    const user = await db.get(getUserQuery);
    if (user) {
        response.send(user);
    } else{
        response.status(404).send("User not found");
    }
})

// Create a new user 
app.post('/users', async (request, response) => {
    const {name, email, password} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserQuery = `INSERT INTO users (name, email, password) 
    VALUES ('${name}', '${email}', '${hashedPassword}');`;
    await db.run(createUserQuery);
    response.send("User Created Successfully");
});

// update user by ID
app.put('/users/:Id', async(request, response) => {
    const {Id} = request.params;
    const {name, email, password} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUserQuery = `UPDATE users SET name = '${name}',
    email = '${email}', password = '${hashedPassword}' WHERE id = ${Id};`;
    const result = await db.run(updateUserQuery);
    if (result.changes > 0) {
        response.send("User Updated Successfully")
    } else {
        response.status(404).send("Invalid Data");
    }
})

// Delete user by ID
app.delete('/users/:Id', async(request, response) => {
    const {Id} = request.params;
    const deleteUserQuery = `DELETE FROM users WHERE id = ${Id};`;
    const result = await db.run(deleteUserQuery);
    if (result.changes > 0) {
        response.send("User Deleted Successfully");
    } else {
        response.status(404).send("User not found");
    }
})

// Search User By Name 
app.get('/users/search', async (request, response) => {
    const {name} = request.query;
    const searchUserQuery = ` SELECT * FROM users WHERE name LIKE '${name}%';`;
    const users = await db.all(searchUserQuery);
    if(users.length > 0) {
        response.send(users);
    } else {
        response.status(404).send("User not found");
    }
})

// User Login
app.post('/users/login', async (request, response) => {
    const {email, password} = request.body;
    try {
        const getUserQuery = `SELECT * FROM users WHERE email = ?;`;
        const user = await db.get(getUserQuery, [email]);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const jwtSecret = process.env.JWT_SECRET || 'default_secret';
                const token = jwt.sign({id: user.id}, jwtSecret, {expiresIn: '1h'});
                response.send({token});
            } else {
                response.status(401).send("Invalid Password");
            }
        } else {
            response.status(404).send("User not found");
        }
    } catch (error) {
        response.status(500).send("Internal Server Error");
    }
});