const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const { title, date, time } = req.body;
        const appointment = await Appointment.create({ title, date, time });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, time } = req.body;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Update fields
        appointment.title = title || appointment.title;
        appointment.date = date || appointment.date;
        appointment.time = time || appointment.time;
        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        await appointment.destroy();
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
});


module.exports = router;
