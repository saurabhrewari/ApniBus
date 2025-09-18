// backend/routes/journey.js
const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// @route   POST /api/journey/start
// @desc    Start a journey for a specific bus
router.post('/start', async (req, res) => {
    const { busNumber } = req.body;
    try {
        const bus = await Bus.findOneAndUpdate(
            { busNumber: busNumber },
            { isJourneyActive: true, currentStopIndex: 0 },
            { new: true }
        );

        if (!bus) {
            return res.status(404).json({ msg: 'Bus not found' });
        }
        res.json({ msg: 'Journey started successfully', bus });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/journey/status
// @desc    Get the status of the currently active journey
router.get('/status', async (req, res) => {
    try {
        const activeBus = await Bus.findOne({ isJourneyActive: true }).populate('stops');
        if (!activeBus) {
            return res.status(404).json({ msg: 'No active journey found' });
        }
        res.json(activeBus);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// backend/routes/journey.js

// ... (keep the existing code for /start and /status) ...

// @route   POST /api/journey/end
// @desc    End a journey for a specific bus
router.post('/end', async (req, res) => {
    try {
        const { busNumber } = req.body;
        const bus = await Bus.findOneAndUpdate(
            { busNumber: busNumber },
            { isJourneyActive: false },
            { new: true }
        );
        if (!bus) {
            return res.status(404).json({ msg: 'Bus not found' });
        }
        res.json({ msg: 'Journey ended successfully', bus });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH /api/journey/seats
// @desc    Update the number of available seats
router.patch('/seats', async (req, res) => {
    try {
        const { busNumber, seats } = req.body;
        const bus = await Bus.findOneAndUpdate(
            { busNumber: busNumber },
            { seatsAvailable: seats },
            { new: true }
        );
        if (!bus) {
            return res.status(404).json({ msg: 'Bus not found' });
        }
        res.json({ msg: 'Seat count updated', bus });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// module.exports = router; // This should already be at the end

module.exports = router;