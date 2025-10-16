// backend/src/index.js
require('dotenv').config(); // First line!

const express = require('express');
const optimizeRouter = require('./routes/optimize');
const cors = require('cors');

const app = express();

// --- CORRECT CORS CONFIGURATION ---
// Define the allowed origin. This should be your Vercel frontend URL.
const corsOptions = {
  origin: 'https://sales-duo-assignment.vercel.app' // IMPORTANT: Replace with your actual Vercel URL
};

// Use the cors middleware with the options
app.use(cors(corsOptions));

app.use(express.json());

// --- Routes Setup ---
app.use('/api/optimize', optimizeRouter);
app.get('/', (req, res) => res.send('SalesDuo Backend is running!'));

// --- Server Start ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));