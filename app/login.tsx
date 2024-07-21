import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useAuth } from "~/core/auth";
import { useIsBaseURLSet } from "~/core/use-is-base-url-set";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { LoginForm, LoginFormProps } from "~/components/login-form";
import { Button, CustomBackdrop, Text } from "~/components/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useTrackerApiViewUserNewToken } from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

export default function login() {
  const signIn = useAuth.use.signIn();
  const [baseURL, setBaseURL] = useIsBaseURLSet();
  const router = useRouter();
  const [loginError, setLoginError] = useState<String>();

  const {
    mutate: loginMutate,
    isSuccess: loginMutateIsSuccess,
    error: loginMutateError,
    reset: loginMutateReset,
    data: loginData,
  } = useTrackerApiViewUserNewToken();

  const onSubmit: LoginFormProps["onSubmit"] = async (data) => {
    setLoginError(``);
    loginMutate(
      {
        data: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess(data) {
          const { access, refresh, user } = data;
          signIn({
            access: access,
            refresh: refresh,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
          router.push("/");
        },
        onError: (err) => {
          if (err.code === "401") {
            setLoginError("Incorrect credentials, try again");
          } else {
            setLoginError(`Failed to login: ${err}`);
          }
        },
      }
    );
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%", "40%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  React.useEffect(() => {
    if (!baseURL) {
      bottomSheetModalRef.current?.present();
    }
  }, []);

  return (
    <KeyboardAwareScrollView className='bg-background, flex-1 pb-10'>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={CustomBackdrop}
      >
        <BottomSheetView className='bg-background flex-1 mb-10 pb-10'>
          <Text className='my-6 text-center text-5xl font-bold'>Plant Tracker</Text>
          <Text className='mb-2 text-center text-xl'>Who can remember when you watered it last?</Text>

          <Text className='my-1 pt-6 text-center text-lg'>Set your server's base URL below</Text>

          <BottomSheetTextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='https://plant.mydomain.com'
            onChange={(value) => setBaseURL(value.nativeEvent.text)}
            className={
              "placeholder:text-primary mx-10 mt-0 rounded-xl border-[0.5px] px-4 py-3   bg-input text:foreground dark:text-foreground"
            }
          />

          <Button
            label="Let's Get Started "
            onPress={() => {
              router.replace("/login");
            }}
            variant='default'
            fullWidth={false}
            size='lg'
            className='m-5 '
          />
        </BottomSheetView>
      </BottomSheetModal>

      <KeyboardAwareScrollView className='flex flex-col'>
        <Text className='text-5xl font-bold mb-6 pt-48 text-center'>Welcome Back!</Text>
        <Text className='text-xl font-medium  text-center py-4'>Sign in to your account at</Text>
        <Text className='text-xl font-medium mb-6 text-center'>{baseURL}</Text>
        <LoginForm onSubmit={onSubmit} />

        <Button
          variant='default'
          fullWidth={false}
          label='Change Server'
          onPress={() => {
            bottomSheetModalRef.current?.present();
          }}
          className='mx-7'
        />
        {loginError && loginError.length > 0 && (
          <Text className='my-1 pt-6 text-center text-2xl text-destructive'>{loginError}</Text>
        )}
      </KeyboardAwareScrollView>
    </KeyboardAwareScrollView>
  );
}
