import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";

const MY_FOOD_KEY = "@MyFood:Key";
const useFoodStorage = () => {
  const handleSaveFood = async ({ name, portion, calories }: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (currentSavedFood !== null) {
        const parsedSavedFood = JSON.parse(currentSavedFood);
        parsedSavedFood.push({ name, portion, calories });
        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify(parsedSavedFood)
        );
        return Promise.resolve();
      }

      await AsyncStorage.setItem(
        MY_FOOD_KEY,
        JSON.stringify([{ name, portion, calories }])
      );

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
      return Promise.resolve([]);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFood,
  };
};

// guardar datos
// obtener datos

export default useFoodStorage;
