import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import { UserApi } from "~/api";
import { useAuth } from "~/core/auth";
import { useIsBaseURLSet } from "~/core/use-is-base-url-set";
import axiosInstance from "~/provider/custom-axios";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { LoginForm, LoginFormProps } from "~/components/login-form";
import { Button, Text } from "~/components/ui";

import colors from "tailwindcss/colors";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "000000",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} className="bg-background" />;
};

export default function login() {
  const signIn = useAuth.use.signIn();
  const [baseURL, setBaseURL] = useIsBaseURLSet();
  const router = useRouter();

  const onSubmit: LoginFormProps["onSubmit"] = async (data) => {
    try {
      const api = new UserApi(undefined, undefined, axiosInstance);
      const response = await api.trackerApiViewUserNewToken({
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        const { access, refresh, user } = response.data;
        signIn({
          access: access,
          refresh: refresh,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
        router.push("/");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["40%", "40%"], []);

  // callbacks

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  React.useEffect(() => {
    if (!baseURL) {
      bottomSheetModalRef.current?.present();
    }
  }, []);

  return (
    <SafeAreaView className="bg-background, flex-1">
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={CustomBackdrop}
        >
          <BottomSheetView className="bg-background">
            <Text className="my-6 text-center text-5xl font-bold">
              Plant Tracker
            </Text>
            <Text className="mb-2 text-center text-xl">
              Who can remember when you watered it last?
            </Text>

            <Text className="my-1 pt-6 text-center text-lg">
              Set your server's base URL below
            </Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="https://plant.mydomain.com"
              onChange={(value) => setBaseURL(value.nativeEvent.text)}
              className={
                "placeholder:text-primary mx-10 mt-0 rounded-xl border-[0.5px] px-4 py-3 text-foreground bg-input"
              }
            />

            <Button
              label="Let's Get Started "
              onPress={() => {
                router.replace("/login");
              }}
              variant="default"
              fullWidth={false}
              size="lg"
              className="mx-20 my-10"
            />
          </BottomSheetView>
        </BottomSheetModal>

        <View className="flex flex-col">
          <Text className="text-5xl font-bold mb-6 pt-48 text-center">
            Welcome Back!
          </Text>
          <Text className="text-xl font-medium mb-6 text-center py-4">
            Sign in to your account at {baseURL}
          </Text>
          <LoginForm onSubmit={onSubmit} />

          <Button
            variant="default"
            fullWidth={false}
            label="Change Server"
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}
            className="mx-7"
          />
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
