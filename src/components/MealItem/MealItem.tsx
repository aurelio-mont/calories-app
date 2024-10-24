import { FC } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { MealItemProps } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const MealItem: FC<MealItemProps> = ({
  id = "",
  name,
  portion,
  calories,
  isAbleToAdd,
  onCompleteAddRemove,
}) => {
  const { onSaveTodayFood, onRemoveTodayFoods } = useFoodStorage();
  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        id = uuidv4();
        await onSaveTodayFood({ id, name, portion, calories });
        Alert.alert("Se agrego el alimento al dia");
      } else {
        await onRemoveTodayFoods(id);
        Alert.alert("Se elimino el alimento del dia");
      }
      onCompleteAddRemove?.();
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
          icon={
            <Icon
              name={
                isAbleToAdd ? "add-circle-outline" : "remove-circle-outline"
              }
              color={"black"}
              size={24}
            />
          }
          onPress={handleIconPress}
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
