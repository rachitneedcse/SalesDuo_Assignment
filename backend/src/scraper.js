const axios = require('axios');
const cheerio = require('cheerio');
async function fetchProductFromASIN(asin){
    // Basic Amazon product page fetch - may fail on Amazon bot protections.
    const url = `https://www.amazon.in/dp/${asin}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
    };
    const resp = await axios.get(url, { headers, timeout: 15000 });
    const $ = cheerio.load(resp.data);
    const title = $('#productTitle').text().trim() || $('h1 span#title span').text().trim();
    const bullets = [];
    $('#feature-bullets ul li').each((i, el) => {
        const text = $(el).text().replace(/\n|\r/g,' ').trim();
        if (text) bullets.push(text);
    });
    // fallback selectors
    if (bullets.length === 0) {
        $('ul.a-unordered-list.a-vertical li').each((i, el) => {
            const text = $(el).text().trim();
            if (text) bullets.push(text);
        });
    }
    let description = $('#productDescription').text().trim();
    if (!description) description = $('#bookDescription_feature_div').text().trim() || $('#aplus').text().trim();
    return { asin, title, bullets, description };
}
module.exports = { fetchProductFromASIN };
