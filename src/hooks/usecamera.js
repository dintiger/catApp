import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';

export default function useGetCamera () {
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
  