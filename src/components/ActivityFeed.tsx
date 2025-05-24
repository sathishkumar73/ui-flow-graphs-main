
import React from 'react';
import { Clock, User, DollarSign, Settings, Bell } from 'lucide-react';

interface ActivityFeedProps {
  isDarkMode: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ isDarkMode }) => {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'made a purchase',
      amount: '$249.99',
      time: '2 minutes ago',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      action: 'updated profile',
      time: '15 minutes ago',
      icon: User,
      color: 'blue'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'changed settings',
      time: '1 hour ago',
      icon: Settings,
      color: 'purple'
    },
    {
      id: 4,
      user: 'Emma Davis',
      action: 'subscribed to alerts',
      time: '2 hours ago',
      icon: Bell,
      color: 'orange'
    }
  ];

  const colorClasses = {
    green: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    orange: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30'
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
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                colorClasses[activity.color]
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="font-medium">{activity.user}</span> {activity.action}
                  {activity.amount && (
                    <span className="font-semibold text-green-600"> {activity.amount}</span>
                  )}
                </p>
                <div className="flex items-center mt-1">
                  <Clock className={`w-3 h-3 mr-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className={`w-full mt-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isDarkMode 
          ? 'text-gray-300 hover:bg-gray-700' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}>
        View All Activity
      </button>
    </div>
  );
};
