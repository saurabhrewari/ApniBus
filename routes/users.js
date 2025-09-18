// backend/routes/users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Password ko encrypt karne ke liye

// User ka blueprint (Model) import karein
const User = require('../models/User');

// Route for User Registration
// @route   POST /api/users/register
router.post('/register', async (req, res) => {
    // 1. Front-end se bheji gayi details nikalein (name, email, password)
    const { name, email, password } = req.body;

    try {
        // 2. Check karein ki is email se user pehle se to nahi hai
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        // 3. Agar user naya hai, to ek naya user banayein
        user = new User({
            name,
            email,
            password
        });

        // 4. Password ko encrypt (hash) karein (Security ke liye)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 5. Naye user ko database mein save karein
        await user.save();

        // 6. Success ka jawab wapas bhejein
        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

// backend/routes/users.js

// ... (keep the existing code for express, router, bcrypt, User model, and the /register route) ...

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        // For now, we'll just send a success message.
        // Later, we will send a JSON Web Token (JWT) here.
        res.json({ 
            msg: 'Login Successful',
            user: {
                id: user.id,
                name: user.name
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// module.exports = router; // This line should already be at the end of your file