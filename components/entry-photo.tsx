import React from "react";

import { storage } from "~/core/storage";
import { Image } from "./ui/image";
import { View } from "react-native";
import { Pressable } from "react-native";
import { EntryOut } from "~/lib/plant_tracker/model";

type Props = {
  entry: EntryOut;
  height: string;
  width: string;
};

export const EntryPhoto = ({ entry, height, width }: Props) => {
  if (entry.photo) {
    const baseURL = storage.getString("base_url");
    return (
      <Image
        classNames={`object-cover h-${height} w-${width} flex-1`}
        source={{
          uri: baseURL + "/" + entry.photo,
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
