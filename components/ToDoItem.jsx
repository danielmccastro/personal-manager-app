import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function ToDoItem({ item, index }) {
  const { deleteTask, markAsPriority } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.description}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => markAsPriority(index)}
          style={styles.iconButton}
        >
          <AntDesign name="warning" size={24} color="#E9D502" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <FontAwesome name="trash-o" size={24} color="#ee4035" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "InterRegular",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 15,
  },
});