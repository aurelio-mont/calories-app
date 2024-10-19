import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/themed";

const AddFood = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Agregar alimento</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color={"white"} />}
            radius={"lg"}
            color={"success"}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="Manzana, pan, cafe..." />
        </View>
        <Button
          title={"Buscar"}
          color={"#ade8af"}
          radius={"lg"}
          titleStyle={styles.searchBtnTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "white",
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  addFoodLegend: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    fontSize: 14,
    color: "gray",
  },
});

export default AddFood;
