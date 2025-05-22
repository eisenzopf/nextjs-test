"use client";

import { useEffect, useRef } from 'react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { useChat } from './chat-context';
import { TypingIndicator } from './typing-indicator';
import { CancelLoading } from '../visualizations/cancel-loading';

export function Chat() {
  const { messages, error, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Check for cancel trends query in last message
  const isCancelTrendsQuery = messages.length > 0 && 
    messages[messages.length - 1].role === 'user' && 
    messages[messages.length - 1].content.toLowerCase().includes('cancel trends') && 
    messages[messages.length - 1].content.toLowerCase().includes('6 months');

  // Scroll to bottom when messages change or when loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden shadow-lg">
      <div className="flex items-center px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
        <h1 className="text-2xl font-semibold text-white">Gemini Chat</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Welcome to Gemini Chat</h2>
            <p className="max-w-md mb-8 text-lg">
              Ask me anything, from answering questions and summarizing content to helping with creative tasks.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-blue-700 mb-1">Explain concepts</h3>
                <p className="text-sm text-blue-600">Get detailed explanations on any topic</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-emerald-700 mb-1">Creative writing</h3>
                <p className="text-sm text-emerald-600">Generate stories, poems, and more</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-amber-700 mb-1">Summarize text</h3>
                <p className="text-sm text-amber-600">Get concise summaries of lengthy content</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-purple-700 mb-1">Code assistance</h3>
                <p className="text-sm text-purple-600">Get help with programming tasks</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && !isCancelTrendsQuery && <TypingIndicator />}
            {isLoading && isCancelTrendsQuery && <CancelLoading />}
          </>
        )}
        
        {error && (
          <div className="p-4 my-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t">
        <ChatInput />
      </div>
    </div>
  );
} 