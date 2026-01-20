import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Lugar } from "../models/Lugar";

export default function LugarDetailScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const { lugar }: { lugar: Lugar } = route.params;

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            {lugar.imagen_url && (
                <Image
                    source={{ uri: lugar.imagen_url }}
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 12,
                        marginBottom: 16
                    }}
                    resizeMode="cover"
                />
            )}

            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
                {lugar.nombre}
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 16 }}>
                {lugar.descripcion}
            </Text>

            {lugar.direccion && (
                <>
                    <Text style={{ fontWeight: "bold" }}>Dirección:</Text>
                    <Text>{lugar.direccion}</Text>
                </>
            )}

            {lugar.horario && (
                <>
                    <Text style={{ fontWeight: "bold", marginTop: 8 }}>Horario:</Text>
                    <Text>{lugar.horario}</Text>
                </>
            )}

            {lugar.categoria && (
                <>
                    <Text style={{ fontWeight: "bold", marginTop: 8 }}>Categoría:</Text>
                    <Text>{lugar.categoria}</Text>
                </>
            )}

            {lugar.sitio_web && (
                <>
                    <Text style={{ fontWeight: "bold", marginTop: 8 }}>Sitio web:</Text>
                    <Text>{lugar.sitio_web}</Text>
                </>
            )}

            <TouchableOpacity
                style={{
                    marginTop: 24,
                    backgroundColor: "#6B4EFF",
                    padding: 14,
                    borderRadius: 10,
                    alignItems: "center"
                }}
                onPress={() =>
                    navigation.navigate("Tabs", {
                        screen: "Mapa",
                        params: {
                            highlightedLugarId: lugar.id,
                            lat: lugar.latitud,
                            lng: lugar.longitud
                        }
                    })
                }
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Ver en mapa
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
