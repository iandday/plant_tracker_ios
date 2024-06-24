import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";

import type { ActivityOut, AreaOut, EntryOut, PlantOut } from "~/api";
import { ActivityApi, AreaApi, EntryApi, PlantApi } from "~/api";
import { Background } from "~/components/background";
import ActivityList from "~/components/plant-detail/activity-list";
import PlantInfo from "~/components/plant-detail/plantInfo";
import { PlantPhoto } from "~/components/plant-photo";
import axiosInstance from "~/provider/custom-axios";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

/* eslint-disable max-lines-per-function */
export default function Plant() {
  const local = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [areaData, setAreaData] = useState<AreaOut>();
  const [plantData, setPlantData] = useState<PlantOut>();
  const [entryData, setEntryData] = useState<EntryOut[]>();
  const [activityData, setActivityData] = useState<ActivityOut[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, undefined, axiosInstance);
      const areaApi = new AreaApi(undefined, undefined, axiosInstance);
      const activityApi = new ActivityApi(undefined, undefined, axiosInstance);
      const entryApi = new EntryApi(undefined, undefined, axiosInstance);

      try {
        const response = await api.trackerApiViewPlantGetPlant(local.id!);
        if (response.status === 200) {
          setPlantData(response.data);
        }
        const areaResponse = await areaApi.trackerApiViewAreaGetArea(
          response.data.area
        );
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
        const entryResponse = await entryApi.trackerApiViewEntryGetPlantEntries(
          response.data.id!
        );
        if (entryResponse.status === 200) {
          setEntryData(entryResponse.data);
        }
        const activityResponse =
          await activityApi.trackerApiViewActivityListActivities();
        if (activityResponse.status === 200) {
          setActivityData(activityResponse.data);
        }
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {
        console.error(err);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [local.id]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (plantData && areaData) {
    return (
      <Background>
        <Stack.Screen
          options={{ title: plantData.name, headerBackTitle: "All Plants" }}
        />

        <View className="height-200 flex w-full flex-row justify-around pt-2">
          <View className="m-2">
            <PlantInfo plantData={plantData} areaData={areaData} />
          </View>
          <View className="m-2">
            <PlantPhoto plant={plantData} />
          </View>
        </View>

        <View className="pt-2">
          <Button
            label="Edit Plant"
            onPress={() => {
              router.navigate({
                pathname: `/plant/edit`,
                params: { id: plantData.id },
              });
            }}
          />
        </View>
        {activityData && entryData && entryData.length > 0 ? (
          <View className="pt-2 text-primary  dark:text-primaryDark">
            <View className="items-center">
              <Text className="pt-2 text-lg text-primary  dark:text-primaryDark">
                Activity Entries
              </Text>
            </View>
            <View className="flex w-full  pt-2">
              <ActivityList entryData={entryData} activityData={activityData} />
            </View>
          </View>
        ) : null}
      </Background>
    );
  } else {
    return (
      <Background>
        <Text>Error</Text>
      </Background>
    );
  }
}
/* eslint-enable max-lines-per-function */
