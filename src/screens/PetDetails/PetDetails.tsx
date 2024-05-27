import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text } from "@gluestack-ui/themed";
import { AppContainer } from "@/src/components/AppContainer";
import { Colors } from "@/src/constants";
import { useEffect } from "react";
import { Avatar, Button, FormInput } from "@/src/components";
import { Loader } from "@/src/components/Loader";
import * as React from "react";
import { useFileUpload, usePickImage } from "@/src/hooks";
import { useMutation, useQuery } from "react-query";
import {
  GET_PET_ID,
  getPetById,
  meRequest,
  meUpdate,
  TFile,
  USER_KEY,
} from "@/src/api";
import { useForm } from "react-hook-form";
import { TUser } from "@/src/types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { TPet } from "@/src/types/pet";
import * as yup from "yup";

type PetDetailsProps = { petId: number };

const schema = yup
  .object({
    name: yup.string(),
  })
  .required();

export const PetDetails = ({ petId }: PetDetailsProps) => {
  const [image, pickImage] = usePickImage();
  const { data: pet, refetch } = useQuery([GET_PET_ID, petId], () =>
    getPetById(petId),
  );
  const { control, handleSubmit } = useForm<Partial<TPet>>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: pet?.name,
    },
  });

  const { mutate: updateUser } = useMutation(
    (data: Partial<TUser>) => meUpdate(data),
    {
      onSuccess: () => {
        Alert.alert("Success", "User was updated successfully");
        refetch();
      },
      onError: (error: Error) => {
        Alert.alert("Error", error.message || "Something went wrong");
      },
    },
  );

  const { onUploadFile, isLoading, data } = useFileUpload({
    onSuccess: (res) => {
      updateUser({ photo: res.file as TFile });
    },
  });
  const onSave = async (data: Partial<TPet>) => {};

  useEffect(() => {
    onUploadFile(image);
  }, [image]);

  return (
    <KeyboardAvoidingView style={styles.keyboardContainer} behavior="position">
      <ScrollView>
        <AppContainer style={styles.container}>
          <Text style={styles.title}>Edit profile</Text>
          <Button
            style={styles.avatar}
            onPress={() => pickImage()}
            disabled={isLoading}
          >
            <Avatar isLoading={false} image={pet?.photo?.path} size={78} />
          </Button>
          <FormInput
            control={control}
            name={"name"}
            title="First name"
            placeholder={"Enter your first name"}
          />

          <Button
            style={styles.footerTextButton}
            onPress={handleSubmit(onSave)}
          >
            <Text style={styles.footerTextButtonText}>Save</Text>
          </Button>

          <Loader isLoading={false} />
        </AppContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 32,
  },

  footerTextButton: {
    width: "100%",
    marginLeft: 5,
    backgroundColor: Colors.tint,
    padding: 15,
    marginTop: 20,
  },
  footerTextButtonText: {
    color: Colors.white,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  footerLogoutButton: {
    width: "100%",
    marginLeft: 5,
    backgroundColor: Colors.white,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.error,
    flexDirection: "row",
  },
  footerLogoutButtonText: {
    color: Colors.error,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  avatar: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 120,
  },
  saveButton: {
    width: "auto",
    marginBottom: 0,
    marginTop: 15,
    marginRight: 5,
  },
  keyboardContainer: {
    flex: 1,
    width: "100%",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.backgroundSelected,
    padding: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: "hidden",
  },
});
