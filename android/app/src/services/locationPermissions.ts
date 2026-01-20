import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform } from "react-native";

export async function requestLocationPermissions() {
  if (Platform.OS === "android") {
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

    const background = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

    return background === RESULTS.GRANTED;
  }
}
