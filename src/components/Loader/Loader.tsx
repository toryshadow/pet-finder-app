import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "@/src/constants";

type BoxProps = {
  isLoading?: boolean;
  hideLoader?: boolean;
};

export const Loader: FC<BoxProps> = ({ isLoading, hideLoader }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      {!hideLoader && <ActivityIndicator color={Colors.tint} size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundTransparent,
  },
});
