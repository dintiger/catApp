import { useTailwind } from "tailwind-rn";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useGetLocation } from "../hooks/usegetlocation";
import useGetCamera from "../hooks/usecamera";
import UploadButton from "../../assets/catUploadButton.svg";
import CatList from "../../assets/catListButton.svg";
import Favicon from "../../assets/favicon.png";
import { UserProfile } from "./userprofile-bottomsheet";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

import { CatBottomSheet } from "./cat-bottomsheet";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCameraPermissionsAsync, Camera, CameraType } from "expo-camera";

const catDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Latest Cat",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Latest Cat",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Latest Cat",
  },
];

export function HomeScreen() {
  const tailwind = useTailwind();
  const getLocation = useGetLocation();
  const [type, setType] = React.useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [isCamera, setIsCamera] = React.useState(false);
  const [catList, setCatList] = React.useState([]);

  const cameraRef = React.useRef(null);
  const bottomSheetRef = useRef(null);
  const bottomProfileSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleClosePress = () => bottomSheetRef.current.close();
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
    []
  );

  const handleOpenPressProfile = useCallback(() => {
    bottomProfileSheetRef.current?.expand();
  }, []);
  const handleClosePressProfile = () => bottomSheetRef.current.close();
  const renderBackdropProfile = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
    []
  );

  useEffect(() => {
    const catQuery = query(collection(db, "cat"));
    const unsubscribe = onSnapshot(catQuery, (querySnapshot) => {
      const cats = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        cats.push({
          ...doc.data(),
          _id: doc.id,
          uploadedDate: new Date(doc.data().uploadedDate.toMillis()),
        });
      });
      setCatList(cats);
    });
    return () => unsubscribe();
  }, []);

  const takePicture = async () => {
    if (cameraRef && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      /**
       * {"height": 4224,
       * "uri": "file:///var/mobile/Containers/Data/Application/156CA2E7-E2A2-481F-87FA-86B7D93145F8/Library/Caches/ExponentExperienceData/%2540didiloki23%252FcatApp/Camera/F6551A41-AF81-476A-9E13-04C586967E93.jpg", "width": 2376}
       */
      console.log(photo);
    }
  };

  async function onOpenCamera() {
    if (!permission || !permission.granted) {
      await requestPermission();
      return;
    }

    setIsCamera(true);
  }

  if (isCamera) {
    return (
      <Camera ref={cameraRef} style={tailwind("flex-1")} type={CameraType.back}>
        <View style={tailwind("absolute right-40 bottom-16 content-center")}>
          <TouchableOpacity onPress={takePicture}>
            <View style={tailwind("bg-white rounded-full h-24 w-24")} />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  return (
    <View style={tailwind("flex-1")}>
      <MapView style={tailwind("w-full h-full")}>
        {catList.map((cat, idx) => (
          <Marker key={idx} coordinate={{ latitude: cat.location.latitude, longitude: cat.location.longitude }} />
        ))}
      </MapView>

      <View style={tailwind("absolute right-10 top-16")}>
        <TouchableOpacity onPress={handleOpenPressProfile}>
          <View style={tailwind(" bg-white rounded-full h-16 w-16")}>
            <Image
              style={tailwind("bg-white rounded-full h-16 w-16 mr-11")}
              source={require("../../assets/favicon.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* to open profile settings */}
      <View style={tailwind("absolute inset-x-9 bottom-12")}>
        {/* to open camera to add cat */}
        <View style={tailwind("flex-row justify-center")}>
          <TouchableOpacity onPress={onOpenCamera}>
            <View style={tailwind("bg-white rounded-full h-16 w-16 mr-11")}>
              <UploadButton style={tailwind("m-auto")} width={24} height={24} />
            </View>

            {/* to open nearby cats & detail page */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress}>
            <View style={tailwind(" bg-white rounded-full h-16 w-16")}>
              <CatList style={tailwind("m-auto")} width={24} height={24} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* bottomsheet code */}
      <CatBottomSheet catData={catDATA} ref={bottomSheetRef} />
      <UserProfile ref={bottomProfileSheetRef} />
      {/* <BottomSheet
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
      >
        <View style={tailwind("flex-1")}>
          <Text style={tailwind("text-3xl ml-6 font-extrabold")}>Show Nearby Cats</Text>

          <View style={tailwind("flex-1")}>
            <FlatList
              data={catDATA}
              renderItem={({ item }) => <Cat title={item.title} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </BottomSheet> */}
    </View>
  );
}

const stylesBottomSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",

    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
