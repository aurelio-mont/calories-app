import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { Meal, RootStackParam, TodayCaloriesProps } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import { useCallback, useState } from "react";
import TodayCalories from "../../components/TodayCalories";
import TodayMeals from "../../components/TodayMeals";

const totalCaloriesPerDay = 2000;

const Home = () => {
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
    consumed: 0,
    remaining: 0,
    percentage: 0,
    total: totalCaloriesPerDay,
  });
  const [todayFoods, setTodayFoods] = useState<Meal[]>([]);
  const { onGetTodayFoods } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParam, "Home">>();

  const calculateStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acc, meal) => acc + Number(meal.calories),
        0
      );
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        consumed: caloriesConsumed,
        remaining: remainingCalories,
        percentage,
        total: totalCaloriesPerDay,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFoods = useCallback(async () => {
    try {
      const result = (await onGetTodayFoods()) as Meal[];
      calculateStatistics(result);
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
      <TodayCalories {...todayStatistics} />
      <TodayMeals meals={todayFoods} onCompleteAddRemove={loadTodayFoods} />
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
