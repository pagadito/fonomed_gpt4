const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Generate a Zoom JWT token
const generateZoomToken = () => {
    const payload = {
        iss: process.env.ZOOM_API_KEY,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token válido por 1 hora
    };
    return jwt.sign(payload, process.env.ZOOM_API_SECRET);
};

// Create a new Zoom meeting
router.post('/', async (req, res) => {
    try {
        const token = generateZoomToken();

        const response = await axios.post(
            'https://api.zoom.us/v2/users/me/meetings',
            {
                topic: req.body.topic || 'Fonomed Meeting',
                type: 1, // Instant meeting
                settings: {
                    host_video: true,
                    participant_video: true,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({
            meetingId: response.data.id,
            password: response.data.password,
            joinUrl: response.data.join_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create Zoom meeting' });
    }
});

module.exports = router;
