import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import Screen from '../components/Screen';
import { useTheme } from 'react-native-paper';
import { useThemeContext } from '../theme/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={{ color: colors.onSurface }}>Name</Text>
            <Text style={{ color: colors.onSurface }}>Email</Text>
            <Text style={{ color: colors.onSurface }}>Password</Text>
          </Card.Content>
        </Card>

        <Button mode="contained" onPress={toggleTheme}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Button>

        <Button mode="contained" onPress={logout}>
          Log out
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 16,
  },
  card: {
    borderRadius: 16,
  },
  cardContent: {
    borderRadius: 20,
    gap: 12,
  },
});
