import { useState, useEffect, createContext, useContext } from 'react';
// import { useAuth } from './auth-context';
import type { ReactNode, ChangeEvent } from 'react';

export type Theme = 'light' | 'dim' | 'dark';
export type Accent = 'blue' | 'yellow' | 'pink' | 'purple' | 'orange' | 'green';

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

const flipTheme = (theme: Theme): void => {
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
};

// TODO: Save theme and accent to localStorage and to the backend

const flipAccent = (accent: Accent): void => {
  const root = document.documentElement;
  root.style.setProperty('--main-accent', `var(--accent-${accent})`);
};

export function ThemeContextProvider({
  children
}: ThemeContextProviderProps): JSX.Element {
  // const { user } = useAuth();

  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccent] = useState<Accent>('blue');

  useEffect(() => {
    flipTheme(theme);
  }, [theme]);

  useEffect(() => {
    flipAccent(accent);
  }, [accent]);

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
