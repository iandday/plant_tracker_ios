import React from "react";

import type { PlantOut } from "~/api";
import { storage } from "~/core/storage";
import { Image } from "./ui/image";
import { View } from "react-native";
import { Pressable } from "react-native";

type Props = {
  plant: PlantOut;
  height: string;
  width: string;
};

export const PlantPhoto = ({ plant, height, width }: Props) => {
  if (plant.main_photo) {
    const baseURL = storage.getString("base_url");
    return (
      <Image
        classNames={`object-cover h-${height} w-${width} flex-1`}
        source={{
          uri: baseURL + "/" + plant.main_photo,
        }}
      />
    );
  } else {
    return (
      <Image
        classNames={`object-cover h-${height} w-${width} flex-1`}
        source={require("../assets/images/alivePlant.png")}
      />
    );
  }
};
