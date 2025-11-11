import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text, Card, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Card.Content style={styles.centered}>
              <Avatar.Icon size={90} icon="account-circle" />
              <Text variant="headlineSmall" style={styles.title}>
                You’re not logged in
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Please login to view your profile.
              </Text>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
                Go to Login
              </Button>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.centered}>
            {user.profile_picture ? (
              <Avatar.Image size={100} source={{ uri: user.profile_picture }} />
            ) : (
              <Avatar.Text size={100} label={user.name?.charAt(0).toUpperCase() || '?'} />
            )}

            <Text variant="headlineSmall" style={styles.name}>
              {user.name}
            </Text>
            <Text variant="bodyMedium" style={styles.email}>
              {user.email}
            </Text>

            <Button
              mode="contained"
              buttonColor={colors.error}
              onPress={logout}
              style={styles.button}
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    elevation: 3,
    borderRadius: 10,
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  name: {
    marginTop: 12,
    fontWeight: '600',
  },
  email: {
    color: '#666',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});

export default ProfileScreen;
