// components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

interface ProtectedRouteProps {
  children: React.ReactElement;
  navigation: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, navigation }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigation.replace('Login');
    }
  }, [user, loading, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    // Don’t render anything while redirecting
    return null;
  }

  return children;
};

export default ProtectedRoute;
