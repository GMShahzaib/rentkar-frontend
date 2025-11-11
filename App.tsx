import * as React from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme, Button, Text } from 'react-native-paper';
import merge from 'deepmerge';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';

const CombinedDefaultTheme = merge(MD3LightTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, NavigationDarkTheme);

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { loading } = useAuth();

  if (loading) return <Text>Loading...</Text>; // show splash screen

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Profile"
        options={{ title: 'Profile' }}
      >
        {({ navigation }) => (
          <ProtectedRoute navigation={navigation}>
            <ProfileScreen navigation={navigation} />
          </ProtectedRoute>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
        <Button onPress={toggleTheme} style={{ position: 'absolute', bottom: 20, right: 20 }}>
          Toggle Theme
        </Button>
      </AuthProvider>
    </PaperProvider>
  );
}
