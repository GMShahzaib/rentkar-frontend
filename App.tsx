// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { AuthProvider, useAuth } from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    secondary: '#03dac4',
  },
};

function AppNavigator() {
  const { loading } = useAuth();

  if (loading) return null; // can show splash screen here

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Home' }}>
          {(props) => (
            <HomeScreen
              {...props}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Login" options={{ title: 'Login' }}>
          {(props) => (
            <LoginScreen
              {...props}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Register" options={{ title: 'Register' }}>
          {(props) => (
            <RegisterScreen
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}
