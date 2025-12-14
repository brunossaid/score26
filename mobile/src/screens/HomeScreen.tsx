import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View>
      <Text>home</Text>

      <Button mode="contained" onPress={logout}>
        Log out
      </Button>
    </View>
  );
}
