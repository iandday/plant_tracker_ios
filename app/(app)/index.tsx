import React, { useEffect, useState } from "react";
import { AreaApi, AreaOut, PlantApi, PlantOut } from "~/api";
import PlantCount from "~/components/index/plantCount";
import { Text, View, SafeAreaView, TouchableOpacity } from "~/components/ui";
import { getToken } from "~/core/auth/utils";
import axiosInstance from "~/provider/custom-axios";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

const categories = [
  {
    name: "Plants",
    icon: "seedling",
    action: () => router.navigate("/my-plants"),
  },
  {
    name: "Entries",
    icon: "hand-holding-heart",
    action: () => router.navigate("/my-plants"),
  },
  {
    name: "Tasks",
    icon: "list",
    action: () => router.navigate("/my-plants"),
  },
  {
    name: "Graveyard",
    icon: "skull-crossbones",
    action: () => router.navigate("/my-plants"),
  },
];

export default function Index() {
  const token = getToken();

  const [areaData, setAreaData] = useState<AreaOut[]>([]);
  const [plantData, setPlantData] = useState<PlantOut[]>([]);
  const [graveyardData, setGraveyardData] = useState<PlantOut[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  cssInterop(FontAwesome6, {
    className: {
      target: "style",
      nativeStyleToProp: { height: true, width: true, size: true },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, undefined, axiosInstance);
      const areaApi = new AreaApi(undefined, undefined, axiosInstance);
      // get alive plants
      try {
        const response = await api.trackerApiViewPlantListPlants(true, false);
        if (response.status === 200) {
          setPlantData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get graveyard
      try {
        const response = await api.trackerApiViewPlantListPlants(false, true);
        if (response.status === 200) {
          setGraveyardData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get area data
      try {
        const areaResponse = await areaApi.trackerApiViewAreaListAreas();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView className="bg-background flex flex-1 flex-col items-stretch p-5 m-5">
      {/* Header */}
      <View className="grow-0 h-600 ">
        <View className="flex flex-col m-5">
          <Text className="my-3 text-center text-5xl font-bold pb-5">
            {token?.first_name}'s Plants
          </Text>
          <PlantCount plantData={plantData} graveyardData={graveyardData} />
        </View>
      </View>
      {/* Content */}
      <View className="grow">
        <Text>Content Here</Text>
      </View>
      {/* Footer */}
      <View className="grow-0">
        <View className="flex flex-row items-center justify-center">
          {categories.map((item, index) => {
            return (
              <View className="bg-secondary rounded-full p-2 m-1">
                <TouchableOpacity
                  className="flex-1, items-center px-4"
                  key={item.name}
                  onPress={item.action}
                >
                  <FontAwesome6
                    name={item.icon}
                    size={24}
                    className="text-secondary-foreground"
                  />
                  <Text className="text-secondary-foreground">{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
