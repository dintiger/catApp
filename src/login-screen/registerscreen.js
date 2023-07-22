import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function RegisterScreen() {
  const tailwind = useTailwind();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onRegister(email, password) {
    console.log("onRegister func");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        console.log("error:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <View style={tailwind(`flex-1 items-center justify-center bg-slate-50`)}>
      <View style={tailwind(`p-8 w-full max-w-sm`)}>
        <Text style={tailwind(`text-5xl font-bold mb-6 text-slate-900`)}>Login</Text>

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`)}
          placeholderTextColor="#000"
          placeholder="Enter email address"
          autoCapitalize="none"
          onChangeText={(txt) => setEmail(txt)}
        />

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4`)}
          placeholderTextColor="#000"
          placeholder="Enter password"
          autoCapitalize="none"
          onChangeText={(txt) => setPassword(txt)}
        />
        <TouchableOpacity
          onPress={() => {
            console.log("onreg button");
            onRegister(email, password);
          }}
        >
          <View style={tailwind(`h-12 bg-yellow-400 rounded-md mt-6 flex flex-row justify-center items-center px-6`)}>
            <View style={tailwind(`flex-1 flex items-center`)}>
              <Text style={tailwind(`text-black text-base font-medium`)}>Register</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
