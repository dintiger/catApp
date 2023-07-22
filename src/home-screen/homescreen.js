import { useTailwind } from "tailwind-rn";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useGetLocation } from "../hooks/usegetlocation";
import UploadButton from "../../assets/catUploadButton.svg";
import CatList from "../../assets/catListButton.svg";
import { UserProfile } from "./userprofile-bottomsheet";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import * as MediaLibrary from "expo-media-library";
import { UploadCat } from "./uploadcat-bottomsheet";

import { CatBottomSheet } from "./cat-bottomsheet";

import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCameraPermissionsAsync, Camera, CameraType } from "expo-camera";

export function HomeScreen() {
  const tailwind = useTailwind();
  const getLocation = useGetLocation();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);

  const [isCamera, setIsCamera] = React.useState(false);
  const [catList, setCatList] = React.useState([]);

  const onRegionChange = (region) => {
    console.log(region);
  };

  const cameraRef = React.useRef(null);
  const uploadCatSheet = useRef(null);
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

  const handleOpenPressUploadCat = useCallback(() => {
    uploadCatSheet.current?.expand();
  }, []);
  const handleClosePressUploadCat = () => bottomSheetRef.current.close();
  const renderBackdropUploadCat = useCallback(
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
        });
      });
      setCatList(cats);
    });
    return () => unsubscribe();
  }, []);

  const takePicture = async () => {
    if (cameraRef && cameraRef.current)
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
        if (photo.uri) {
          uploadCatSheet.current?.expand();
          setIsCamera(false);
        }
        setImage(photo.uri);
      } catch (e) {
        console.log(e);
      }
  };

  async function onOpenCamera() {
    MediaLibrary.requestPermissionsAsync();
    if (!permission || !permission.granted) {
      await requestPermission();
      return;
    }
    setIsCamera(true);
  }

  if (getLocation.isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={tailwind("flex-1")}>
      {isCamera ? (
        <Camera ref={cameraRef} style={tailwind("flex-1")} type={CameraType.back}>
          <View style={tailwind("absolute right-40 bottom-16 content-center")}>
            <TouchableOpacity onPress={takePicture}>
              <View style={tailwind("bg-white rounded-full h-24 w-24")} />
            </TouchableOpacity>
          </View>
          <View style={tailwind("absolute left-40 top-16 content-center")}>
            <TouchableOpacity
              onPress={() => {
                setIsCamera(false);
              }}
            >
              <View style={tailwind("bg-white rounded-full h-24 w-24")} />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <>
          <MapView
            style={tailwind("w-full h-full")}
            // onRegionChange={onRegionChange}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{
              latitude: getLocation.location.latitude,
              longitude: getLocation.location.longitude,
              latitudeDelta: 0.0361200573513667,
              longitudeDelta: 0.04261503199694516,
            }}
          >
            {catList.map((cat, idx) => (
              <Marker key={idx} coordinate={{ latitude: cat.location.latitude, longitude: cat.location.longitude }} />
            ))}
          </MapView>
          {/* to open profile  */}
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
          {/* to open camera */}
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
        </>
      )}

      {/* bottomsheet code */}
      <CatBottomSheet ref={bottomSheetRef} cats={catList} />
      <UserProfile ref={bottomProfileSheetRef} />
      <UploadCat ref={uploadCatSheet} catImage={image} />
    </View>
  );
}
