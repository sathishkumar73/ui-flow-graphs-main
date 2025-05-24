import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen">
      <Dashboard />
      <div className="fixed bottom-4 right-4">
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 