import { useState } from 'react';
import { darkTheme, lightTheme } from './paper.theme';

export function useAppTheme() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const setDark = () => setIsDark(true);
  const setLight = () => setIsDark(false);

  return {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
    toggleTheme,
    setDark,
    setLight,
  };
}
