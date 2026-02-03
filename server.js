const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const TFL_APP_ID = process.env.TFL_APP_ID;
const TFL_APP_KEY = process.env.TFL_APP_KEY;

if (!TFL_APP_ID || !TFL_APP_KEY) {
  console.warn('Missing TFL_APP_ID or TFL_APP_KEY. Set them in the environment.');
}

app.use(express.static('.'));

app.get('/api/journeys', async (req, res) => {
  const { fromLat, fromLon, toLat, toLon } = req.query;

  if (!fromLat || !fromLon || !toLat || !toLon) {
    res.status(400).json({ error: 'Missing required coordinates.' });
    return;
  }

  const from = `${fromLat},${fromLon}`;
  const to = `${toLat},${toLon}`;
  const modes = [
    'bus',
    'tube',
    'national-rail',
    'overground',
    'elizabeth-line',
    'dlr',
    'tram',
    'walking'
  ].join(',');

  const params = new URLSearchParams({
    mode: modes,
    journeyPreference: 'LeastTime',
    app_id: TFL_APP_ID || '',
    app_key: TFL_APP_KEY || ''
  });

  const url = `https://api.tfl.gov.uk/Journey/JourneyResults/${encodeURIComponent(from)}/to/${encodeURIComponent(to)}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).json({ error: `TfL API error: ${response.status}` });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
