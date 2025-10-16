

const fetch = require('node-fetch');

// 1. Read the OpenRouter API key from your .env file
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY ;
console.log(OPENROUTER_KEY);
if (!OPENROUTER_KEY) console.warn('OPENROUTER_API_KEY not set - set it in .env');

async function generateOptimizations(original){
    // No changes needed to the system prompt or user prompt
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
        // 2. The URL is changed to the OpenRouter endpoint
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                // 3. Authorization uses the OpenRouter key
                'Authorization': `Bearer ${OPENROUTER_KEY}`,
                'Content-Type': 'application/json',
                // Optional headers for OpenRouter analytics
                'HTTP-Referer': process.env.YOUR_SITE_URL || '',
                'X-Title': process.env.YOUR_SITE_NAME || ''
            },
            body: JSON.stringify({
                // 4. The model name uses the OpenRouter format.
                // Using a free model to start. You can change this to "openai/gpt-4o-mini" if you prefer.
                model: 'mistralai/mistral-7b-instruct:free',
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: prompt }
                ],
                // 5. (IMPROVEMENT) Request JSON format directly for more reliable parsing
                response_format: { type: "json_object" },
                max_tokens: 800,
                temperature: 0.7
            })
        });

        const data = await res.json();
        console.log("--- RAW RESPONSE FROM OPENROUTER SERVER ---");
        console.log(JSON.stringify(data, null, 2));

        // 6. (IMPROVEMENT) Add proper error handling for API responses
        if (data.error) {
            console.error("OpenRouter API Error:", data.error.message);
            throw new Error(`OpenRouter API Error: ${data.error.message}`);
        }
        
        const text = data?.choices?.[0]?.message?.content || '{}';
        
        // 7. (IMPROVEMENT) Directly parse the JSON, no need for regex matching
        const parsed = JSON.parse(text);

        // This fallback logic remains the same and is good practice
        return {
            title: parsed.title || (original.title || ''),
            bullets: parsed.bullets || (original.bullets || []),
            description: parsed.description || (original.description || ''),
            keywords: parsed.keywords || []
        };
    } catch(err){
        console.error("Failed to generate optimizations:", err);
        // If anything fails, return the original data to prevent the app from crashing
        return original;
    }
}

module.exports = { generateOptimizations };