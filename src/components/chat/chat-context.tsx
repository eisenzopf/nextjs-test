"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/lib/gemini';

// Define a chat type
interface Chat {
  id: string;
  title: string;
  messages: Message[];
  sessionId: string | null;
}

interface ChatContextProps {
  messages: Message[];
  sessionId: string | null;
  chatHistory: Chat[];
  currentChatId: string | null;
  addMessage: (content: string, role: 'user' | 'model') => void;
  sendMessage: (content: string) => Promise<void>;
  handleSpecialQuery: (content: string) => boolean;
  isLoading: boolean;
  error: string | null;
  clearChat: () => void;
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // Store all chats
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  // Current active chat ID
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with a new chat on first load
  useEffect(() => {
    if (chatHistory.length === 0) {
      createNewChat();
    }
  }, []);

  // Helper to get the current chat
  const getCurrentChat = (): Chat | undefined => {
    return currentChatId ? chatHistory.find(chat => chat.id === currentChatId) : undefined;
  };
  
  // Current chat messages
  const messages = getCurrentChat()?.messages || [];
  
  // Current chat session ID
  const sessionId = getCurrentChat()?.sessionId || null;

  // Create a new chat
  const createNewChat = () => {
    const newChatId = uuidv4();
    setChatHistory(prev => [...prev, {
      id: newChatId,
      title: "New Chat",
      messages: [],
      sessionId: null
    }]);
    setCurrentChatId(newChatId);
    setError(null);
  };

  // Select an existing chat
  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setError(null);
  };

  // Update the current chat in the history
  const updateCurrentChat = (updater: (chat: Chat) => Chat) => {
    if (!currentChatId) return;
    
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === currentChatId ? updater(chat) : chat
      )
    );
  };

  const addMessage = (content: string, role: 'user' | 'model') => {
    if (!currentChatId) return;
    
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role,
      timestamp: Date.now(),
    };
    
    updateCurrentChat(chat => ({
      ...chat,
      // Update title for new chats based on first user message
      title: chat.title === "New Chat" && role === 'user' ? 
        content.substring(0, 30) + (content.length > 30 ? '...' : '') : 
        chat.title,
      messages: [...chat.messages, newMessage]
    }));
    
    return newMessage;
  };

  // Handle special visualization queries
  const handleSpecialQuery = (content: string): boolean => {
    console.log("handleSpecialQuery called with:", content);
    
    // Add user message
    addMessage(content, 'user');
    
    // Set loading state
    setIsLoading(true);
    
    console.log("Starting special query timer");
    
    // Show progress for 4 seconds then display results
    setTimeout(() => {
      console.log("Adding model response for cancel trends");
      addMessage("Here's the cancel trends data for the past 6 months:", 'model');
      setIsLoading(false);
      console.log("Loading state set to false");
    }, 4000);
    
    return true;
  };

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      addMessage(content, 'user');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      
      // Update session ID if this is a new chat
      if (!sessionId) {
        updateCurrentChat(chat => ({
          ...chat,
          sessionId: data.sessionId
        }));
      }
      
      // Add the model's response to the messages
      if (data.message) {
        updateCurrentChat(chat => ({
          ...chat,
          messages: [...chat.messages, data.message]
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (!currentChatId) return;
    
    updateCurrentChat(chat => ({
      ...chat,
      messages: [],
      sessionId: null
    }));
    setError(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sessionId,
        chatHistory,
        currentChatId,
        addMessage,
        sendMessage,
        handleSpecialQuery,
        isLoading,
        error,
        clearChat,
        createNewChat,
        selectChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 