import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import CatLogin from "../../assets/catLogin.png";
export default function LoginScreen() {
  const tailwind = useTailwind();
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
        />

        <TextInput
          style={tailwind(`w-full bg-white border border-slate-200 rounded-md h-12 px-4`)}
          placeholderTextColor="#000"
          placeholder="Enter password"
        />

        <View style={tailwind(`flex flex-row justify-between items-center my-8`)}>
          <View style={tailwind(`flex-row items-center`)}>
            <Pressable
              style={tailwind(
                `bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`
              )}
            >
              {/* selected state */}
              <View style={tailwind(`bg-green-400 w-4 h-4 rounded-sm`)} />
            </Pressable>
            <Text style={tailwind(`text-slate-900`)}>Remember me</Text>
          </View>
          <Pressable>
            <Text style={tailwind(`text-blue-400 font-bold`)}>Reset password</Text>
          </Pressable>
        </View>

        <Pressable style={tailwind(`h-12 bg-yellow-400 rounded-md flex flex-row justify-center items-center px-6`)}>
          <View style={tailwind(`flex-1 flex items-center`)}>
            <Text style={tailwind(`text-black text-base font-medium`)}>Login</Text>
          </View>
        </Pressable>
        <Pressable style={tailwind(`h-12 bg-black rounded-md mt-6 flex flex-row justify-center items-center px-6`)}>
          <View style={tailwind(`flex-1 flex items-center`)}>
            <Text style={tailwind(`text-white text-base font-medium`)}>Register</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
