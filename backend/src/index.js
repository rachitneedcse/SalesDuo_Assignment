// --- CORRECTED backend/src/index.js ---
require('dotenv').config(); // Ensure this is the absolute first line

const express = require('express');
const optimizeRouter = require('./routes/optimize');
const cors = require('cors');

const app = express();

// --- Middleware Setup ---
app.use(cors());
app.use(express.json()); // Use the built-in express.json() middleware

// --- Routes Setup ---
app.use('/api/optimize', optimizeRouter);
app.get('/', (req, res) => res.send('SalesDuo Backend is running!'));

// --- Server Start ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));