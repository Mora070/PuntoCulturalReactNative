import { promptForEnableLocationIfNeeded } from "react-native-android-location-enabler";

export async function enableGPS() {
  try {
    await promptForEnableLocationIfNeeded({
      interval: 10000
    });
  } catch (e) {
    console.log("GPS not enabled", e);
  }
}
