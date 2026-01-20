import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },

  map: { 
    flex: 1 
  },

  centerBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 30
  },

  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "bold"
  },

  image: {
    width: "100%",
    height: 150,
    marginVertical: 10
  },

  noImage: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    marginVertical: 10
  },

  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center"
  }
});
