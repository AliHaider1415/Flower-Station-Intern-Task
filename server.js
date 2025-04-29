const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'reminders.json');

// Submit Event Reminders
app.post('/submit-reminders', (req, res) => {
  const reminders = req.body;

  if (!Array.isArray(reminders)) {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  // Load existing reminders
  let existing = [];
  if (fs.existsSync(DATA_FILE)) {
    let rawData = '';
    try {
      rawData = fs.readFileSync(DATA_FILE, 'utf8');
      existing = rawData ? JSON.parse(rawData) : [];
    } catch (err) {
      console.warn('No existing data or invalid JSON, initializing empty array.');
      existing = [];
    }
  }

  // Append new reminders
  const updated = existing.concat(reminders);

  fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to save reminders' });
    }
    return res.json({ message: 'Reminders saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
