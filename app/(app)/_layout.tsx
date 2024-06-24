/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { useAuth } from "~/core/auth";
import { useIsBaseURLSet } from "~/core/use-is-base-url-set";
import { Home } from "~/lib/icons/home";
import { Info } from "~/lib/icons/Info";
import { Flower2 } from "~/lib/icons/Flower2";

export default function TabLayout() {
  const status = useAuth.use.status();
  const [baseURL] = useIsBaseURLSet();

  if (status === "signOut") {
    return <Redirect href="/login" />;
  }
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => <Home color={color} />,
          // headerRight: () => <CreateNewPostLink />,
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
      <Drawer.Screen
        name="my-plants"
        options={{
          title: "My Plants",
          drawerIcon: ({ color }) => <Flower2 color={color} />,
        }}
      />
    </Drawer>
  );
}

{
  /* const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
}; */
}
