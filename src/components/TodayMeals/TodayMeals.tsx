import { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TodayMealsProps } from "../../types";
import MealItem from "../MealItem";

const TodayMeals: FC<TodayMealsProps> = ({ meals, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {meals?.map((meal, index) => (
          <MealItem
            key={`meal-${index}-${meal.name}`}
            {...meal}
            isAbleToAdd={false}
            onCompleteAddRemove={onCompleteAddRemove}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 16,
  },
});

export default TodayMeals;
