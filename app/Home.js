import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Page 🎉</Text>

      <View style={{ marginTop: 20 }}>
        <Link href="/login" asChild>
          <Button title="Go to Login" />
        </Link>
      </View>

      <View style={{ marginTop: 10 }}>
        <Link href="/signup" asChild>
          <Button title="Go to Sign Up" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold" },
});
