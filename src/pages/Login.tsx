import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useEffect, useState } from 'react';

const Login = () => {
  const { sdk } = useFeatureFlags();
  const isDarkModeFlag = sdk?.isFeatureEnabled("dark-mode");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode state whenever the flag changes
  useEffect(() => {
    if (typeof isDarkModeFlag === "boolean") {
      setIsDarkMode(isDarkModeFlag);
    }
  }, [isDarkModeFlag]);

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
        <Card className={`w-full max-w-md transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800/50 backdrop-blur-sm border-gray-700"
            : "bg-white/70 backdrop-blur-sm border-gray-200"
        }`}>
          <CardHeader>
            <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
              Welcome back
            </CardTitle>
            <CardDescription className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: isDarkMode ? '#3b82f6' : '#0f172a',
                      brandAccent: isDarkMode ? '#60a5fa' : '#1e293b',
                      inputBackground: isDarkMode ? '#1f2937' : '#ffffff',
                      inputText: isDarkMode ? '#ffffff' : '#000000',
                      inputPlaceholder: isDarkMode ? '#9ca3af' : '#6b7280',
                      inputBorder: isDarkMode ? '#374151' : '#e5e7eb',
                      inputBorderHover: isDarkMode ? '#4b5563' : '#d1d5db',
                      inputBorderFocus: isDarkMode ? '#3b82f6' : '#2563eb',
                      dividerBackground: isDarkMode ? '#374151' : '#e5e7eb',
                      anchorTextColor: isDarkMode ? '#60a5fa' : '#2563eb',
                      anchorTextHoverColor: isDarkMode ? '#93c5fd' : '#1d4ed8',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: `w-full ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`,
                  input: `w-full border rounded-md px-3 py-2 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`,
                  label: isDarkMode ? 'text-gray-300' : 'text-gray-700',
                  loader: isDarkMode ? 'border-gray-700' : 'border-gray-300',
                },
              }}
              providers={['google', 'azure']}
              redirectTo={`${window.location.origin}/dashboard`}
            />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Login; 