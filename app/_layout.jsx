import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/context/AuthContext"; // ✅ import
import { useColorScheme } from "@/hooks/useColorScheme";

function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      {/* ✅ Agar user login hai to tabs dikhaye */}
      {user ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
        </>
      )}

      {/* Not Found screen */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
