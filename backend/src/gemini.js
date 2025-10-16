
 const fetch = require('node-fetch');

const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.KEY;
if (!OPENAI_KEY) console.warn('OPENAI_API_KEY not set - set it in .env');
async function generateOptimizations(original){
    const system = "You are an e-commerce listing optimization assistant. Improve title, bullets, description, and suggest 3-5 keywords in JSON format.";
    const prompt = `
Original Title: ${original.title || ''}
Original Bullets: ${JSON.stringify(original.bullets || [])}
Original Description: ${original.description || ''}

Instructions:
1) Produce an improved title (keyword-rich and readable).
2) Rewrite bullets as 5 concise points.
3) Produce an enhanced description (persuasive but compliant).
4) Suggest 3-5 short keywords (comma separated).

Return strictly a JSON object with keys: title, bullets (array), description, keywords (array).
`;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini', // changeable in .env and prompts
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: prompt }
            ],
            max_tokens: 700,
            temperature: 0.7
        })
    });
    const data = await res.json();
    console.log("--- RAW RESPONSE FROM OPENAI SERVER ---");
    console.log(JSON.stringify(data, null, 2))
    
    const text = data?.choices?.[0]?.message?.content || '';
    // Try to parse JSON out of the model output
    let parsed = {};
    try {
        // extract first JSON block
        const match = text.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
        
    } catch(e){
        console.warn('Failed to parse JSON from model output', e);
    }
    return {
        title: parsed.title || (original.title || ''),
        bullets: parsed.bullets || (original.bullets || []),
        description: parsed.description || (original.description || ''),
        keywords: parsed.keywords || []
    };
}
module.exports = { generateOptimizations };

