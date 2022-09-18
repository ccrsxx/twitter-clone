import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import type { User } from '@lib/types/user';

type RequireAuth = {
  user: User | null;
  pending: boolean;
};

export function useRequireAuth(redirectUrl = '/'): RequireAuth {
  const [pending, setPending] = useState(true);

  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout((): void => setPending(false), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!pending && !loading && !user) void replace(redirectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, pending]);

  return { user, pending };
}
