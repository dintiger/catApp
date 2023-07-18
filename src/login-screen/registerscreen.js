import { View, Text, TextInput, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function RegisterScreen() {
  const tailwind = useTailwind();

  return (
    <View style={tailwind(`flex-1 items-center justify-center bg-slate-50`)}>
      <View style={tailwind(`p-8 w-full max-w-sm`)}>
        <Text style={tailwind(`text-5xl font-bold mb-6 text-slate-900`)}>Login</Text>

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`)}
          placeholderTextColor="#000"
          placeholder="Enter username"
        />

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`)}
          placeholderTextColor="#000"
          placeholder="Enter email address"
        />

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4`)}
          placeholderTextColor="#000"
          placeholder="Enter password"
        />

        <Pressable
          style={tailwind(`h-12 bg-yellow-400 rounded-md mt-6 flex flex-row justify-center items-center px-6`)}
        >
          <View style={tailwind(`flex-1 flex items-center`)}>
            <Text style={tailwind(`text-black text-base font-medium`)}>Register</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
