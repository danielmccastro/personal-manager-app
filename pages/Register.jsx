import { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AppContext } from "../contexts/AppContext";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { setCurrencyFormat } from "../services/currency";
import FinancialBalanceCard from "../components/FinancialBalanceCard";

export default function Register() {
  const {
    revenue,
    expense,
    addRevenue,
    addExpense,
    deleteRevenue,
    deleteExpense,
    sumAmount,
  } = useContext(AppContext);

  const [toggle, setToggle] = useState("Expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const totalExpense = sumAmount(expense);
  const totalRevenue = sumAmount(revenue);

  const handleToggle = () =>
    setToggle(toggle === "Expense" ? "Revenue" : "Expense");

  const handleAdd = () => {
    if (toggle === "Expense") {
      addExpense(amount, description);
    } else {
      addRevenue(amount, description);
    }
    setDescription("");
    setAmount("");
  };

  const renderItems = (items, deleteItem) => {
    return items.length > 0 ? (
      items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.title}>{setCurrencyFormat(item.amount)}</Text>
          <TouchableOpacity
            onPress={() => deleteItem(index)}
            style={styles.deleteButton}
          >
            <FontAwesome
              name="trash-o"
              size={24}
              color={toggle === "Expense" ? "#ee4035" : "#7bc043"}
            />
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <Text style={styles.title}>There are no {toggle.toLowerCase()}s</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerOption}>
        {["Expense", "Revenue"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => toggle !== type && handleToggle()}
            style={styles.btnType}
          >
            <Text
              style={toggle === type ? styles.activeTypeText : styles.typeText}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.mainContent}>
        <FinancialBalanceCard
          value={setCurrencyFormat(
            toggle === "Expense" ? totalExpense : totalRevenue
          )}
          title={toggle === "Expense" ? "Expenses" : "Revenue"}
        />
        <View style={styles.addRegister}>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
          />
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            placeholder="Value"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.btn} onPress={handleAdd}>
            <Entypo
              name="add-to-list"
              size={24}
              color={toggle === "Expense" ? "#ee4035" : "#7bc043"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {renderItems(
            toggle === "Expense" ? expense : revenue,
            toggle === "Expense" ? deleteExpense : deleteRevenue
          )}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registerOption: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  activeTypeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#73AF01",
    fontFamily: "InterRegular",
  },
  typeText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#000",
    fontFamily: "InterRegular",
  },
  mainContent: {
    flex: 1,
  },
  addRegister: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  input: {
    flex: 0.98,
    padding: 15,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
  },
  btn: {
    padding: 10,
  },
  btnType: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    marginLeft: 15,
    margin: 7,
    fontWeight: "300",
    fontFamily: "InterRegular",
  },
  itemRow: {
    flexDirection: "row",
  },
  deleteButton: {
    marginRight: 10,
  },
});
