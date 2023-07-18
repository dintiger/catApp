import { StatusBar } from "expo-status-bar";
import { useTailwind } from "tailwind-rn";
import { TailwindProvider } from "tailwind-rn";
import { StyleSheet, Text, View } from "react-native";
import utilities from "./tailwind.json";
import customUtilities from "./custom-tailwind.json"
import { HomeScreen } from "./src/home-screen/homescreen";
import LoginScreen from "@/src/login-screen/loginscreen";
import RegisterScreen from "@/src/login-screen/registerscreen";

const allUtls = {...utilities, ...customUtilities}
export default function App() {
  return (
    <TailwindProvider utilities={allUtls}>
      {/* <RegisterScreen /> */}
      {/* <LoginScreen /> */}
      <HomeScreen />
      <StatusBar style="auto" />
    </TailwindProvider>
  );
}
