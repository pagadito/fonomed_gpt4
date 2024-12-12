const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Get statistics: Total users and active appointments
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.count();
        const activeAppointments = await Appointment.count({
            where: { status: 'active' },
        });

        res.status(200).json({
            totalUsers,
            activeAppointments,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Manage users: Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Manage appointments: Get all appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

module.exports = router;
