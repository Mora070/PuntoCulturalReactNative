import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./android/app/src/navigation/BottomTabs";
import LugarDetailScreen from "./android/app/src/screens/LugarDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tabs */}
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        {/* Detalle */}
        <Stack.Screen
          name="LugarDetail"
          component={LugarDetailScreen}
          options={{ title: "Detalle del lugar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
