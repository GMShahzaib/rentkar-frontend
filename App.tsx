import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

type Screen = 'home' | 'login' | 'register';

interface User {
  email: string;
  name: string;
  profilePicture?: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (email: string, password: string) => {
    // Simple mock login - in real app, validate with backend
    setUser({ email, name: 'User' });
    setCurrentScreen('home');
  };

  const handleRegister = (data: { email: string; password: string; name: string; profilePicture?: string }) => {
    // Simple mock register - in real app, send to backend
    setUser({ 
      email: data.email, 
      name: data.name, 
      profilePicture: data.profilePicture 
    });
    setCurrentScreen('home');
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