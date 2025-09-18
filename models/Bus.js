// backend/models/Bus.js
const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop'
    }],
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    // YEH NAYI LINE ADD HUI HAI
    seatsAvailable: { 
        type: Number, 
        default: 30 
    },
    currentStopIndex: {
        type: Number,
        default: 0
    },
    isJourneyActive: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Bus', BusSchema);