// Main layout component with navigation
import { useRouter } from 'next/router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signOutUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
  role?: 'admin' | 'doctor' | 'patient';
}

export default function Layout({ children, role }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user && router.pathname !== '/login') {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error('Error signing out: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user && router.pathname !== '/login') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && router.pathname !== '/login' && (
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Hospital Management System
                </h1>
                {role && (
                  <span className="ml-4 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {role.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main>{children}</main>
    </div>
  );
}

