import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          color: "black",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Home
      </Text>
    </View>
  );
}
