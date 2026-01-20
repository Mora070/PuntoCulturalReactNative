import notifee, { AndroidImportance } from "@notifee/react-native";

export async function notifyNearby(lugar: { id: string; nombre: string; lat: number; lng: number }) {
  const channelId = await notifee.createChannel({
    id: "puntocultural",
    name: "PuntoCultural",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: "Estás cerca de un lugar cultural",
    body: `Te encuentras cerca de ${lugar.nombre}`,
    data: {
      lugarId: lugar.id,
      lat: String(lugar.lat),
      lng: String(lugar.lng)
    },
    android: {
      channelId,
      smallIcon: "ic_launcher",
      pressAction: {
        id: "open_map"
      }
    }
  });
}
