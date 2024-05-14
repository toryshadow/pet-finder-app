import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { SessionProvider } from "@/src/context";
import { ROUTES } from "@/src/constants";
import { useColorScheme } from "react-native";
import { config } from "@gluestack-ui/config";
import { QueryClient, QueryClientProvider } from "react-query"; // Optional if you want to use default theme

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: ROUTES.APP,
};

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();

  // Expo Router uses ErrorToast Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Stack>
              <Stack.Screen
                name={ROUTES.APP}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ROUTES.MODAL}
                options={{ presentation: "modal" }}
              />
            </Stack>
          </SessionProvider>
        </QueryClientProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
