import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Welcome to RentKar App 🚗
      </Text>

      <Link href="../login" asChild>
        <Button title="Go to Login" />
      </Link>

      <View style={{ marginTop: 10 }}>
        <Link href="../signup" asChild>
          <Button title="Go to Sign Up" />
        </Link>
      </View>
    </View>
  );
}
