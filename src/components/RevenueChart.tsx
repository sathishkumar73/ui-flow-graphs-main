
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  isDarkMode: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ isDarkMode }) => {
  const data = [
    { month: 'Jan', revenue: 4000, target: 3800 },
    { month: 'Feb', revenue: 3000, target: 3200 },
    { month: 'Mar', revenue: 5000, target: 4200 },
    { month: 'Apr', revenue: 4500, target: 4800 },
    { month: 'May', revenue: 6000, target: 5200 },
    { month: 'Jun', revenue: 5500, target: 5800 },
    { month: 'Jul', revenue: 7000, target: 6200 }
  ];

  return (
    <div className={`rounded-xl p-6 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
        : 'bg-white/70 backdrop-blur-sm border border-gray-200'
    }`}>
      <div className="mb-6">
        <h3 className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Revenue Overview
        </h3>
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Monthly revenue vs target comparison
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                color: isDarkMode ? '#ffffff' : '#000000'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#e5e7eb" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#e5e7eb', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
