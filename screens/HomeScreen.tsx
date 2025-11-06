// HomeScreen.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, Avatar, useTheme } from 'react-native-paper';
import { User } from '../services/api/AuthService';

interface HomeScreenProps {
  user: User | null;
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigateToLogin,
  onNavigateToRegister,
  onLogout,
}) => {
  const { colors } = useTheme();
  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>
            Welcome Home!
          </Text>

          <Card style={styles.userCard}>
            <Card.Content style={{ alignItems: 'center' }}>
              {user.profile_picture ? (
                <Avatar.Image size={80} source={{ uri: user.profile_picture }} />
              ) : (
                <Avatar.Text
                  size={80}
                  label={user.name?.charAt(0).toUpperCase() || '?'}
                />
              )}
              <Text variant="titleLarge" style={styles.userName}>
                {user.name}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {user.email}
              </Text>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            buttonColor={colors.error}
            onPress={onLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Welcome to the App
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Please login or register to continue
        </Text>

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={onNavigateToLogin}>
            Login
          </Button>
          <Button mode="outlined" onPress={onNavigateToRegister} style={{ marginTop: 10 }}>
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { marginBottom: 10, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 40 },
  buttonContainer: { width: '100%', maxWidth: 300 },
  userCard: { marginBottom: 30, width: '100%', maxWidth: 300 },
  userName: { marginTop: 10 },
  userEmail: { color: '#666' },
  logoutButton: { width: '100%', maxWidth: 300, marginTop: 20 },
});

export default HomeScreen;
