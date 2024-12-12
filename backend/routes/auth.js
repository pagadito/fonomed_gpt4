const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');

const tempCodes = {};

router.post('/generate-2fa', async (req, res) => {
    try {
        const { email } = req.body;
        const code = speakeasy.totp({ secret: process.env.SECRET_2FA, encoding: 'base32' });
        tempCodes[email] = code;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your 2FA Code',
            text: `Your authentication code is: ${code}`,
        });

        res.status(200).json({ message: '2FA code sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send 2FA code' });
    }
});

router.post('/verify-2fa', (req, res) => {
    const { email, code } = req.body;
    if (tempCodes[email] === code) {
        delete tempCodes[email];
        res.status(200).json({ message: '2FA verified successfully' });
    } else {
        res.status(400).json({ error: 'Invalid or expired 2FA code' });
    }
});

module.exports = router;
