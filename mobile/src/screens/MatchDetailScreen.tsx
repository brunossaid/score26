import { View, Text } from 'react-native';
import Screen from '../components/Screen';
import { useTheme } from 'react-native-paper';

export default function MatcheDetailScreen() {
  const { colors } = useTheme();

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.onSurface }}>partido X</Text>
    </Screen>
  );
}
