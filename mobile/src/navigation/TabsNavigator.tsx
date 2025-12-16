import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: colors.surface,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.onSurface,
          fontSize: 22,
        },
      }}
    >
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'football' : 'football-outline'}
              size={size}
              color={focused ? '#00FFCC' : '#777'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={focused ? '#00FFCC' : '#777'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'cog' : 'cog-outline'}
              size={size}
              color={focused ? '#00FFCC' : '#777'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
