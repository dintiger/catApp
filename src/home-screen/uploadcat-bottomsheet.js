import React from "react";
import { useGetLocation } from "../hooks/usegetlocation";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useTailwind } from "tailwind-rn";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
import { uploadBytes, getDownloadURL, ref as firebaseRef } from "firebase/storage";
import { GeoPoint, collection, addDoc } from "firebase/firestore"
import { storage, db } from "../../firebase.config";

export const UploadCat = React.forwardRef((props, ref) => {
  const tailwind = useTailwind();
  const [catName, setCatName] = React.useState('')
  const [catDescription, setCatDescription] = React.useState('')
  const userLocation = useGetLocation();
  const snapPoints = React.useMemo(() => ["60%"], []);
  const renderBackdrop = React.useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />,
    []
  );

  function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };
      // this helps us get a blob
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);

      xhr.send(null);
    });
  }

  async function addCatData(catToSave){
    try{
      console.log(catToSave)
      await addDoc(collection(db,'cat'), catToSave)
    }catch(e){
      console.log("Unable to save", e)
    }
  }
  async function uploadCatDetails() {
    try {
      //convert image to blob
      const imgBlob = await uriToBlob(props.catImage);
      const storageRef = firebaseRef(storage, "some-cat");
      uploadBytes(storageRef, imgBlob).then((snapshot) => {
      // //   console.log(snapshot.ref.fullPath)
        getDownloadURL(snapshot.ref).then((downloadURL) => {
      //     console.log("File available at", downloadURL);
          const catFound = {
            image: downloadURL,
            location: new GeoPoint(Number(userLocation.location.latitude), Number(userLocation.location.longitude)),
            name: catName,
            description: catDescription,
            user: "Amri",
            uploadedDate: new Date()
          }
          addCatData(catFound)
          // close bottom sheet and clear states(catName, catDescription, image state )

        });
      });
    } catch (e) {
      console.log("error from : ", e);
    }
  }

  return (
    <BottomSheet backdropComponent={renderBackdrop} enablePanDownToClose ref={ref} index={-1} snapPoints={snapPoints}>
      <ScrollView style={tailwind("px-4")}>
        <View style={tailwind("flex-1")}>
          <Text style={tailwind("text-3xl ml-6 font-extrabold")}>Upload Your Cat</Text>
          <View style={tailwind("flex-1")}>
            <Text style={tailwind("text-lg")}>Image of the cat</Text>
            <Image source={{ uri: props.catImage, isStatic: true }} style={tailwind("h-24 w-24 mb-4")} />
            <View style={tailwind("border-solid border-2 border-sky-500")}>
              <Text style={tailwind("text-lg")}>Name This Cat</Text>
              <TextInput onChangeText={val => setCatName(val)} maxLength={15} style={{ padding: 10 }} />
            </View>
            <View style={tailwind("border-solid mt-4 border-2 border-sky-500 p-3")}>
              <Text style={tailwind("text-lg")}>Add some notes reg this cat</Text>
              <TextInput onChangeText={val => setCatDescription(val)} maxLength={50} style={{ padding: 10 }} />
            </View>
            <View style={tailwind("items-center")}>
              <TouchableOpacity onPress={uploadCatDetails}>
                <View
                  style={tailwind(
                    `h-12 w-24 bg-yellow-400 rounded-sm flex mt-3 mb-6 flex-row justify-center items-center `
                  )}
                >
                  <View style={tailwind(`flex-1 flex items-center`)}>
                    <Text style={tailwind(`text-black text-base font-medium`)}>Upload</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
});
