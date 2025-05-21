import { NextRequest, NextResponse } from 'next/server';
import { createChatSession, ai } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';

// Global chat sessions store
const chatSessions: Record<string, any> = {};

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId: existingSessionId } = await req.json();
    
    // Generate a new session ID if one doesn't exist
    const sessionId = existingSessionId || uuidv4();
    
    // Get or create a chat session
    if (!chatSessions[sessionId]) {
      chatSessions[sessionId] = await createChatSession();
    }
    
    // Send the message to the chat session
    // The Google GenAI API expects a message object, not a plain string
    const response = await chatSessions[sessionId].sendMessage({
      message: message
    });
    
    // Get the response text
    const responseText = response.text;
    
    // Create a response message
    const responseMessage = {
      id: uuidv4(),
      role: 'model',
      content: responseText,
      timestamp: Date.now(),
    };
    
    // Return the response with the session ID
    return NextResponse.json({
      message: responseMessage,
      sessionId,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 