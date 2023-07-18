import {View, Text} from 'react-native'
import { useTailwind } from "tailwind-rn"

export  const Cat = ({ title }) => {
    const tailwind = useTailwind()
    return (
  <View style={[tailwind('my-3 mx-10 bg-pink')]}>
    <Text style={tailwind('text-lg')}>{title}</Text>
  </View>
)
}