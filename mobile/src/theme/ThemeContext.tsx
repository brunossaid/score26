import { createContext, useContext } from 'react';
import { useAppTheme } from './useAppTheme';

const ThemeContext = createContext<ReturnType<typeof useAppTheme> | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeState = useAppTheme();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }
  return ctx;
}
