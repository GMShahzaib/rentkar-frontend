import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MyStoreScreen from './screens/MyStoreScreen';
import { authService, User } from './services/api/AuthService';
import { SecureStorageService } from './services/secureStorageService';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        SecureStorageService.saveItem('token', response.data.data.accessToken);
        setUser(response.data.data.user);
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid credentials');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleRegister = async (data: { email: string; password: string; name: string; profilePicture?: string }) => {
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
      } else {
        Alert.alert('Registration Failed', response.message || 'Could not create account');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    SecureStorageService.deleteItem('token');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        
        
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              user={user}
              onNavigateToLogin={() => props.navigation.navigate('Login')}
              onNavigateToRegister={() => props.navigation.navigate('Register')}
              onNavigateToMyStore={() => props.navigation.navigate('MyStore')}
              onLogout={handleLogout}
            />
          )}
        </Stack.Screen>

    
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              onLogin={handleLogin}
              onNavigateToRegister={() => props.navigation.navigate('Register')}
              onBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

  
        <Stack.Screen name="Register">
          {(props) => (
            <RegisterScreen
              {...props}
              onRegister={handleRegister}
              onNavigateToLogin={() => props.navigation.navigate('Login')}
              onBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

        
        <Stack.Screen name="MyStore">
          {(props) => (
            <MyStoreScreen
              {...props}
              user={user}
              onBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default App;
