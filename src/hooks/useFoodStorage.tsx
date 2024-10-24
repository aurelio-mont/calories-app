import AsyncStorage from "@react-native-async-storage/async-storage";

import { Meal } from "../types";
import { isToday } from "date-fns";

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

  const handleSaveTodayFood = async ({ id, name, portion, calories }: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        id,
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
        const parsedFoods = JSON.parse(foods) as Meal[];

        const filteredFoods = parsedFoods.filter(
          (item) => item.date && isToday(new Date(item.date))
        );
        return Promise.resolve(filteredFoods);
      }
      return Promise.resolve([]);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveTodayFoods = async (id: string) => {
    try {
      const todayFoods = await handleGetTodayFoods();
      const filteredFoods = todayFoods?.filter((item: Meal) => item.id !== id);
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredFoods)
      );

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetFoods: handleGetFoods,
    onGetTodayFoods: handleGetTodayFoods,
    onRemoveTodayFoods: handleRemoveTodayFoods,
  };
};

export default useFoodStorage;
