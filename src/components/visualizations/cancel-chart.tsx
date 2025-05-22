"use client";

import React from 'react';

export function CancelChart() {
  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [28, 32, 36, 30, 25, 22];
  
  return (
    <div className="w-full mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Cancel Trends - Last 6 Months</h3>
      
      {/* Very simple HTML table-based chart */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {/* Data row */}
            <tr>
              <td width="10%" className="align-bottom p-1"></td>
              {months.map((month, idx) => (
                <td key={month} width="15%" className="text-center align-bottom p-1">
                  <div className="mb-2 font-medium text-gray-700">{values[idx]}%</div>
                  <div 
                    style={{
                      height: `${values[idx] * 4}px`, 
                      backgroundColor: idx % 2 === 0 ? '#3b82f6' : '#4f46e5',
                      width: '50px',
                      margin: '0 auto',
                      borderTopLeftRadius: '4px',
                      borderTopRightRadius: '4px'
                    }}
                  ></div>
                  <div className="mt-2 text-sm font-medium text-gray-600">{month}</div>
                </td>
              ))}
            </tr>
            
            {/* Y-axis labels */}
            <tr>
              <td className="pt-2 text-right pr-2 text-sm text-gray-600">40%</td>
              <td colSpan={6} className="border-t border-gray-200"></td>
            </tr>
            <tr>
              <td className="pt-2 text-right pr-2 text-sm text-gray-600">30%</td>
              <td colSpan={6} className="border-t border-gray-200"></td>
            </tr>
            <tr>
              <td className="pt-2 text-right pr-2 text-sm text-gray-600">20%</td>
              <td colSpan={6} className="border-t border-gray-200"></td>
            </tr>
            <tr>
              <td className="pt-2 text-right pr-2 text-sm text-gray-600">10%</td>
              <td colSpan={6} className="border-t border-gray-200"></td>
            </tr>
            <tr>
              <td className="pt-2 text-right pr-2 text-sm text-gray-600">0%</td>
              <td colSpan={6} className="border-t border-gray-200"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-base text-gray-600">
        <p className="font-medium mb-2">Analysis:</p>
        <p>Cancel rates have decreased by 21% over the past 6 months, with the highest cancelation rate in March (36%). The current trend shows continued improvement with June having the lowest rate at 22%.</p>
      </div>
    </div>
  );
} 