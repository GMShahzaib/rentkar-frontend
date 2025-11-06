// App.tsx
import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { authService, User } from './services/api/AuthService';
import { SecureStorageService } from './services/secureStorageService';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    secondary: '#03dac4',
  },
};

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);

  const handleLogin = async (email: string, password: string, navigation: any) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        SecureStorageService.saveItem('token', response.data.data.accessToken);
        setUser(response.data.data.user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid credentials');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleRegister = async (data: { email: string; password: string; name: string; profilePicture?: string }, navigation: any) => {
    try {
      const response = await authService.register({
        email: data.email,
        password: data.password,
        name: data.name,
        profile_picture: data.profilePicture,
      });
      if (response.success && response.data) {
        SecureStorageService.saveItem('token', response.data.data.accessToken);
        setUser(response.data.data.user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Registration Failed', response.message || 'Could not create account');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleLogout = (navigation: any) => {
    setUser(null);
    navigation.replace('Home');
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ title: 'Home' }}>
            {(props) => (
              <HomeScreen
                {...props}
                user={user}
                onNavigateToLogin={() => props.navigation.navigate('Login')}
                onNavigateToRegister={() => props.navigation.navigate('Register')}
                onLogout={() => handleLogout(props.navigation)}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Login" options={{ title: 'Login' }}>
            {(props) => (
              <LoginScreen
                {...props}
                onLogin={(email, password) => handleLogin(email, password, props.navigation)}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Register" options={{ title: 'Register' }}>
            {(props) => (
              <RegisterScreen
                {...props}
                onRegister={(data) => handleRegister(data, props.navigation)}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
