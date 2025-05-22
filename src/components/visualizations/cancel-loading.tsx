"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProgressBar } from './progress-bar';

export function CancelLoading() {
  return (
    <div className="flex justify-start mb-8">
      <div className="flex flex-row items-start gap-4 max-w-3xl w-full">
        <Avatar className="bg-emerald-600 h-10 w-10 shadow-md">
          <AvatarFallback className="text-base font-medium text-white">
            G
          </AvatarFallback>
          <AvatarImage src="/gemini-logo.png" alt="Gemini" />
        </Avatar>
        <div className="bg-white border-gray-200 text-gray-800 p-5 rounded-xl rounded-tl-none border shadow-md w-full">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600 mb-2">Analyzing cancel trends data...</div>
            <ProgressBar onComplete={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
} 