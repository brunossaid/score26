import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useThemeContext } from './theme/ThemeContext';

function AppContent() {
  const { theme, isDark } = useThemeContext();

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
