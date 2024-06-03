import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed";

import { View } from "@/src/components/Themed";
import { PetDetails } from "@/src/screens";

const ModalScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <PetDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default ModalScreen;
