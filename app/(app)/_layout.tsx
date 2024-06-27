/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { useAuth } from "~/core/auth";
import { useIsBaseURLSet } from "~/core/use-is-base-url-set";
import { Home } from "~/lib/icons/home";
import { Info } from "~/lib/icons/Info";
import { Flower2 } from "~/lib/icons/Flower2";
import { Pressable } from "react-native";
import { Text } from "~/components/ui";
import { New } from "~/lib/icons/New";

export default function TabLayout() {
  const status = useAuth.use.status();
  const [baseURL] = useIsBaseURLSet();

  const CreateNewPlant = () => {
    return (
      <Link href="/plant/new" asChild>
        <Pressable>
          <New className="text-primary" />
        </Pressable>
      </Link>
    );
  };

  if (status === "signOut") {
    return <Redirect href="/login" />;
  }
  return (
    <Drawer
      screenOptions={{
        headerTintColor: "#59a188",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => <Home color={color} />,
          // headerRight: () => <CreateNewPostLink />,
        }}
      />

      <Drawer.Screen
        name="my-plants"
        options={{
          title: "My Plants",
          drawerIcon: ({ color }) => <Flower2 color={color} />,
          headerRight: () => <CreateNewPlant />,
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (event) => {
              console.log(event.nativeEvent.text);
            },
          },
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color }) => <Info color={color} />,
          // headerRight: () => <CreateNewPostLink />,
        }}
      />
    </Drawer>
  );
}
