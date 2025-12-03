export async function onRequest({ request, env }) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const API_KEY = env.GEMINI_API_KEY;
  if (!API_KEY) {
    return new Response('API key not configured', { status: 500 });
  }

  try {
    const { action, data } = await request.json();

    if (action === 'generateBrief') {
      const opp = data;
      const prompt = `
        You are a senior Strategy Consultant at a top-tier firm.
        Analyze the following business opportunity data and write a concise, high-impact Executive Briefing (Markdown format).

        **Opportunity:** ${opp.title}
        **Context:** ${opp.description || opp.evidenceSnippet}
        **Vertical:** ${opp.vertical}
        **Tags:** ${opp.tags.join(', ')}
        **Trend:** ${opp.trend}

        Structure the response exactly as follows:
        1. **Why It Matters**: Strategic implication (2-3 sentences).
        2. **Evidence Highlights**: Key data points or quotes supporting the opportunity.
        3. **Money Trail**: Investment flows, grants, budget allocations, or revenue potential.
        4. **Key Players**: Likely competitors, incumbents, or key agencies involved.
        5. **Risk Flags**: Regulatory hurdles, market adoption risks, or technical challenges.
        6. **Actionable Next Steps**: 3 concrete moves a company should take in the next 30 days.

        Keep it professional, direct, and under 400 words.
      `;

      const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!apiResponse.ok) {
        throw new Error(`Gemini API error: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis could be generated.';

      return new Response(JSON.stringify({ text }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (action === 'analyzeFile') {
      const filename = data.filename;
      const prompt = `
        I have just uploaded a document named "${filename}" to my market intelligence platform.

        Based solely on this filename, hallucinate a highly realistic, high-value business opportunity that might be found in such a document.
        It should sound like a serious strategic insight.

        Return ONLY a JSON object with the following fields (no markdown, no backticks):
        {
          "title": "Short punchy outcome-oriented title (max 10 words)",
          "evidenceSnippet": "A specific fact/quote that might be in this document (max 20 words)",
          "impactScore": (number between 65 and 99),
          "vertical": "FinTech" | "MedTech" | "GovTech" | "General",
          "trend": "Accelerating" | "Stable" | "Cooling",
          "tags": ["tag1", "tag2", "tag3"],
          "description": "A 2-sentence description of the strategic gap identified.",
          "timeHorizon": "0-6 months" | "6-18 months" | "18+ months",
          "opportunityType": "Reg-Driven" | "Tech Gap" | "Customer Pain" | "Competitive Void",
          "geography": "US" | "EU" | "Global" | "APAC"
        }
      `;

      const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      });

      if (!apiResponse.ok) {
        throw new Error(`Gemini API error: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const parsed = JSON.parse(text);

      return new Response(JSON.stringify(parsed), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response('Unknown action', { status: 400 });
  } catch (error) {
    console.error('Worker error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}