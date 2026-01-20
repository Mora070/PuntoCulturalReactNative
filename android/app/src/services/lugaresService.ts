import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../main/Config/firebase";
import { Lugar } from "../models/Lugar";

export function listenLugares(callback: (lugares: Lugar[]) => void) {
  return onSnapshot(collection(db, "lugares"), snapshot => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Lugar[];
    callback(data);
  });
}
