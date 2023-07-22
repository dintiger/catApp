import { useEffect, useState } from "react";

import * as Location from "expo-location";

export function useGetLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setIsLoading(false)
    })();
  }, []);

  return {
    location: location,
    isError: !!errorMsg,
    isLoading: isLoading
  };
}
