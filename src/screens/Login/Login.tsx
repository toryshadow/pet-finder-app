import { useSession } from "@/src/context";
import { Text, useToast } from "@gluestack-ui/themed";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { loginRequest } from "@/src/api";
import { TLogin } from "@/src/types";
import { router } from "expo-router";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { ErrorToast, FormInput, Button } from "@/src/components";
import { Colors } from "@/src/constants";

export const Login = () => {
  const { signIn } = useSession();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "test1@example.com",
      password: "string",
    },
  });

  const { mutate: login } = useMutation(["login"], loginRequest, {
    onSuccess: (response) => {
      if (response.token) {
        signIn(response.token);
        router.replace("/home");
      }
    },
    onError: (error: AxiosError) => {
      toast.show({
        placement: "top",
        render: () => <ErrorToast title="Error" message={error.message} />,
      });
    },
  });

  const onSubmit = (loginData: TLogin) => {
    login(loginData);
  };

  return (
    <>
      <FormInput
        control={control}
        name={"email"}
        title="Email"
        keyboardType="email-address"
        placeholder={"example@gmail.com"}
        textContentType={"emailAddress"}
      />
      <FormInput
        control={control}
        name={"password"}
        title="Password"
        placeholder={"Enter password"}
        textContentType={"password"}
        // secureTextEntry
        onSubmit={handleSubmit(onSubmit)}
      />
      <Button onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Button>
      <Button
        style={styles.forgotButton}
        onPress={() => router.navigate("sign-in")}
      >
        <Text style={styles.forgotText}>Forgot password ?</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: Colors.tint,
    padding: 15,
  },
  loginButtonText: {
    color: Colors.white,
  },
  forgotButton: {
    width: "auto",
    padding: 0,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  forgotText: {
    color: Colors.error,
    fontFamily: "lato-bold",
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
});
