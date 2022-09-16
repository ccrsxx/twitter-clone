import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import type { UserData } from '@lib/context/auth-context';

type RequireAuth = {
  userData: UserData | null;
  pending: boolean;
};

export function useRequireAuth(redirectUrl = '/'): RequireAuth {
  const [pending, setPending] = useState(true);

  const { userData, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout((): void => setPending(false), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!pending && !loading && !userData) void replace(redirectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, loading, pending]);

  return { userData, pending };
}
