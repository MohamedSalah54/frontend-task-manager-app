import api from '@/lib/api';
import { logoutUser } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/me',);

        if (res.status === 200) {
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
