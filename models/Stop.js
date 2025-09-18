// backend/models/Stop.js
const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Stop', StopSchema);