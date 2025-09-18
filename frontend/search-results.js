document.addEventListener('DOMContentLoaded', () => {
    const resultsList = document.getElementById('results-list');
    
    // Get the search results from the browser's session memory
    const resultsData = JSON.parse(sessionStorage.getItem('searchResults'));

    if (!resultsData || resultsData.length === 0) {
        resultsList.innerHTML = '<p style="text-align:center;">No buses found for this route.</p>';
        return;
    }

    resultsData.forEach(bus => {
        const card = document.createElement('div');
        card.className = 'result-card';

        const statusClass = bus.isJourneyActive ? 'status-running' : 'status-stopped';
        const statusText = bus.isJourneyActive ? 'Running' : 'Not Started';

        card.innerHTML = `
            <div class="card-header">${bus.busNumber}</div>
            <div class="card-body">
                <div class="timing-info">
                    <div class="time-block">
                        <span>${bus.departureTime}</span><br>
                        <label>${bus.stops[0].name}</label>
                    </div>
                    <div class="timeline">→</div>
                    <div class="time-block">
                        <span>${bus.arrivalTime}</span><br>
                        <label>${bus.stops[bus.stops.length - 1].name}</label>
                    </div>
                </div>
                <div class="status-info">
                    <div class="status-item">
                        <span class="${statusClass}">${statusText}</span><br>
                        <label>Status</label>
                    </div>
                    <div class="status-item">
                        <span>${bus.seatsAvailable}</span><br>
                        <label>Seats Available</label>
                    </div>
                </div>
            </div>
        `;
        resultsList.appendChild(card);
    });
});