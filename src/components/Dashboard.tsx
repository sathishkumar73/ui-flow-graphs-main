
import React, { useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Header } from './Header';
import { MetricsGrid } from './MetricsGrid';
import { ChartsSection } from './ChartsSection';
import { ActivityFeed } from './ActivityFeed';
import { UserStats } from './UserStats';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initial theme check from API
  React.useEffect(() => {
    const fetchThemePreference = async () => {
      try {
        const response = await fetch('/api/theme-preference');
        const { isDarkMode: darkModePreference } = await response.json();
        setIsDarkMode(darkModePreference);
      } catch (error) {
        console.error('Failed to fetch theme preference:', error);
      }
    };
    fetchThemePreference();
  }, []);

  /* 
  // Real-time theme updates via WebSocket/SSE
  // Uncomment and implement based on your backend:

  React.useEffect(() => {
    const themeUpdateStream = new EventSource('/api/theme-updates');
    
    themeUpdateStream.onmessage = (event) => {
      const { isDarkMode: newThemePreference } = JSON.parse(event.data);
      setIsDarkMode(newThemePreference);
    };

    themeUpdateStream.onerror = (error) => {
      console.error('Theme update stream error:', error);
      themeUpdateStream.close();
    };

    return () => {
      themeUpdateStream.close();
    };
  }, []);
  */

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
        
        <main className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Dashboard Overview
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

          <MetricsGrid isDarkMode={isDarkMode} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
            <div className="xl:col-span-2">
              <ChartsSection isDarkMode={isDarkMode} />
            </div>
            <div className="space-y-8">
              <UserStats isDarkMode={isDarkMode} />
              <ActivityFeed isDarkMode={isDarkMode} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
