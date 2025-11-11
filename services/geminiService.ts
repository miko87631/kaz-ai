
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and will not be hit in the production environment
  // where the API key is expected to be set.
  console.warn("API_KEY is not set. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getMockResponse = (prompt: string) => {
    return new Promise<GenerateContentResponse>(resolve => setTimeout(() => resolve({
        text: `This is a mock response for your prompt: "${prompt}". Please configure your API key to get real answers.`,
        candidates: [],
        functionCalls: [],
    }), 500));
};

export const generateChatResponse = async (history: ChatMessage[], newMessage: string, isThinkingMode: boolean): Promise<GenerateContentResponse> => {
  if (!API_KEY) {
    return getMockResponse(newMessage);
  }

  const modelName = isThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
  const config = isThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {};
  
  const contents = [
      ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }],
      })),
      { role: 'user', parts: [{ text: newMessage }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents as any, // Type assertion to match SDK expectations
      config,
    });
    return response;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
};


export const generateStartupPlan = async (idea: string): Promise<GenerateContentResponse> => {
    if (!API_KEY) {
        return getMockResponse(`Generate a startup plan for: ${idea}`);
    }

    const systemInstruction = `You are an expert business planner and startup consultant. 
    Analyze the following startup idea and generate a concise, actionable business plan.
    The plan should be well-structured and easy to read.
    Format your response in Markdown. Include the following sections:
    1.  **Product Description**: What is the core product or service?
    2.  **Target Audience**: Who are the primary customers?
    3.  **Marketing & Sales Strategy**: How will you reach your customers?
    4.  **Financial Projections**: Briefly outline potential revenue streams and key costs.
    5.  **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: idea,
            config: {
                systemInstruction,
                thinkingConfig: { thinkingBudget: 16384 } // High budget for detailed plan
            }
        });
        return response;
    } catch (error) {
        console.error("Gemini API call for startup plan failed:", error);
        throw error;
    }
}
