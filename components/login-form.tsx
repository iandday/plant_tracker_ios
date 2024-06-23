import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ControlledInput } from "./ui/input";
import { View } from "react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

const schema = z.object({
  email: z.string({
    required_error: "Email is required",
  }),
  //.email('Invalid email format'),
  password: z.string({
    required_error: "Password is required",
  }),
  //.min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="justify-center p-4 pb-0 bg-background mb-0 m-4">
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        className="my-3"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
        className="my-3"
      />
      <Button
        variant="default"
        fullWidth={false}
        label="Login"
        onPress={handleSubmit(onSubmit)}
        className="mt-6"
      />
    </View>
  );
};
