import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useState } from "react";

export const usePickImage = (width?: number): [string, () => Promise<void>] => {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (result && !result.canceled) {
      const res = await manipulateAsync(
        result?.assets[0].uri,
        [{ resize: { width: width || 700 } }],
        { compress: 0.8, format: SaveFormat.JPEG },
      );

      setImage(res.uri || "");
    }
  };

  return [image, pickImage];
};
