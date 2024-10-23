import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { Meal, RootStackParam } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import { useCallback, useState } from "react";

const Home = () => {
  const [todayFoods, setTodayFoods] = useState<Meal[]>([]);
  const { onGetTodayFoods } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParam, "Home">>();

  const loadTodayFoods = useCallback(async () => {
    try {
      const result = await onGetTodayFoods();
      setTodayFoods(result);
    } catch (error) {
      setTodayFoods([]);
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFoods().catch(null);
    }, [loadTodayFoods])
  );
  const handleAddFood = () => {
    navigate("AddFood");
  };

  console.log(todayFoods);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calorias</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color={"white"} />}
            radius={"lg"}
            color={"success"}
            onPress={handleAddFood}
          />
        </View>
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
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  caloriesLegend: {
    fontSize: 20,
  },
});

export default Home;
