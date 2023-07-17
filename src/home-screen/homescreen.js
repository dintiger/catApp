import { useTailwind } from "tailwind-rn";
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MapView from "react-native-maps";
import { useGetLocation } from "../hooks/usegetlocation";
import UploadButton from "../../assets/catUploadButton.svg";
import CatList from "../../assets/catListButton.svg";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";

export function HomeScreen() {
  const tailwind = useTailwind();
  const getLocation = useGetLocation();
  console.log(getLocation);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleClosePress = () => bottomSheetRef.current.close();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <View style={tailwind("flex-1")}>
      <MapView style={tailwind("w-full h-full")} />
      <View style={tailwind("absolute inset-x-9 bottom-12")}>
        <View style={tailwind("flex-row justify-center")}>
          <View style={tailwind("bg-white rounded-full h-16 w-16 mr-11")}>
            <UploadButton style={tailwind("m-auto")} width={24} height={24} />
          </View>
          <TouchableOpacity onPress={handleOpenPress}>
            <View style={tailwind("bg-white rounded-full h-16 w-16")}>
              <CatList style={tailwind("m-auto")} width={24} height={24} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
      >
        <View style={tailwind("flex-1")}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
