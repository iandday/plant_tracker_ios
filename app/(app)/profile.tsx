import { useEffect, useState } from "react";
import { Button, ControlledInput, Text } from "~/components/ui";
import { SafeAreaView, View } from "react-native";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { Background } from "~/components/background";
import {
  useTrackerApiViewUserMe,
  useTrackerApiViewUserUpdateMe,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { getToken } from "~/core/auth/utils";
import { signIn } from "~/core/auth";

const schema = z.object({
  first_name: z.string({ required_error: "First name is required" }),
  last_name: z.string({ required_error: "Last name is required" }),
  email: z.string({ required_error: "Email is required" }),
});
type FormType = z.infer<typeof schema>;

export default function Profile() {
  const router = useRouter();
  const {
    isError: responseIsError,
    error: responseError,
    data: response,
    mutate: mutate,
    isSuccess: isSuccess,
  } = useTrackerApiViewUserUpdateMe();
  const {
    isLoading: profileIsLoading,
    isError: profileisError,
    error: profileError,
    data: profile,
  } = useTrackerApiViewUserMe();

  const { handleSubmit, control, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      email: profile?.email,
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (formData: FormType) => {
    mutate({ data: formData });
    if (isSuccess) {
      const token = getToken();
      signIn({
        access: token.access,
        refresh: token.refresh,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      });
      router.push(`/settings`);
    }
  };

  // populate form when data is available
  useEffect(() => {
    reset(profile);
  }, [profile]);

  if (profileIsLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView className="flex-1 flex-col">
      <Background>
        <Stack.Screen
          options={{
            title: "Edit Profile",
            headerBackTitle: "Settings",
          }}
        />

        <View className=" p-4">
          <ControlledInput
            control={control}
            name="first_name"
            label="First Name"
          />
          <ControlledInput
            control={control}
            name="last_name"
            label="Last Name"
          />
          <ControlledInput control={control} name="email" label="Email" />

          <Button label="Save" onPress={handleSubmit(onSubmit)} />
        </View>
      </Background>
    </SafeAreaView>
  );
}
