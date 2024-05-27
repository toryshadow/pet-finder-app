import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useMutation } from "react-query";
import { TFile, uploadFile } from "@/src/api";

export const useFileUpload = ({
  onSuccess,
}: {
  onSuccess?: (data: { file: TFile }) => void;
}) => {
  const {
    mutate: upload,
    data,
    isLoading,
  } = useMutation(uploadFile, { onSuccess: onSuccess });

  const onUploadFile = async (path: string): Promise<void> => {
    const name = path.split("/").reverse()[0];
    if (!FileSystem.documentDirectory || !path) return;

    const formData = new FormData();

    const resizedPhoto = await manipulateAsync(
      path,
      [{ resize: { width: 600 } }],
      { compress: 0.8, format: SaveFormat.JPEG },
    );

    formData.append("file", {
      type: "image/jpeg",
      name: name,
      uri: resizedPhoto.uri,
    } as unknown as Blob);

    return upload(formData);
  };

  return { onUploadFile, isLoading, data };
};
