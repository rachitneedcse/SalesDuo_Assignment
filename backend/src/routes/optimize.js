const express = require('express');
const router = express.Router();
const { fetchProductFromASIN } = require('../scraper');
 const { generateOptimizations } = require('../gemini');
//const { generateOptimizations } = require('../gemini');

const db = require('../db');
router.post('/', async (req, res) => {
    const { asin } = req.body;
    if (!asin) return res.status(400).json({ error: 'ASIN required' });
    try {
        const original = await fetchProductFromASIN(asin);
        const optimized = await generateOptimizations(original);
        // save to db
        const [result] = await db.promise().execute(
            `INSERT INTO optimizations (asin, original_title, original_bullets, original_description, optimized_title, optimized_bullets, optimized_description, keywords, created_at)
             VALUES (?,?,?,?,?,?,?,?,NOW())`,
            [
                asin,
                original.title || null,
                JSON.stringify(original.bullets || []),
                original.description || null,
                optimized.title,
                JSON.stringify(optimized.bullets || []),
                optimized.description,
                JSON.stringify(optimized.keywords || [])
            ]
        );
        res.json({ original, optimized, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});
router.get('/history/:asin', async (req, res) => {
    const asin = req.params.asin;
    const [rows] = await db.promise().execute(
        'SELECT * FROM optimizations WHERE asin = ? ORDER BY created_at DESC',
        [asin]
    );
    res.json(rows);
});
module.exports = router;
