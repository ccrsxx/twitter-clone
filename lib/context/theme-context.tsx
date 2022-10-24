import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@lib/types/user';

type ThemeContext = {
  user: User | null;
  loading: boolean;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeContextProviderProps = {
  value: ThemeContext;
  children: ReactNode;
};

export function UserContextProvider({
  value,
  children
}: ThemeContextProviderProps): JSX.Element {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useUser(): ThemeContext {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useUser must be used within an UserContextProvider');

  return context;
}
