'use client';
import { getSession } from '../utils/auth/getSession';
import { useEffect, useState } from 'react';
import { User } from '@/@types/auth/loginResponse.type';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setIsAuthenticated(!!session.token);
      setIsManager(true);
      setUser(session.user);
    }
  }, []);

  return {
    isAuthenticated,
    isManager,
    user,
  };
}
