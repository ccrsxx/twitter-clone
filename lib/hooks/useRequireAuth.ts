import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import type { User } from 'firebase/auth';

export function useRequireAuth(redirectUrl = '/'): User | null {
  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!loading && !user)
      setTimeout((): void => void replace(redirectUrl), 1000);
  }, [user, loading]);

  return user;
}
