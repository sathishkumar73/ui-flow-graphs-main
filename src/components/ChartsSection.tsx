
import React from 'react';
import { RevenueChart } from './RevenueChart';
import { UserGrowthChart } from './UserGrowthChart';

interface ChartsSectionProps {
  isDarkMode: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-8">
      <RevenueChart isDarkMode={isDarkMode} />
      <UserGrowthChart isDarkMode={isDarkMode} />
    </div>
  );
};
