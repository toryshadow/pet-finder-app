import { FC, useEffect } from "react";
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
import Feather from "@expo/vector-icons/Feather";
import { Text } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "@/src/context";
import { useQuery } from "react-query";
import { meRequest, USER_KEY } from "@/src/api";
import { AppContainer } from "@/src/components/AppContainer";
import { ErrorToast, FormInput, Button } from "@/src/components";
import { Colors } from "@/src/constants";
import { Loader } from "@/src/components/Loader";

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
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { signOut } = useSession();
  const { data } = useQuery([USER_KEY], meRequest);

  const onSave = async (values: {}) => {
    console.log(values);
  };

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
          <Button style={styles.avatar} onPress={() => {}}>
            <Feather
              name="edit-2"
              size={24}
              color={Colors.tint}
              style={styles.editIcon}
            />
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
            onPress={() => console.log("Change password")}
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
    fontFamily: "playfair-bold",
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
    fontFamily: "lato-bold",
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
    fontFamily: "lato-bold",
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
