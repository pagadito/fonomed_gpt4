const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');

// Endpoint para predicción de diabetes
router.post('/predict', (req, res) => {
    const { features } = req.body;

    PythonShell.run(
        '../ai/predict_diabetes.py',
        { args: JSON.stringify(features) },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Prediction failed' });
            }

            res.status(200).json({ prediction: result[0] });
        }
    );
});

module.exports = router;
