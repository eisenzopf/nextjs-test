"use client";

import React from 'react';

export function CancelChart() {
  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [28, 32, 36, 30, 25, 22];
  const maxValue = 40; // Fixed maximum for better visual scaling
  
  // Generate colors for bars
  const getBarColor = (index: number) => {
    const colors = [
      'bg-blue-600',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-indigo-600',
      'bg-purple-600',
      'bg-purple-500'
    ];
    return colors[index % colors.length];
  };
  
  return (
    <div className="w-full mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Cancel Trends - Last 6 Months</h3>
      
      <div className="flex flex-col space-y-2">
        {/* Chart container */}
        <div className="relative h-64 pb-6 pt-8 px-10 bg-gray-50 rounded-lg border border-gray-200">
          {/* Horizontal gridlines */}
          <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between py-6 pointer-events-none">
            <div className="border-t border-gray-200 w-full h-0"></div>
            <div className="border-t border-gray-200 w-full h-0"></div>
            <div className="border-t border-gray-200 w-full h-0"></div>
            <div className="border-t border-gray-200 w-full h-0"></div>
            <div className="border-t border-gray-200 w-full h-0"></div>
          </div>
          
          {/* Y axis labels */}
          <div className="absolute left-2 inset-y-0 flex flex-col justify-between py-6">
            <div className="text-sm text-gray-600">40%</div>
            <div className="text-sm text-gray-600">30%</div>
            <div className="text-sm text-gray-600">20%</div>
            <div className="text-sm text-gray-600">10%</div>
            <div className="text-sm text-gray-600">0%</div>
          </div>
          
          {/* Bars container */}
          <div className="flex justify-between items-end h-full pl-12">
            {months.map((month, idx) => (
              <div key={month} className="flex flex-col items-center" style={{ width: '14%' }}>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {values[idx]}%
                </div>
                <div 
                  className={`w-full ${getBarColor(idx)} rounded-t-sm`}
                  style={{ 
                    height: `${(values[idx] / maxValue) * 100}%`,
                  }}
                ></div>
                <div className="text-sm font-medium text-gray-600 mt-2">{month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-base text-gray-600">
        <p className="font-medium mb-2">Analysis:</p>
        <p>Cancel rates have decreased by 21% over the past 6 months, with the highest cancelation rate in March (36%). The current trend shows continued improvement with June having the lowest rate at 22%.</p>
      </div>
    </div>
  );
} 