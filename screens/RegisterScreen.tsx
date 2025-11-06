import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await onRegister({
        email,
        password,
        name,
        profilePicture: profilePicture || undefined,
      });
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name *"
            value={name}
            onChangeText={setName}
            autoComplete="name"
          />

          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Password *"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          <TextInput
            style={styles.input}
            placeholder="Profile Picture URL (optional)"
            value={profilePicture}
            onChangeText={setProfilePicture}
            autoCapitalize="none"
            keyboardType="url"
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;