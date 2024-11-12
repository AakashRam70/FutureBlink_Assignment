import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import agenda from './config/agenda.js';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Use routes
app.use('/api/emails', emailRoutes);

// Start Agenda and server
agenda.on('ready', () => {
    agenda.start();
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
