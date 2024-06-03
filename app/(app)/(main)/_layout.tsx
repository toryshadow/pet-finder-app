import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, View } from "react-native";
import { Text } from "@gluestack-ui/themed";

import { TabBarIcon } from "@/src/components";

import { Redirect } from "expo-router";
import { useSession } from "@/src/context";
import { Colors, ROUTES, ThemeColors } from "@/src/constants";
import { useClientOnlyValue } from "@/src/hooks/useClientOnlyValue";

export default function TabsLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ThemeColors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name={ROUTES.HOME}
        options={{
          title: "Dashboard",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={ThemeColors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.ADD_PET}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.push(ROUTES.MODAL);
          },
        })}
        options={{
          title: "Add",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: Colors.tint,
                padding: 20,
                borderRadius: 16,
                marginTop: -16,
              }}
            >
              <TabBarIcon name="plus" color={Colors.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.PROFILE}
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Link href="/edit-profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={ThemeColors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
