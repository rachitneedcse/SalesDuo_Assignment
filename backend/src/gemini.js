

const fetch = require('node-fetch');


const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY ;


console.log(OPENROUTER_KEY);
if (!OPENROUTER_KEY) console.warn('OPENROUTER_API_KEY not set - set it in .env');

async function generateOptimizations(original){
    
    const system = "You are an e-commerce listing optimization assistant. Your response must be a valid JSON object.";
    const prompt = `
Original Title: ${original.title || ''}
Original Bullets: ${JSON.stringify(original.bullets || [])}
Original Description: ${original.description || ''}

Instructions:
1) Produce an improved title (keyword-rich and readable).
2) Rewrite bullets as 5 concise points.
3) Produce an enhanced description (persuasive but compliant).
4) Suggest 3-5 short keywords (as a comma-separated string or an array).

Return strictly a JSON object with keys: title, bullets (array), description, keywords (array).
`;

    try {
        
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                
                'Authorization': `Bearer ${OPENROUTER_KEY}`,
                'Content-Type': 'application/json',
                
                'HTTP-Referer': process.env.YOUR_SITE_URL || '',
                'X-Title': process.env.YOUR_SITE_NAME || ''
            },
            body: JSON.stringify({
                
                
                model: 'mistralai/mistral-7b-instruct:free',
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: prompt }
                ],
                
                response_format: { type: "json_object" },
                max_tokens: 800,
                temperature: 0.7
            })
        });

        const data = await res.json();
        console.log("--- RAW RESPONSE FROM OPENROUTER SERVER ---");
        console.log(JSON.stringify(data, null, 2));

        
        if (data.error) {
            console.error("OpenRouter API Error:", data.error.message);
            throw new Error(`OpenRouter API Error: ${data.error.message}`);
        }
        
        const text = data?.choices?.[0]?.message?.content || '{}';
        
        
        const parsed = JSON.parse(text);

        
        return {
            title: parsed.title || (original.title || ''),
            bullets: parsed.bullets || (original.bullets || []),
            description: parsed.description || (original.description || ''),
            keywords: parsed.keywords || []
        };
    } catch(err){
        console.error("Failed to generate optimizations:", err);
        
        return original;
    }
}

module.exports = { generateOptimizations };