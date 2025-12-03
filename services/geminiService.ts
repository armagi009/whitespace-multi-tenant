import { GoogleGenAI } from "@google/genai";
import { Opportunity, Vertical, OpportunityTrend, SourceReliability, OpportunityType } from "../types";

// NOTE: In a real production app, API calls should go through a proxy backend 
// to keep the key secure. For this demo, we assume the environment variable is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateOpportunityBrief = async (opp: Opportunity): Promise<string> => {
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "## Analysis Unavailable\n\nUnable to connect to the AI analysis engine at this time. Please try again later.";
  }
};

export const analyzeUploadedFile = async (filename: string): Promise<Partial<Opportunity>> => {
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

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });
        
        const text = response.text || "{}";
        return JSON.parse(text);
    } catch (e) {
        console.error("Error simulating analysis", e);
        return {
            title: "New Opportunity Detected",
            evidenceSnippet: "Analysis pending for " + filename,
            vertical: Vertical.GENERAL,
            impactScore: 70,
            trend: OpportunityTrend.STABLE,
            tags: ["New", "Upload"],
            description: "Automatically detected from user upload.",
            timeHorizon: "6-18 months",
            opportunityType: OpportunityType.TECH_GAP,
            geography: "Global"
        };
    }
};

export const analyzeManualEntry = async (description: string, vertical: string, type: string): Promise<Partial<Opportunity>> => {
    const prompt = `
      You are an expert market intelligence analyst. 
      I will provide a raw observation/idea, and you must structure it into a formal Business Opportunity.

      **Input Idea:** "${description}"
      **Target Vertical:** ${vertical}
      **Opportunity Type:** ${type}

      1. Evaluate the strategic impact (1-100). If the idea is vague or low-value, score it < 80. If it's a solid, actionable gap, score it > 80.
      2. Hallucinate plausible tags, trend, and a "title" that sounds professional.
      
      Return ONLY a JSON object (no markdown):
      {
        "title": "Professional Title (max 12 words)",
        "evidenceSnippet": "A polished version of the user's input (max 25 words)",
        "impactScore": (number 50-99 based on quality),
        "trend": "Accelerating" | "Stable" | "Cooling",
        "tags": ["tag1", "tag2", "tag3"],
        "description": "A 2-3 sentence strategic elaboration of the idea.",
        "timeHorizon": "0-6 months" | "6-18 months" | "18+ months",
        "geography": "Global" | "US" | "EU",
        "sourceReliability": "Medium"
      }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });
        
        const text = response.text || "{}";
        return JSON.parse(text);
    } catch (e) {
        console.error("Error analyzing manual entry", e);
        return {
            title: "Draft Opportunity",
            evidenceSnippet: description.substring(0, 100),
            impactScore: 60,
            trend: OpportunityTrend.STABLE,
            tags: ["Draft", "Manual"],
            description: description,
            timeHorizon: "6-18 months",
            sourceReliability: SourceReliability.MEDIUM,
            geography: "Global"
        };
    }
};

export const createChatSession = (systemInstruction: string) => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        }
    });
};