"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/lib/gemini";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

// Add type definition for the code component props
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-8`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4 max-w-3xl`}>
        <Avatar className={`${isUser ? 'bg-blue-600' : 'bg-emerald-600'} h-10 w-10 ${isUser ? 'ring-2 ring-blue-300' : ''} shadow-md`}>
          <AvatarFallback className="text-base font-medium text-white">
            {isUser ? 'U' : 'G'}
          </AvatarFallback>
          {!isUser && (
            <AvatarImage src="/gemini-logo.png" alt="Gemini" />
          )}
        </Avatar>
        <div 
          className={`${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border-gray-200 text-gray-800'
            } p-5 rounded-xl border shadow-md ${
              isUser ? 'rounded-tr-none' : 'rounded-tl-none'
            } text-base`
          }
        >
          <div className="prose prose-base max-w-none">
            <div className={`markdown-content ${isUser ? 'text-white' : ''}`}>
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 