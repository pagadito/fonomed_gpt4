const express = require('express');
const axios = require('axios');
const router = express.Router();

const sendNotification = async (title, message, userId) => {
    try {
        const response = await axios.post(
            'https://onesignal.com/api/v1/notifications',
            {
                app_id: process.env.ONESIGNAL_APP_ID,
                contents: { en: message },
                headings: { en: title },
                filters: [{ field: 'tag', key: 'user_id', relation: '=', value: userId }],
            },
            {
                headers: { Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}` },
            }
        );
        console.log('Notification sent:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

router.post('/reminder', async (req, res) => {
    const { userId, title, message } = req.body;

    try {
        await sendNotification(title, message, userId);
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

module.exports = router;
