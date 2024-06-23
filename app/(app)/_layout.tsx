/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "~/core/auth";
import { useIsBaseURLSet } from "~/core/use-is-base-url-set";
import { Home } from "~/lib/icons/home";
import { Info } from "~/lib/icons/Info";

export default function TabLayout() {
  const status = useAuth.use.status();
  const [baseURL] = useIsBaseURLSet();

  if (status === "signOut") {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: () => <Home />,
            // headerRight: () => <CreateNewPostLink />,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            drawerIcon: () => <Info />,
            // headerRight: () => <CreateNewPostLink />,
          }}
        />
        {/* <Drawer.Screen
          name="my-plants"
          options={{
            title: 'My Plants',
            drawerIcon: ({ color }) => <Plant color={iconColor} />,
          }}
        />
        <Drawer.Screen
          name="style"
          options={{
            title: 'Style',
            //headerShown: false,
            //tabBarIcon: ({ color }) => <StyleIcon color={color} />,
            // tabBarTestID: 'style-tab',
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: ({ color }) => <Settings color={color} />,
          }}
        />*/}
      </Drawer>
    </>
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
