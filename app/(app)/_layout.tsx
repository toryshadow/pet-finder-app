import { Stack } from "expo-router";
import { ROUTES } from "@/src/constants";
import { useSession } from "@/src/context";
import { Spinner } from "@gluestack-ui/themed";

export const unstable_settings = {
  initialRouteName: ROUTES.LOGIN,
};

export default function AppLayout() {
  const { isLoading } = useSession();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack>
      <Stack.Screen name={ROUTES.LOGIN} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.SIGN_IN} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.MAIN} options={{ headerShown: false }} />
    </Stack>
  );
}
