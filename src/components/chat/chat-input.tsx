"use client";

import React, { FormEvent, useState } from 'react';
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from './chat-context';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white">
      <div className="flex gap-3 items-end border rounded-lg focus-within:ring-2 focus-within:ring-blue-300 bg-white p-3 shadow-inner">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 resize-none border-0 focus:outline-none p-3 max-h-40 text-base text-black"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 h-12 w-12 rounded-full flex items-center justify-center shadow-md text-white"
          disabled={isLoading}
          aria-label="Send message"
        >
          <Send className="h-6 w-6" />
        </Button>
      </div>
      <div className="mt-2 text-sm text-center text-gray-500">
        Press Enter to send, Shift+Enter for a new line
      </div>
    </form>
  );
} 