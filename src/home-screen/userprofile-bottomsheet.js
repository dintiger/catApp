import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useTailwind } from "tailwind-rn";

export const UserProfile = React.forwardRef((props, ref) => {
  const tailwind = useTailwind();
  const snapPoints = React.useMemo(() => ["50%"], []);
  const renderBackdrop = React.useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
    []
  );
  return (
    <BottomSheet backdropComponent={renderBackdrop} enablePanDownToClose ref={ref} index={-1} snapPoints={snapPoints}>
      <View style={tailwind("flex-1")}>
        <Text style={tailwind("text-3xl ml-6 font-extrabold")}>User Profile</Text>
        <View></View>

        <View style={tailwind("flex-1")}>
          <Text style={tailwind("text-lg")}>Amri</Text>
          <Text style={tailwind("text-lg")}>Email</Text>
          <Text style={tailwind("text-lg")}>Logout</Text>
        </View>
      </View>
      <View style={tailwind("items-center")}>
        <TouchableOpacity onPress={null}>
          <View
            style={tailwind(`h-12 w-24 bg-black rounded-sm flex mt-3 mb-6 flex-row justify-center items-center `)}
          >
            <View style={tailwind(`flex-1 flex items-center`)}>
              <Text style={tailwind(`text-white text-base font-medium`)}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
});
