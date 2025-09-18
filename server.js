// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5001;

// Middlewares
app.use(cors({
    origin: 'http://127.0.0.1:3000'
}));
app.use(express.json());

// Database se Connect Karein
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

// API Routes ko Istemal Karein
app.use('/api/users', require('./routes/users'));
app.use('/api/data', require('./routes/data'));     // <--- YEH LINE ADD KI GAYI HAI
app.use('/api/journey', require('./routes/journey')); // <--- YEH LINE ADD KI GAYI HAI
app.use('/api/passenger', require('./routes/passenger'))

// Basic test route
app.get('/', (req, res) => {
    res.send('Back-End Server is running and connected to DB!');
});

// Server ko start karein
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});