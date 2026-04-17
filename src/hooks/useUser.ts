'use client';

import { useState, useEffect } from 'react';

export type UserStatus = 'guest' | 'member' | 'premium';

export function useUser() {
  const [status, setStatus] = useState<UserStatus>('guest');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem('alpha-user-status') as UserStatus;
    if (savedStatus) {
      setStatus(savedStatus);
    }
    setIsLoaded(true);
  }, []);

  const updateStatus = (newStatus: UserStatus) => {
    setStatus(newStatus);
    localStorage.setItem('alpha-user-status', newStatus);
  };

  const login = () => updateStatus('member');
  const logout = () => updateStatus('guest');
  const subscribe = () => updateStatus('premium');

  return {
    status,
    isLoaded,
    login,
    logout,
    subscribe,
    isGuest: status === 'guest',
    isMember: status === 'member',
    isPremium: status === 'premium',
  };
}
