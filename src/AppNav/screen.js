import { View } from "react-native";
import LoginScreen from "../login-screen/loginscreen";
import { HomeScreen } from "../home-screen/homescreen";
import RegisterScreen from "../login-screen/registerscreen";
import { createStackNavigator } from "@react-navigation/stack";

const AppNavStack = createStackNavigator();

export function AppNav() {
  return (
    <AppNavStack.Navigator screenOptions={{ headerShown: false }}>
      <AppNavStack.Screen name="LoginScreen" component={LoginScreen} />
      <AppNavStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AppNavStack.Screen name="HomeScreen" component={HomeScreen} />
    </AppNavStack.Navigator>
  );
}
