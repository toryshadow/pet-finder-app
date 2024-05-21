import { View } from "@/src/components/Themed";
import { router } from "expo-router";
import { Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, InputField } from "@gluestack-ui/themed";
import { Button, FormInput } from "@/src/components";
import AppContainer from "../../components/AppContainer/AppContainer";
import { Colors } from "@/src/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";

export const Registration = () => {
  // const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // signIn();
    router.replace("/home");
  };

  return (
    <AppContainer style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          paddingVertical: 130,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <FormInput
          control={control}
          name={"firstName"}
          title="First name"
          placeholder={"First name"}
        />
        <FormInput
          control={control}
          name={"lastName"}
          title="Last name"
          placeholder={"Last name"}
        />
        <FormInput
          control={control}
          name={"email"}
          title="Email"
          placeholder={"Email"}
        />
        {errors.email && <Text>This is required.</Text>}

        <FormInput
          control={control}
          name={"password"}
          title="Password"
          placeholder={"Password"}
        />

        <Button onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Register</Text>
        </Button>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    backgroundColor: Colors.white,
  },
  loginButton: {
    backgroundColor: Colors.tint,
    padding: 15,
  },
  loginButtonText: {
    color: Colors.white,
  },
});
