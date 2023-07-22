import {View, Text, Image} from 'react-native'
import { useTailwind } from "tailwind-rn"

export  const Cat = ({ title, image }) => {
    const tailwind = useTailwind()
    return (
  <View style={[tailwind('my-3 mx-10 bg-pink')]}>
    <Image source={{uri: image }} style={{height: 100, width:100}} />
    <Text style={tailwind('text-lg')}>{title}</Text>
  </View>
)
}