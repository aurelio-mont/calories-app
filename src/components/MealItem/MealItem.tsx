import { FC } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";

const MealItem: FC<Meal> = ({ name, portion, calories }) => {
  const { onSaveTodayFood } = useFoodStorage();
  const handleAddItemPress = async () => {
    try {
      await onSaveTodayFood({ name, portion, calories });
      Alert.alert("Se agrego el alimento al dia");
    } catch (error) {
      console.error(error);
      Alert.alert("No se pudo agregar el alimento al dia");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.lefContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          style={styles.iconButton}
          type="clear"
          icon={<Icon name="add-circle-outline" />}
          onPress={handleAddItemPress}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ade8af",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
  },
  lefContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    fontSize: 12,
    fontWeight: "500",
    color: "gray",
  },
  calories: {
    fontSize: 18,
  },
  iconButton: {
    marginBottom: -8,
  },
});

export default MealItem;
