const { Router } = require('express');
const UserRoute = Router();
const bcrypt = require('bcrypt');
const {getAllUser, registerUser, getUserById,loginUser, updateUserById, deleteUserById} = require('../controllers/user')



// Get all users
UserRoute.get('/users', getAllUser);
// Get a user by ID
UserRoute.get('/users/:id', getUserById);
// Register a new user
UserRoute.post('/registeruser', registerUser);
// login user
UserRoute.post('/login', loginUser);
// Update a user
UserRoute.put('/users/:id', updateUserById);
// Delete a user
UserRoute.delete('/users/:id', deleteUserById);

module.exports = UserRoute;