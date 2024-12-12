const express = require('express');
const router = express.Router();
const Users = require('../models/User');

const nodemailer = require('nodemailer');

// Send password reset email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Example: Generate a reset link (use a real token in production)
        const resetLink = `http://localhost:3000/reset-password/${user.id}`;

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetLink}`,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send reset email' });
    }
});


// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Users.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user profile' });
    }
});


module.exports = router;
