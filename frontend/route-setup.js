document.addEventListener('DOMContentLoaded', () => {
    // --- Location Toggle Logic (Same as before) ---
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // --- Start Journey Button Logic (UPDATED TO CONNECT TO BACKEND) ---
    const startJourneyBtn = document.querySelector('.start-journey-btn');
    const busNumberInput = document.querySelector('#bus-number');
    const busRouteInput = document.querySelector('#bus-route');

    startJourneyBtn.addEventListener('click', async () => {
        const busNumber = busNumberInput.value.trim();
        const stops = busRouteInput.value.split(',').map(stop => stop.trim());
        
        if (!busNumber || stops.length === 0 || stops[0] === '') {
            alert('Please fill in the Bus Number and at least one Bus Stop.');
            return;
        }

        try {
            // Step 1: Create the bus and its route via API
            console.log('Sending request to create bus...');
            let response = await fetch('http://localhost:5001/api/data/buses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ busNumber, stops })
            });

            let data = await response.json();
            
            // If the bus already exists (status 400), we can still proceed.
            if (!response.ok && !data.msg.includes('already exists')) {
               throw new Error(data.msg || 'Failed to create bus route.');
            }
            console.log('Bus creation/verification successful.');

            // Step 2: Start the journey for that bus via API
            console.log('Sending request to start journey...');
            response = await fetch('http://localhost:5001/api/journey/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ busNumber })
            });
            
            data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || 'Failed to start journey.');
            }

            alert('Journey started successfully!');
            // Redirect to the live status page
            window.location.href = 'live-status.html';

        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    });
});