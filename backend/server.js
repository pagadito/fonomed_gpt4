const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


// Import routes
const userRoutes = require('./routes/users');
const meetingRoutes = require('./routes/meetings');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const medicalHistoryRoutes = require('./routes/medical-history');



// register routes

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentRoutes);
app.use('/meetings', meetingRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/medical-history', medicalHistoryRoutes);



// Home route
app.get('/', (req, res) => {
    res.send('Fonomed Backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
