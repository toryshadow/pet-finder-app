import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "@/src/context";
import { AppContainer } from "@/src/components/AppContainer";
import { FormInput, Button, Avatar } from "@/src/components";
import { Colors } from "@/src/constants";
import { Loader } from "@/src/components/Loader";
import { useFileUpload, usePickImage } from "@/src/hooks";
import { useMutation, useQuery } from "react-query";
import { meRequest, meUpdate, TFile, USER_KEY } from "@/src/api";
import { TUser } from "@/src/types/user";
import { useEffect } from "react";

const schema = yup
  .object({
    email: yup
      .string()
      .email(
        "This email format is incorrect. Please double-check and try again",
      )
      .required(),
    firstName: yup.string(),
    lastName: yup.string(),
  })
  .required();

const EditProfile = () => {
  const { signOut } = useSession();
  const [image, pickImage] = usePickImage();
  const { data: me, refetch } = useQuery([USER_KEY], () => meRequest());
  const { control, handleSubmit } = useForm<
    Pick<TUser, "firstName" | "lastName" | "email">
  >({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: me?.firstName,
      lastName: me?.lastName,
      email: me?.email,
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

  const { onUploadFile, isLoading } = useFileUpload({
    onSuccess: (res) => {
      updateUser({ photo: res.file as TFile });
    },
  });

  const onSave = async (data: Partial<TUser>) => {
    const { firstName, lastName, email } = data;
    updateUser({
      firstName,
      lastName,
    });
  };

  useEffect(() => {
    onUploadFile(image);
  }, [image]);

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Yes",
        onPress: () => signOut(),
      },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

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
            <Avatar isLoading={false} image={me?.photo?.path} size={78} />
          </Button>
          <FormInput
            control={control}
            name={"firstName"}
            title="First name"
            placeholder={"Enter your first name"}
          />
          <FormInput
            control={control}
            name={"lastName"}
            title="Last name"
            placeholder={"Enter your last name"}
          />
          <FormInput
            control={control}
            name={"email"}
            title="Email"
            placeholder={"example@gmail.com"}
            textContentType={"emailAddress"}
          />

          <Button
            style={styles.footerTextButton}
            onPress={handleSubmit(onSave)}
          >
            <Text style={styles.footerTextButtonText}>Save</Text>
          </Button>

          <Button style={styles.footerLogoutButton} onPress={() => onLogout()}>
            <Ionicons
              name="exit-outline"
              size={24}
              color={Colors.error}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.footerLogoutButtonText}>Logout</Text>
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

export default EditProfile;
