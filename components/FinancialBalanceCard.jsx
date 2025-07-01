import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FinancialBalanceCard({ value, title }) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => setIsHidden((prevState) => !prevState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentRow}>
        <Text style={[styles.value, isHidden && styles.hiddenValue]}>
          {isHidden ? " " : value}
        </Text>
        <TouchableOpacity onPress={toggleVisibility}>
          <MaterialCommunityIcons
            name={isHidden ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 15,
    marginVertical: 15,
    marginHorizontal: 15,
  },
  title: {
    fontWeight: "400",
    fontFamily: "InterRegular",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  value: {
    fontSize: 25,
    fontFamily: "InterBold",
    color: "black",
  },
  hiddenValue: {
    backgroundColor: "#9e9e9e73",
    width: 150,
    borderRadius: 10,
  },
});