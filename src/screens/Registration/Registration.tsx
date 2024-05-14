import { View } from "@/src/components/Themed";
import { router } from "expo-router";
import { Text } from "@gluestack-ui/themed";
import { Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, InputField } from "@gluestack-ui/themed";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input variant="outline" size="md">
            <InputField
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Input>
        )}
        name="firstName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input variant="outline" size="md">
            <InputField
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Input>
        )}
        name="lastName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input variant="outline" size="md">
            <InputField
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
          <Input variant="outline" size="md">
            <InputField
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Input>
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
