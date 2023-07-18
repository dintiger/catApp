import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function useGetCamera () {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if(permission && permission.granted){
      return
    }

    if(!permission || !permission.granted){
      requestPermission()
      return
    }
  },[permission])
  
    return {
      canUseCamera: permission && permission.granted
    };
  }
  