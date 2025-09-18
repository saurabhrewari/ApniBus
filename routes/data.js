const express = require('express');
const router = express.Router();
const Stop = require('../models/Stop');
const Bus = require('../models/Bus');

// POST /api/data/stops (Same as before)
router.post('/stops', async (req, res) => {
    // ... (This code is correct, no changes needed here)
    try {
        const { name } = req.body;
        let stop = await Stop.findOne({ name });
        if (stop) {
            return res.status(400).json({ msg: 'Stop already exists' });
        }
        stop = new Stop({ name });
        await stop.save();
        res.status(201).json({ msg: 'Stop added successfully', stop });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/data/stops (Same as before)
router.get('/stops', async (req, res) => {
    // ... (This code is correct, no changes needed here)
    try {
        const stops = await Stop.find();
        res.json(stops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/data/buses (CORRECTED VERSION)
router.post('/buses', async (req, res) => {
    try {
        const { busNumber, stops: stopNames, departureTime, arrivalTime, seatsAvailable } = req.body;

        let bus = await Bus.findOne({ busNumber });
        if (bus) {
            return res.status(400).json({ msg: 'Bus with this number already exists' });
        }

        // This new logic finds stop IDs while keeping the original order
        const stopIds = [];
        for (const name of stopNames) {
            const stop = await Stop.findOne({ name });
            if (!stop) {
                return res.status(404).json({ msg: `Stop not found: ${name}` });
            }
            stopIds.push(stop._id);
        }

        bus = new Bus({
            busNumber,
            stops: stopIds, // Use the correctly ordered array of IDs
            departureTime,
            arrivalTime,
            seatsAvailable
        });

        await bus.save();
        res.status(201).json({ msg: 'Bus added successfully in correct order', bus });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/data/buses (Same as before)
router.get('/buses', async (req, res) => {
    try {
        const buses = await Bus.find().populate('stops');
        res.json(buses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// DELETE /api/data/buses (NEW FUNCTION to clear data for testing)
router.delete('/buses', async (req, res) => {
    try {
        await Bus.deleteMany({}); // Deletes all documents in the Bus collection
        res.json({ msg: 'All buses deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;