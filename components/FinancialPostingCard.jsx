import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FinancialBalanceCard({ value, title, totalAmount }) {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => setIsHidden((prevState) => !prevState);

  const renderItem = (item, index) => (
    <View key={index} style={styles.itemContainer}>
      <MaterialCommunityIcons
        name={title === "Expenses" ? "minus-circle" : "plus-circle"}
        size={30}
        color={title === "Expenses" ? "#ee4035" : "#7bc043"}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemAmount}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.amount)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleToggle}>
          <MaterialCommunityIcons
            name={isHidden ? "chevron-down" : "chevron-up"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {!isHidden && (
        <View>
          {value.length === 0 ? (
            <Text style={styles.noItemsText}>There are no entries.</Text>
          ) : (
            <>
              <Text style={styles.totalAmount}>Total: {totalAmount}</Text>
              <ScrollView>{value.map(renderItem)}</ScrollView>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  noItemsText: {
    fontSize: 14,
    fontFamily: "InterLight",
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: "InterBold",
    textAlign: "right",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: "InterLight",
  },
  itemAmount: {
    fontSize: 14,
    fontFamily: "InterRegular",
  },
});
