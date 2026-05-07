'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export type UserStatus = 'guest' | 'member' | 'premium';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // 초기 세션 확인
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsLoaded(true);
    });

    // 로그인/로그아웃 이벤트 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  // 기존 코드와의 호환을 위한 status 필드
  const status: UserStatus = user ? 'member' : 'guest';

  const subscribe = () => {
    // 추후 결제 플로우 연동
    alert('프리미엄 멤버십 준비 중입니다.');
  };

  return {
    user,
    status,
    isLoaded,
    isGuest: !user,
    isMember: !!user,
    isPremium: false,   // 추후 DB 필드로 확장
    login,
    logout,
    subscribe,
  };
}
