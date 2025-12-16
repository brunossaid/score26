import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';
import TabsNavigator from './TabsNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabsNavigator} />
      <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
    </Stack.Navigator>
  );
}
