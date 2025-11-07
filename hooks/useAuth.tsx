import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/api/AuthService';
import { userService, User } from '../services/api/UsersService';
import { SecureStorageService } from '../services/secureStorageService';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, navigation: any) => Promise<void>;
  register: (
    data: { email: string; password: string; name: string; profilePicture?: string },
    navigation: any
  ) => Promise<void>;
  logout: (navigation: any) => Promise<void>;
  reloadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  reloadUser: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = await SecureStorageService.getItem('token');
      if (token) await reloadUser();
      setLoading(false);
    };
    fetchUser();
  }, []);

  const reloadUser = async () => {
    try {
      const response = await userService.getMe();
      if (response.success && response.data) {
        setUser(response.data.data.user);
      }
    } catch (err) {
      console.error('Reload user failed', err);
    }
  };

  const login = async (email: string, password: string, navigation: any) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        await SecureStorageService.saveItem('token', response.data.data.accessToken);
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

  const register = async (
    data: { email: string; password: string; name: string; profilePicture?: string },
    navigation: any
  ) => {
    try {
      const response = await authService.register({
        email: data.email,
        password: data.password,
        name: data.name,
        profile_picture: data.profilePicture,
      });
      if (response.success && response.data) {
        await SecureStorageService.saveItem('token', response.data.data.accessToken);
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

  const logout = async (navigation: any) => {
    await SecureStorageService.removeItem('token');
    setUser(null);
    navigation.replace('Home');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        reloadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
