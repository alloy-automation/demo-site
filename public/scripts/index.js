// index.js
import { ALLOY_BASE_URL } from './config.js';

document.getElementById('goButton').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!apiKey) {
        errorMessage.textContent = "Please enter an API key.";
        return;
    }

    try {
        let response = await fetch(`/set-api-key`, {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ apiKey: apiKey })
        });

        if (!response.ok) {
            throw new Error('Failed to initialize API key');
        }

        const { userId } = await response.json();

        window.location.href = `/success?userId=${userId}`;
    } catch (error) {
        console.error(error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
