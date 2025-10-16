// backend/src/index.js
require('dotenv').config(); // First line!

const express = require('express');
const optimizeRouter = require('./routes/optimize');
const cors = require('cors');

const app = express();


const corsOptions = {
  origin: 'https://sales-duo-assignment.vercel.app' 
};


app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/optimize', optimizeRouter);
app.get('/', (req, res) => res.send('SalesDuo Backend is running!'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));