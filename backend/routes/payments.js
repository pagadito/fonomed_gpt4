const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { amount, description } = req.body;

        const response = await axios.post('https://sandbox.pagadito.com/api/init', {
            amount, description,
            client_id: process.env.PAGADITO_CLIENT_ID,
            client_secret: process.env.PAGADITO_CLIENT_SECRET,
        });

        res.status(200).json({ paymentUrl: response.data.payment_url });
    } catch (error) {
        res.status(500).json({ error: 'Payment creation failed' });
    }
});

module.exports = router;
