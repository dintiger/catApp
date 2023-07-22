import { View, Text, TextInput, Pressable, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import React from "react";
import auth from "../../firebase.config";

import { useNavigation } from "@react-navigation/native";
import RegisterScreen from "./registerscreen";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onLogin(email, password) {
    console.log("onLogin func");
    navigation.navigate("HomeScreen");
    // signInAnonymously(auth)
    //   .then((userCredential) => {
    //     // Signed in
    //     // const user = userCredential.user;
    //     console.log("success");
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log("error:", error);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("error:", error.code);
    //     console.log("error:", error.message);
    //     // ..
    //   });
  }

  function goRegisterScreen() {
    navigation.navigate("RegisterScreen");
  }

  return (
    <View style={tailwind(`flex-1 items-center justify-center bg-slate-50`)}>
      <View style={tailwind(`p-8 w-full max-w-sm`)}>
        <Text style={tailwind(`text-5xl font-bold mb-6 text-slate-900`)}>Login</Text>

        <View>
          <Image
            style={{
              width: 200,
              height: 200,
              marginLeft: 50,
              marginBottom: 50,
            }}
            source={require("../../assets/catLogin.png")}
          />
        </View>

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`)}
          placeholderTextColor="#000"
          placeholder="Enter email address"
          value={email}
          autoCapitalize="none"
          onChangeText={(txt) => setEmail(txt)}
        />

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4`)}
          placeholderTextColor="#000"
          value={password}
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(txt) => setPassword(txt)}
        />

        {/* selected state */}

        <TouchableOpacity
          onPress={() => {
            console.log("onLogin button");
            onLogin(email, password);
          }}
        >
          <View style={tailwind(`h-12 bg-yellow-400 rounded-md flex mt-6  flex-row justify-center items-center px-6`)}>
            <View style={tailwind(`flex-1 flex items-center`)}>
              <Text style={tailwind(`text-black text-base font-medium`)}>Login</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("goRegScreen button");
            goRegisterScreen();
          }}
        >
          <View style={tailwind(`h-12 bg-black rounded-md mt-6 flex flex-row justify-center items-center px-6`)}>
            <View style={tailwind(`flex-1 flex items-center`)}>
              <Text style={tailwind(`text-white text-base font-medium`)}>Register</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
