const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const API_KEY = '123';
const API_BASE_URL = 'https://www.thesportsdb.com';
const API_VERSION_PATH = '/api/v1/json';
const LEAGUE_ID = '4328';
const API_ENDPOINT_PATH = `/eventsnextleague.php?id=${LEAGUE_ID}`;

app.use(cors());
app.use(express.json());

app.get('/api/upcoming-matches', async (req, res) => {
    try {
        const apiUrl = `${API_BASE_URL}${API_VERSION_PATH}/${API_KEY}${API_ENDPOINT_PATH}`;
        console.log('Fetching from API URL:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('TheSportsDB API Error Response:', errorText);
            return res.status(response.status).json({ error: `Error fetching data from external API: ${response.status}`, details: errorText });
        }

        const data = await response.json();
        console.log('Data received from TheSportsDB API:', data);

        if (data.events && Array.isArray(data.events)) {
            res.json({ response: data.events });
        } else {
            console.warn('API response format unexpected from TheSportsDB:', data);
            res.json({ response: [] });
        }

    } catch (error) {
        console.error('Error in backend fetch from TheSportsDB:', error);
        res.status(500).json({ error: 'Failed to fetch upcoming matches from TheSportsDB', details: error.message, stack: error.stack });
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});