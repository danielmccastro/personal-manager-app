import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function PriorityTaskCard({ priorityTask }) {
  return (
    <View style={styles.taskContainer}>
      {priorityTask ? (
        <>
          <Text style={styles.taskTitle}>Priority Task</Text>
          <View style={styles.priorityTaskContainer}>
            <AntDesign
              name="warning"
              size={25}
              color="#bdad00"
              style={styles.icon}
            />
            <Text style={styles.taskText}>{priorityTask.description}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.noTaskText}>
          No task has been marked as priority.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  priorityTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: "InterRegular",
    marginBottom: 5,
  },
  taskText: {
    fontSize: 16,
    fontFamily: "InterBold",
    marginLeft: 10,
  },
  noTaskText: {
    fontSize: 16,
    fontFamily: "InterRegular",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});
