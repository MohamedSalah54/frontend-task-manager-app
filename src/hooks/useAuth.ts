import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../lib/auth';
import API from '@/lib/api';

const useAuth = () => {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API}/auth/me`, {
          method: 'GET',
          credentials: 'include', 
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          await logoutUser();
          setIsAuthenticated(false);
        }
      } catch (error) {
        await logoutUser();
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthChecked, isAuthenticated };
};

export default useAuth;
