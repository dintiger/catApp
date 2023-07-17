import { useTailwind } from "tailwind-rn";
import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useGetLocation } from "../hooks/usegetlocation";
import UploadButton from "../../assets/catUploadButton.svg";
import CatList from "../../assets/catListButton.svg";

import BottomSheet from "@gorhom/bottom-sheet";

export function HomeScreen() {
  const tailwind = useTailwind();
  const getLocation = useGetLocation();
  console.log(getLocation);

  const bottomSheetRef = useRef < BottomSheet > null;
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={tailwind("flex-1")}>
      <MapView style={tailwind("w-full h-full")} />
      <View style={tailwind("absolute inset-x-9 bottom-12")}>
        <View style={tailwind("flex-row justify-center")}>
          <View style={tailwind("bg-white rounded-full h-16 w-16 mr-11")}>
            <UploadButton style={tailwind("m-auto")} width={24} height={24} />
          </View>

          <View style={tailwind("bg-white rounded-full h-16 w-16")}>
            <CatList style={tailwind("m-auto")} width={24} height={24} />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
