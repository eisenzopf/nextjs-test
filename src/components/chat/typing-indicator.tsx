"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-8">
      <div className="flex flex-row items-start gap-4 max-w-3xl">
        <Avatar className="bg-emerald-600 h-10 w-10 shadow-md">
          <AvatarFallback className="text-base font-medium text-white">
            G
          </AvatarFallback>
          <AvatarImage src="/gemini-logo.png" alt="Gemini" />
        </Avatar>
        <div className="bg-white border-gray-200 text-gray-800 p-5 rounded-xl rounded-tl-none border shadow-md">
          <div className="flex items-end space-x-2 h-5 px-1">
            <span 
              className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-typing-dot" 
              style={{ animationDelay: '0ms' }}
            ></span>
            <span 
              className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-typing-dot" 
              style={{ animationDelay: '200ms' }}
            ></span>
            <span 
              className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-typing-dot" 
              style={{ animationDelay: '400ms' }}
            ></span>
            <span className="sr-only">Gemini is thinking</span>
          </div>
        </div>
      </div>
    </div>
  );
} 