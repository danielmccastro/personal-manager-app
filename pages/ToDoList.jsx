import { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppContext } from "../contexts/AppContext";
import Entypo from "@expo/vector-icons/Entypo";
import ToDoItem from "../components/ToDoItem";

export default function ToDoList() {
  const [text, setText] = useState("");
  const { task, addTask } = useContext(AppContext);

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text);
      setText("");
    }
  };

  const renderTaskList = () => {
    if (task.length === 0) {
      return <Text style={styles.title}>There are no tasks.</Text>;
    }
    return task.map((task, index) => (
      <ToDoItem key={index} item={task} index={index} />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Add new task"
        />
        <TouchableOpacity style={styles.btn} onPress={handleAddTask}>
          <Entypo name="add-to-list" size={24} color="#7bc043" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.listContainer}>{renderTaskList()}</ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#000",
    margin: 7,
    marginLeft: 15,
    fontFamily: "InterRegular",
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  input: {
    flex: 1,
    padding: 15,
    fontFamily: "InterRegular",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
  },
  btn: {
    padding: 10,
  },
});
