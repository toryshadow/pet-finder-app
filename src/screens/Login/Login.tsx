import { View } from "@/src/components/Themed";
import { useSession } from "@/src/context";
import { Button, ButtonText, Text, useToast } from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form";
import { Input, InputField } from "@gluestack-ui/themed";
import { loginRequest } from "@/src/api";
import { TLogin } from "@/src/types";
import { router } from "expo-router";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { ErrorToast } from "@/src/components";

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
      password: "secret",
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
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 15,
      }}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="md">
              <InputField
                autoCapitalize="none"
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input variant="outline" size="md" style={{ marginTop: 15 }}>
              <InputField
                autoCapitalize="none"
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="password"
        />
        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 15 }}
        >
          <ButtonText style={{ width: "100%", textAlign: "center" }}>
            LOGIN
          </ButtonText>
        </Button>
      </View>
      <View>
        <Button size="md" variant="link" action="secondary">
          <ButtonText>Register</ButtonText>
        </Button>
      </View>
    </View>
  );
};
