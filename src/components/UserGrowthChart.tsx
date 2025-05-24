
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserGrowthChartProps {
  isDarkMode: boolean;
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ isDarkMode }) => {
  const data = [
    { date: '2024-01', newUsers: 1200, returningUsers: 800 },
    { date: '2024-02', newUsers: 1500, returningUsers: 1200 },
    { date: '2024-03', newUsers: 1800, returningUsers: 1400 },
    { date: '2024-04', newUsers: 2100, returningUsers: 1600 },
    { date: '2024-05', newUsers: 2400, returningUsers: 1900 },
    { date: '2024-06', newUsers: 2200, returningUsers: 2100 }
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
          User Growth Trends
        </h3>
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          New vs returning users over time
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="date" 
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
            <Area
              type="monotone"
              dataKey="newUsers"
              stackId="1"
              stroke="#8b5cf6"
              fill="url(#purpleGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="returningUsers"
              stackId="1"
              stroke="#06b6d4"
              fill="url(#cyanGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
