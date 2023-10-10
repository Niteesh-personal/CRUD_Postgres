const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')

// Create a new user
router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
// Retrieve all users
router.get('/getAllUser', userController.getAllUsers);

// Retrieve a single user by ID
router.get('/getProfile', auth.verifyToken, userController.getUserById);

// Update a user by ID
router.put('/updateUser', auth.verifyToken, userController.updateUser);

// Delete a user by ID
router.delete('/deleteUser', auth.verifyToken, userController.deleteUser);

module.exports = router;