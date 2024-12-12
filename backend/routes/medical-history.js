const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');

// Add a new medical record
router.post('/', async (req, res) => {
    try {
        const { patientId, doctorId, diagnosis, treatment } = req.body;
        const record = await MedicalHistory.create({ patientId, doctorId, diagnosis, treatment });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Error creating medical record' });
    }
});

// Get medical records for a patient
router.get('/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const records = await MedicalHistory.findAll({ where: { patientId } });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching medical records' });
    }
});

module.exports = router;
