export type RootStackParam = {
  Home: undefined;
  AddFood: undefined;
  About: undefined;
};

export type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

export type Meal = {
  calories: string;
  name: string;
  portion: string;
};
