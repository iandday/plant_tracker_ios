import React, { useEffect, useState } from "react";
import PlantCount from "~/components/index/plantCount";
import { Text, View, SafeAreaView, TouchableOpacity } from "~/components/ui";
import { TokenType, getToken } from "~/core/auth/utils";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import {
  trackerApiViewPlantListPlants,
  useTrackerApiViewPlantListPlants,
  useTrackerApiViewUserMe,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { useIsFocused } from "@react-navigation/native";

const categories = [
  {
    name: "Plants",
    icon: "seedling",
    action: () => router.navigate("/my-plants"),
  },
  {
    name: "Entries",
    icon: "hand-holding-heart",
    action: () => router.navigate("/my-entries"),
  },
  {
    name: "Tasks",
    icon: "list",
    action: () => router.navigate("/"),
  },
  {
    name: "Graveyard",
    icon: "skull-crossbones",
    action: () => router.navigate("/my-graveyard"),
  },
];

export default function Index() {
  const [token, setToken] = useState<TokenType>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setToken(getToken());
  }, [isFocused]);

  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
  } = useTrackerApiViewPlantListPlants({ exclude_graveyard: true });
  const {
    isLoading: graveyardIsLoading,
    error: graveyardError,
    data: graveyardData,
  } = useTrackerApiViewPlantListPlants({
    exclude_graveyard: false,
    graveyard_only: true,
  });

  if (plantIsLoading || graveyardIsLoading) {
    return <Text>Loading</Text>;
  }

  if (plantData) {
    return (
      <SafeAreaView className='bg-background flex flex-1 flexfl-col items-stretch'>
        <View className='px-4 h-full'>
          {/* Header */}
          <View className='grow-0 h-600 '>
            <View className='flex flex-col m-5'>
              <Text className='my-3 text-center text-5xl font-bold pb-5'>{token?.first_name}'s Plants</Text>
              <PlantCount
                plantData={plantData}
                graveyardData={graveyardData}
              />
            </View>
          </View>
          {/* Content */}
          <View className='grow'>
            <Text>Content Here</Text>
          </View>
          {/* Footer */}
          <View className='grow-0 h-100 pb-5'>
            <View className='flex flex-row items-center justify-center'>
              {categories.map((item, index) => {
                return (
                  <View
                    className='bg-secondary rounded-full p-2 m-1'
                    key={index}
                  >
                    <TouchableOpacity
                      className='flex-1, items-center px-4'
                      onPress={item.action}
                    >
                      <FontAwesome6
                        name={item.icon}
                        size={24}
                        className='text-secondary-foreground py-1'
                      />
                      <Text className='text-secondary-foreground'>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
