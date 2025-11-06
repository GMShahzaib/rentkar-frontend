import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button } from 'react-native-paper';

interface RegisterScreenProps {
  onRegister: (data: {
    email: string;
    password: string;
    name: string;
    profilePicture?: string;
  }) => Promise<void>;
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) return;
    setIsLoading(true);
    try {
      await onRegister({
        email,
        password,
        name,
        profilePicture: profilePicture || undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineLarge" style={styles.title}>
          Register
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Name *"
            value={name}
            onChangeText={setName}
            autoComplete="name"
            style={styles.input}
          />

          <TextInput
            label="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
          />

          <TextInput
            label="Password *"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            style={styles.input}
          />

          <TextInput
            label="Profile Picture URL (optional)"
            value={profilePicture}
            onChangeText={setProfilePicture}
            keyboardType="url"
            autoCapitalize="none"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.linkButton}
          >
            Already have an account? Login
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 30 },
  form: { flex: 1 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  linkButton: { marginTop: 20 },
});

export default RegisterScreen;
