import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { authService, User } from './services/api/AuthService';
import { SecureStorageService } from './services/secureStorageService';

type Screen = 'home' | 'login' | 'register';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        SecureStorageService.saveItem('token', response.data.data.accessToken);
        setUser(response.data.data.user);
        setCurrentScreen('home');
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid credentials');
      }
    } catch (error) {
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
        setCurrentScreen('home');
      } else {
        Alert.alert('Registration Failed', response.message || 'Could not create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => navigateTo('register')}
            onBack={() => navigateTo('home')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegister={handleRegister}
            onNavigateToLogin={() => navigateTo('login')}
            onBack={() => navigateTo('home')}
          />
        );
      default:
        return (
          <HomeScreen
            user={user}
            onNavigateToLogin={() => navigateTo('login')}
            onNavigateToRegister={() => navigateTo('register')}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
