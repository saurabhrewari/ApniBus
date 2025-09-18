// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Automatically sets the date when a user is created
    }
});

module.exports = mongoose.model('User', UserSchema);