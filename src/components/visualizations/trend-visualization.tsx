"use client";

import { useState, useEffect } from 'react';
import { ProgressBar } from './progress-bar';
import { CancelChart } from './cancel-chart';

interface TrendVisualizationProps {
  onComplete?: () => void;
}

export function TrendVisualization({ onComplete }: TrendVisualizationProps = {}) {
  const [showChart, setShowChart] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  
  // Set up auto-completion
  useEffect(() => {
    // Component should auto-complete if mounted and included in messages
    if (!showChart && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000); // Should match progress + animation timing
      
      return () => clearTimeout(timer);
    }
  }, [showChart, onComplete]);
  
  const handleProgressComplete = () => {
    // Show the chart after the progress is complete
    setTimeout(() => {
      setShowChart(true);
      setShowProgress(false);
    }, 500); // Small delay for better UX
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {showProgress && (
        <ProgressBar onComplete={handleProgressComplete} />
      )}
      
      {showChart && (
        <CancelChart />
      )}
    </div>
  );
} 