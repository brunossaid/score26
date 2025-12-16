import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.onSurface }}>home</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
