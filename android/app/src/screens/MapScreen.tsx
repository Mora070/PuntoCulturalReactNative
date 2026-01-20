import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation, useRoute } from "@react-navigation/native";

import { getDistanceMeters } from "../utils/distance";
import { notifyNearby } from "../services/notificationService";
import { requestLocationPermissions } from "../services/locationPermissions";
import { enableGPS } from "../services/gpsService";
import { listenLugares } from "../services/lugaresService";
import { Lugar } from "../models/Lugar";
import { styles } from "./MapScreen.styles";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const notifiedRef = useRef<Set<string>>(new Set());
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const highlightedId = route.params?.highlightedLugarId;
  const highlightLat = route.params?.lat;
  const highlightLng = route.params?.lng;

  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedLugar, setSelectedLugar] = useState<Lugar | null>(null);

  const defaultCenter = {
    latitude: 5.535,
    longitude: -73.367
  };

  // 🔹 Inicialización GPS + Firestore + Geofencing
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let watchId: number;

    const init = async () => {
      await requestLocationPermissions();
      await enableGPS();
      unsubscribe = listenLugares(setLugares);

      watchId = Geolocation.watchPosition(
        pos => {
          const currentLat = pos.coords.latitude;
          const currentLng = pos.coords.longitude;

          setUserLocation({ latitude: currentLat, longitude: currentLng });

          // 🔔 Geofencing con anti-spam
          lugares.forEach(lugar => {
            const d = getDistanceMeters(
              currentLat,
              currentLng,
              lugar.latitud,
              lugar.longitud
            );

            if (d < 200 && !notifiedRef.current.has(lugar.id)) {
              notifyNearby({
                id: lugar.id,
                nombre: lugar.nombre,
                lat: lugar.latitud,
                lng: lugar.longitud
              });
              notifiedRef.current.add(lugar.id);
            }

            if (d > 300) {
              notifiedRef.current.delete(lugar.id);
            }
          });
        },
        err => console.log("GPS error:", err),
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000
        }
      );
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
      if (watchId !== undefined) Geolocation.clearWatch(watchId);
    };
  }, [lugares]);

  // 🔹 Centrar mapa en usuario
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
    }
  }, [userLocation]);

  // 🔥 Zoom cuando viene desde LugarDetail
  useEffect(() => {
    if (highlightLat && highlightLng && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.animateToRegion(
          {
            latitude: highlightLat,
            longitude: highlightLng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          },
          800
        );
      }, 500);
    }
  }, [highlightLat, highlightLng]);

  const centerOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
    }
  };

  const goToDetails = () => {
    if (!selectedLugar) return;
    setSelectedLugar(null);
    navigation.navigate("LugarDetail", { lugar: selectedLugar });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: userLocation?.latitude || defaultCenter.latitude,
          longitude: userLocation?.longitude || defaultCenter.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {lugares.map(lugar => (
          <Marker
            key={lugar.id}
            pinColor={lugar.id === highlightedId ? "blue" : "red"}
            coordinate={{
              latitude: lugar.latitud,
              longitude: lugar.longitud
            }}
            onPress={() => setSelectedLugar(lugar)}
          />
        ))}
      </MapView>

      {/* Botón centrar */}
      <TouchableOpacity style={styles.centerBtn} onPress={centerOnUser}>
        <Text style={{ color: "white", fontSize: 18 }}>📍</Text>
      </TouchableOpacity>

      {/* BottomSheet */}
      <Modal visible={!!selectedLugar} transparent animationType="slide">
        {selectedLugar && (
          <View style={styles.modal}>
            <Text style={styles.title}>{selectedLugar.nombre}</Text>

            {selectedLugar.imagen_url ? (
              <Image source={{ uri: selectedLugar.imagen_url }} style={styles.image} />
            ) : (
              <View style={styles.noImage}>
                <Text>Sin imagen</Text>
              </View>
            )}

            <Text numberOfLines={2}>{selectedLugar.descripcion}</Text>

            <TouchableOpacity style={styles.button} onPress={goToDetails}>
              <Text style={{ color: "white" }}>Ver más detalles</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedLugar(null)}>
              <Text style={{ marginTop: 10, textAlign: "center" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}
