import { StatusBar } from "expo-status-bar";
import { useTailwind } from "tailwind-rn";
import { TailwindProvider } from "tailwind-rn";
import { StyleSheet, Text, View } from "react-native";
import utilities from "./tailwind.json";
import { HomeScreen } from "./src/home-screen/homescreen";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
   
        <HomeScreen />
        <StatusBar style="auto" />
      
    </TailwindProvider>
  );
}


