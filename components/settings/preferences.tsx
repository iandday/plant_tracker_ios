import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/core/auth";
import { router } from "expo-router";
import { useTrackerApiViewUserMe } from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

export default function Preferences() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const signOut = useAuth.use.signOut();

  const {
    isLoading: userIsLoading,
    isError: userisError,
    error: userError,
    data: userData,
  } = useTrackerApiViewUserMe();

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  return (
    <ScrollView>
      <View className="px-6 bg-background border-x-0 border-y-4 border-border">
        <View className="py-4 flex-row align-items-starT justify-start">
          <Image
            alt=""
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
            }}
            className="ml-16 border-border border-x border-y rounded-full w-24 h-24"
          />

          <View className="flex-col px-3 justify-center">
            <Text className="text-foreground font-semibold text-lg">
              {userData?.first_name} {userData?.last_name}
            </Text>
            <Text className="text-foreground text-base font-normal">
              {userData?.email}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center ">
          <Button
            variant="default"
            fullWidth={false}
            label="Edit Profile"
            onPress={() => router.navigate("/profile")}
            className="mt-3 px-2 grow "
          />
          <Button
            variant="destructive"
            fullWidth={false}
            label="Logout"
            onPress={signOut}
            className="mt-3 px-2 grow"
          />
        </View>

        <View className="mt-12">
          <View className="bg-background pl-4 border-1">
            <View className="border-t-0 border-border pt-3">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row justify-items-stretch, h-84, py-3 pr-4"
              >
                <Text className="font-foreground font-semibold text-lg">
                  Dark Mode
                </Text>

                <View className="flex-grow flex-shrink" />
                <Switch
                  onValueChange={(value) => {
                    const newTheme = value ? "dark" : "light";
                    setColorScheme(newTheme);
                    setAndroidNavigationBar(newTheme);
                    AsyncStorage.setItem("theme", newTheme);
                  }}
                  style={{
                    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                  }}
                  value={isDarkColorScheme}
                />
              </TouchableOpacity>
            </View>

            <View className="border-t-1 border-border">
              <View className="flex-row justify-items-stretch, h-84, py-3 pr-4">
                <Text className="font-foreground font-semibold text-lg">
                  Email Notifications
                </Text>

                <View className="flex-grow flex-shrink" />

                <Switch
                  onValueChange={(emailNotifications) =>
                    setForm({ ...form, emailNotifications })
                  }
                  style={{
                    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                  }}
                  value={form.emailNotifications}
                />
              </View>
            </View>

            <View className="border-t-1 border-border">
              <View className="flex-row justify-items-stretch, h-84, py-3 pr-4">
                <Text className="font-foreground font-semibold text-lg">
                  Push Notifications
                </Text>

                <View className="flex-grow flex-shrink" />

                <Switch
                  onValueChange={(pushNotifications) =>
                    setForm({ ...form, pushNotifications })
                  }
                  style={{
                    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                  }}
                  value={form.pushNotifications}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="mt-12">
          <Text className="mt-0 mh-24 mb-3 uppercase tracking-wider text-muted-foreground text-xl font-semibold">
            Resources
          </Text>

          <View className="bg-background pl-4 border-1">
            <View className="border-border border-y-1border-t-0">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row justify-items-stretch, h-84, py-3 pr-4"
              >
                <Text className="font-foreground font-semibold text-lg">
                  Contact Us
                </Text>

                <View className="flex-grow flex-shrink" />

                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>

            <View className="border-border border-y-1 ">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row justify-items-stretch, h-84, py-3 pr-4"
              >
                <Text className="font-foreground font-semibold text-lg">
                  Report Bug
                </Text>

                <View className="flex-grow flex-shrink" />

                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>

            <View className="border-border border-y-1 ">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row justify-items-stretch, h-84, py-3 pr-4"
              >
                <Text className="font-foreground font-semibold text-lg">
                  Rate in App Store
                </Text>

                <View className="flex-grow flex-shrink" />

                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>

            <View className="border-border border-y-1 ">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row justify-items-stretch, h-84, py-3 pr-4"
              >
                <Text className="font-foreground font-semibold text-lg">
                  Terms and Privacy
                </Text>

                <View className="flex-grow flex-shrink" />

                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
