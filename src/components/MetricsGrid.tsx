
import React from 'react';
import { MetricCard } from './MetricCard';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

interface MetricsGridProps {
  isDarkMode: boolean;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ isDarkMode }) => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '12,847',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Growth Rate',
      value: '23.4%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Engagement',
      value: '89.2%',
      change: '-1.3%',
      trend: 'down' as const,
      icon: Activity,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          {...metric}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};
