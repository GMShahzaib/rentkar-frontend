import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, Avatar, useTheme, Menu, IconButton, Divider } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  React.useLayoutEffect(() => {
    // set different headerRight depending on whether user is logged in
    navigation.setOptions({
      headerRight: () => (
        <Menu
          // @ts-ignore  (because of react-native-paper Menu opening issue)
          key={menuVisible} // helps rerender
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={24}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Profile');
            }}
            title="Profile"
          />
          {user && (
            <>
              <Divider />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  logout(navigation);
                }}
                title="Logout"
              />
            </>)}
        </Menu>

      ),
    });
  }, [navigation, user, menuVisible]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Welcome Home!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { marginBottom: 10, textAlign: 'center' },
});

export default HomeScreen;
