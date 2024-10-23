import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";

const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";
const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const parsedSavedFood = JSON.parse(currentSavedFood);
        parsedSavedFood.push(meal);
        await AsyncStorage.setItem(storageKey, JSON.stringify(parsedSavedFood));
        return Promise.resolve();
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({ name, portion, calories }: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        name,
        portion,
        calories,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({ name, portion, calories }: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        name,
        portion,
        calories,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
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

  const handleGetTodayFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
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
    onSaveTodayFood: handleSaveTodayFood,
    onGetFoods: handleGetFoods,
    onGetTodayFoods: handleGetTodayFoods,
  };
};

export default useFoodStorage;
