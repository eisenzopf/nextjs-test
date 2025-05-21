import { GoogleGenAI } from "@google/genai";

// Ensure GOOGLE_API_KEY is set
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("Error: GOOGLE_API_KEY environment variable is not set. Please set it before running this code.");
  // You might want to throw an error here to stop execution if the API key is crucial.
  // throw new Error("GOOGLE_API_KEY environment variable is not set.");
}

// Initialize the Google AI API with the API key
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// Create a chat session
export async function createChatSession() {
  // Create a chat instance
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
  });
  
  return chat;
}

// Generate content directly (non-chat mode)
export async function generateContent(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Message types
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

// Export the AI instance for direct access
export { ai };