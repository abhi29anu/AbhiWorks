import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  resolvedTheme: string;
  themes: string[];
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  resolvedTheme: 'light',
  themes: ['light', 'dark'],
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'light',
  enableSystem = false,
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const resolvedTheme = useMemo(() => {
    if (theme === 'system' && enableSystem) {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    }
    return theme;
  }, [theme, enableSystem]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.setAttribute('data-theme', resolvedTheme);
    root.style.colorScheme = resolvedTheme;

    if (body) {
      body.classList.remove('light', 'dark');
      body.classList.add(resolvedTheme);
    }

    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
  }, [theme, resolvedTheme, attribute, storageKey]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeState,
      resolvedTheme,
      themes: ['light', 'dark'],
    }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
