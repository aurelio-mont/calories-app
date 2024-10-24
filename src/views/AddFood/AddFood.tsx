import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "../../components/AddFoodModal";
import { useEffect, useState } from "react";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealItem from "../../components/MealItem";

const AddFood = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [foods, setFoods] = useState<Meal[]>([]);
  const { onGetFoods } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };
  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Se agrego el alimento correctamente");
      loadFoods();
    }
    setVisible(false);
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleSearchPress = async () => {
    try {
      const results = await onGetFoods();
      setFoods(
        results.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

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
            onPress={() => setVisible(true)}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Manzana, pan, cafe..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title={"Buscar"}
          color={"#ade8af"}
          radius={"lg"}
          titleStyle={styles.searchBtnTitle}
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal, index) => (
          <MealItem
            key={`my-meal-item-${index}-${meal.name}`}
            {...meal}
            isAbleToAdd={true}
          />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
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
  content: {
    flex: 1,
  },
});

export default AddFood;
