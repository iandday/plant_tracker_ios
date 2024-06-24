import React from "react";

import type { PlantOut } from "~/api";
import { storage } from "~/core/storage";
import { Image } from "./ui/image";
import { View } from "react-native";
import { Pressable } from "react-native";

type Props = {
  plant: PlantOut;
};

export const PlantPhoto = ({ plant }: Props) => {
  const baseURL = storage.getString("base_url");

  if (plant.main_photo) {
    return (
      <Image
        className="w-full overflow-hidden rounded-t-xl"
        contentFit="contain"
        source={{
          uri: baseURL + "/" + plant.main_photo,
        }}
      />
    );
  } else {
    return (
      <View className="m-2  rounded-xl h-64 w-64 border border-border bg-background">
        <Image
          className="h-full w-full"
          contentFit="cover"
          source={require("../assets/images/alivePlant.png")}
        />
      </View>
    );
  }
};
