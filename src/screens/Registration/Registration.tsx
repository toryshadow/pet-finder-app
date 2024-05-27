import { View } from "@/src/components/Themed";
import { router } from "expo-router";
import { Text, useToast } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { Button, ErrorToast, FormInput } from "@/src/components";
import AppContainer from "../../components/AppContainer/AppContainer";
import { Colors } from "@/src/constants";
import * as React from "react";
import { useMutation } from "react-query";
import { registerRequest } from "@/src/api";
import { AxiosError } from "axios";
import { TRegister } from "@/src/types";
import { Loader } from "@/src/components/Loader";

export const Registration = () => {
  const toast = useToast();

  const { mutate: register, isLoading } = useMutation(
    ["register"],
    registerRequest,
    {
      onSuccess: () => {
        toast.show({
          placement: "top",
          render: () => (
            <ErrorToast
              type={"success"}
              title="Success"
              message={"You are successfully registered! Now you can login"}
            />
          ),
        });
        router.replace("/login");
      },
      onError: (error: AxiosError) => {
        toast.show({
          placement: "top",
          render: () => <ErrorToast title="Error" message={error.message} />,
        });
      },
    },
  );

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

  const onSubmit = (data: TRegister) => {
    register(data);
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
          autoCapitalize="none"
          placeholder={"Email"}
        />
        {errors.email && <Text>This is required.</Text>}

        <FormInput
          control={control}
          name={"password"}
          title="Password"
          autoCapitalize="none"
          secureTextEntry
          placeholder={"Password"}
        />
        {errors.password && <Text>This is required.</Text>}
        <Button onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Register</Text>
        </Button>
      </View>
      <Loader isLoading={isLoading} />
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
