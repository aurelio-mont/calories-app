import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParam } from "../types";
import Home from "../views/Home";
import AddFood from "../views/AddFood";
import About from "../views/About";

const Stack = createNativeStackNavigator<RootStackParam>();

const routeScreenDefinitions = {
  headerShown: false,
};
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={routeScreenDefinitions}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={routeScreenDefinitions}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={routeScreenDefinitions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
