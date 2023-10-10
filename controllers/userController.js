const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'eazyERP';

// // Create a new user
async function createUser(req, res) {
    try {
        const { userName, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password: passwordHash,
        });
        res.status(201).json({ message: "User register successfully", result: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email,
        },
    })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
    }
    const token = jwt.sign({ user: { id: user.id, username: user.userName } }, JWT_SECRET_KEY, {
        expiresIn: '1h', // Token expiry time (adjust as needed)
    });
    res.json({ message: "User login successfully", result: token });
}

// Retrieve all users
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json({ message: "User list fetched successfully", result: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Retrieve a single user by ID
async function getUserById(req, res) {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: "Data fetched successfully", result: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Update a user by ID
async function updateUser(req, res) {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Delete a user by ID
async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
