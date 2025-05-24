import React, { useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Header } from "./Header";
import { MetricsGrid } from "./MetricsGrid";
import { ChartsSection } from "./ChartsSection";
import { ActivityFeed } from "./ActivityFeed";
import { UserStats } from "./UserStats";
import { useFeatureFlags } from "../hooks/useFeatureFlags";

const Dashboard = () => {
  const { sdk } = useFeatureFlags();
  const isDarkModeFlag = sdk?.isFeatureEnabled("dark-mode");
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Sync dark mode state whenever the flag changes
  React.useEffect(() => {
    if (typeof isDarkModeFlag === "boolean") {
      setIsDarkMode(isDarkModeFlag);
    }
  }, [isDarkModeFlag]);

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />

        <main className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Dashboard Overview
            </h1>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
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
