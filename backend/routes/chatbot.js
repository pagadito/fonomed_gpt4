const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 150,
        });

        res.status(200).json({ answer: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

module.exports = router;
