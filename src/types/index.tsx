export type RootStackParam = {
  Home: undefined;
  AddFood: undefined;
  About: undefined;
};

export type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

export type TodayCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
};

export type Meal = {
  id?: string;
  calories: string;
  name: string;
  portion: string;
  date?: string;
};

export type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove?: () => void;
};

export type TodayMealsProps = {
  meals: Meal[];
  onCompleteAddRemove?: () => void;
};
