
const express = require('express');
const bodyParser = require('express').json;
const optimizeRouter = require('./routes/optimize');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser());
app.use('/api/optimize', optimizeRouter);
app.get('/', (req, res) => res.send('SalesDuo Backend'));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
