import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/src/constants";

interface AvatarProps {
  image?: string;
  isLoading: boolean;
  size?: number;
  customIconSize?: number;
  customIcon?: keyof typeof AntDesign.glyphMap;
}

export const Avatar = ({
  image,
  isLoading,
  size = 60,
  customIcon,
  customIconSize,
}: AvatarProps) => {
  if (image) {
    return (
      <Image
        source={{ uri: image }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={[
        styles.image,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <AntDesign
        name={customIcon || "user"}
        size={customIconSize || size * 0.7}
        color={Colors.tint}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size={size <= 34 ? "small" : "large"}
            color={Colors.tintSecond}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundSelected,
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundTransparentWhite,
  },
});
