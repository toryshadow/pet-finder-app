import { Stack } from "expo-router";
import { ROUTES } from "@/src/constants";
import { useSession } from "@/src/context";
import { Spinner } from "@gluestack-ui/themed";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const unstable_settings = {
  initialRouteName: ROUTES.LOGIN,
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  headerTitleAlign: "center", // this centers the title
  headerTintColor: "#000", // this makes all the header element color green including - back button
  headerBackTitle: "Back",
  headerTitleStyle: {
    color: "#000", // this resets color back to "black" from "green" .... from above tint statement
  },
};

export default function AppLayout() {
  const { isLoading } = useSession();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.LOGIN} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.SIGN_IN}
        options={{
          headerShown: true,
          title: "Registration",
        }}
      />
      <Stack.Screen name={ROUTES.MAIN} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        options={{ headerShown: true, title: "Edit profile" }}
      />
    </Stack>
  );
}
