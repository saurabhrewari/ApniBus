document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('main-search-form');
    const fromInput = document.getElementById('from-stand-input');
    const toInput = document.getElementById('to-stand-input');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fromValue = fromInput.value;
        const toValue = toInput.value;

        if (!fromValue || !toValue) {
            return alert('Please fill both From and To fields.');
        }

        try {
            const response = await fetch('http://localhost:5001/api/passenger/find-bus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: fromValue, to: toValue })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Could not find buses.');
            }
            
            const buses = await response.json();
            
            // Save results to the browser's session memory
            sessionStorage.setItem('searchResults', JSON.stringify(buses));
            
            // Redirect to the new results page
            window.location.href = 'search-results.html';

        } catch (error) {
            console.error('Error finding buses:', error);
            alert(error.message);
        }
    });
});