
import React from 'react';
import { Users, UserCheck, UserPlus, Clock } from 'lucide-react';

interface UserStatsProps {
  isDarkMode: boolean;
}

export const UserStats: React.FC<UserStatsProps> = ({ isDarkMode }) => {
  const stats = [
    { label: 'Total Users', value: '12,847', icon: Users, color: 'blue' },
    { label: 'Active Today', value: '3,247', icon: UserCheck, color: 'green' },
    { label: 'New This Week', value: '847', icon: UserPlus, color: 'purple' },
    { label: 'Avg. Session', value: '4m 32s', icon: Clock, color: 'orange' }
  ];

  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500'
  };

  return (
    <div className={`rounded-xl p-6 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
        : 'bg-white/70 backdrop-blur-sm border border-gray-200'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        User Statistics
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${colorClasses[stat.color]}`} />
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </span>
              </div>
              <span className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
