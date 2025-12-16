import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 25,
  colors: {
    ...MD3LightTheme.colors,
    background: '#ffffff',
    surface: '#F2F2F2',
    primary: '#16BA99',
    onSurfaceVariant: '#000000',
    onBackground: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 25,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#000000',
    surface: '#121212',
    primary: '#16BA99',
    onSurfaceVariant: '#ffffff',
    onBackground: '#ffffff',
  },
};
