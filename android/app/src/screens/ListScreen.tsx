import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { listenLugares } from "../services/lugaresService";
import { Lugar } from "../models/Lugar";

export default function ListScreen() {
  const navigation = useNavigation<any>();

  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenLugares(data => {
      setLugares(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const filtered = lugares.filter(l =>
    l.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* 🔍 Buscador */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "#ddd"
        }}
      >
        <TextInput
          placeholder="Buscar por nombre..."
          placeholderTextColor="#888"   
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            fontSize: 16,
            color: "#000"               
          }}
        />
      </View>

      {filtered.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No se encontraron resultados</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LugarDetail", { lugar: item })
              }
              style={{
                flexDirection: "row",
                padding: 12,
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "#eee"
              }}
            >
              {item.imagen_url ? (
                <Image
                  source={{ uri: item.imagen_url }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginRight: 12
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    backgroundColor: "#ddd",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12
                  }}
                >
                  <Text>📍</Text>
                </View>
              )}

              <Text style={{ fontSize: 16 }}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
