import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { TodayCaloriesProps } from "../../types";

const TodayCalories: FC<TodayCaloriesProps> = ({
  total,
  consumed,
  remaining,
  percentage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.lefContainer}>
        <CircularProgress value={percentage} valueSuffix="%" />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.today}>Hoy</Text>
        <View style={styles.rightItem}>
          <Text style={styles.itemLegend}>Total</Text>
          <Text style={styles.itemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.itemLegend}>Consumidos</Text>
          <Text style={styles.itemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.itemLegend}>Restantes</Text>
          <Text style={styles.itemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  lefContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  today: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 14,
  },
  itemLegend: {
    flex: 0.7,
  },
  itemValue: {
    flex: 0.3,
    textAlign: "right",
  },
});

export default TodayCalories;
