/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, createContext, useContext } from 'react';
import { updateUserTheme } from '@lib/firebase/utils';
import { useAuth } from './auth-context';
import type { ReactNode, ChangeEvent } from 'react';
import type { Theme, Accent } from '@lib/types/theme';

type ThemeContext = {
  theme: Theme;
  accent: Accent;
  changeTheme: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  changeAccent: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
};

function setInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const savedTheme = localStorage.getItem('theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return savedTheme ?? (prefersDark ? 'dark' : 'light');
}

function setInitialAccent(): Accent {
  if (typeof window === 'undefined') return 'blue';

  const savedAccent = localStorage.getItem('accent') as Accent | null;

  return savedAccent ?? 'blue';
}

export function ThemeContextProvider({
  children
}: ThemeContextProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(setInitialTheme);
  const [accent, setAccent] = useState<Accent>(setInitialAccent);

  const { user } = useAuth();
  const { id: userId, theme: userTheme, accent: userAccent } = user ?? {};

  useEffect(() => {
    if (user && userTheme) setTheme(userTheme);
  }, [userId, userTheme]);

  useEffect(() => {
    if (user && userAccent) setAccent(userAccent);
  }, [userId, userAccent]);

  useEffect(() => {
    const flipTheme = (theme: Theme): NodeJS.Timeout | undefined => {
      const root = document.documentElement;
      const targetTheme = theme === 'dim' ? 'dark' : theme;

      if (targetTheme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');

      root.style.setProperty('--main-background', `var(--${theme}-background)`);

      root.style.setProperty(
        '--main-search-background',
        `var(--${theme}-search-background)`
      );

      root.style.setProperty(
        '--main-sidebar-background',
        `var(--${theme}-sidebar-background)`
      );

      if (user) {
        localStorage.setItem('theme', theme);
        return setTimeout(() => void updateUserTheme(user.id, { theme }), 500);
      }

      return undefined;
    };

    const timeoutId = flipTheme(theme);
    return () => clearTimeout(timeoutId);
  }, [userId, theme]);

  useEffect(() => {
    const flipAccent = (accent: Accent): NodeJS.Timeout | undefined => {
      const root = document.documentElement;

      root.style.setProperty('--main-accent', `var(--accent-${accent})`);

      if (user) {
        localStorage.setItem('accent', accent);
        return setTimeout(() => void updateUserTheme(user.id, { accent }), 500);
      }

      return undefined;
    };

    const timeoutId = flipAccent(accent);
    return () => clearTimeout(timeoutId);
  }, [userId, accent]);

  const changeTheme = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setTheme(value as Theme);

  const changeAccent = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setAccent(value as Accent);

  const value: ThemeContext = {
    theme,
    accent,
    changeTheme,
    changeAccent
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContext {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useTheme must be used within an ThemeContextProvider');

  return context;
}
