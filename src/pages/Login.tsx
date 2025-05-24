import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0f172a',
                    brandAccent: '#1e293b',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full bg-slate-900 hover:bg-slate-800 text-white',
                input: 'w-full border border-gray-300 rounded-md px-3 py-2',
              },
            }}
            providers={['google', 'azure']}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 