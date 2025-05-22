"use client";

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  onComplete: () => void;
  duration?: number; // in milliseconds
}

export function ProgressBar({ onComplete, duration = 3000 }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50); // 50 steps to complete
    
    return () => clearInterval(interval);
  }, [duration, onComplete]);
  
  return (
    <div className="w-full my-4 bg-gray-200 rounded-full h-3">
      <div 
        className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="text-sm text-gray-500 mt-2">
        Analyzing data{progress < 100 ? '...' : ' - Complete'}
      </div>
    </div>
  );
} 