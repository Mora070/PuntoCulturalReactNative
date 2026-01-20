import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ListScreen from "../screens/ListScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // 👈 quita "Inicio"
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Mapa") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Lista") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Lista" component={ListScreen} />
    </Tab.Navigator>
  );
}
