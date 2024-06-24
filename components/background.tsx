import React from "react";
import { View } from "react-native";

export const Background = ({ children }: { children: React.ReactNode }) => {
  return <View className="bg-background flex-1 px-4">{children}</View>;
};
