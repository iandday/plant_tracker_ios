import { Link } from "expo-router";
import React from "react";

import type { PlantOut } from "~/api";

import { Text } from "./ui/text";
import { TouchableOpacity, View } from "react-native";

import { PlantPhoto } from "./plant-photo";
type Props = {
  plant: PlantOut;
};

export const PlantCard = ({ plant }: Props) => {
  return (
    <Link href={`/plant/${plant.id}`} asChild>
      <TouchableOpacity>
        <View className="m-2 overflow-hidden flex flex-col rounded-xl  border border-border bg-secondary text-secondary-foreground">
          <View className="p-2 flex flex-row items-center justify-center">
            <PlantPhoto plant={plant} />
          </View>

          <View>
            <Text className="py-3 text-center text-2xl">{plant.name}</Text>
          </View>
          <View className="flex flex-row justify-between p-4">
            <Text className="text-secondary-foreground leading-snug">
              {plant.common_name}
            </Text>
            <Text className="text-secondary-foreground leading-snug">
              {plant.scientific_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
