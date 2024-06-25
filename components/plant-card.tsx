import { Link } from "expo-router";
import React from "react";

import type { PlantOut } from "~/api";

import { Text, Image } from "./ui";
import { TouchableOpacity, View } from "react-native";

import { PlantPhoto } from "./plant-photo";
import { storage } from "~/core/storage";
type Props = {
  plant: PlantOut;
};

export const PlantCard = ({ plant }: Props) => {
  const baseURL = storage.getString("base_url");

  return (
    <Link href={`/plant/${plant.id}`} asChild>
      <TouchableOpacity>
        <View className="m-2 overflow-hidden items-center flex flex-col rounded-xl  border border-border bg-secondary text-secondary-foreground pt-2">
          <View className="h-48 w-48">
            <PlantPhoto plant={plant} height={"56"} width={"full"} />
          </View>

          <View>
            <Text className=" text-center text-2xl">{plant.name}</Text>
          </View>

          <View className="flex flex-row py-3">
            <Text className="text-secondary-foreground px-10">
              {plant.common_name}
            </Text>
            <Text className="text-secondary-foreground px-10">
              {plant.scientific_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
