import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Background } from "~/components/background";
import dayjs, { type Dayjs } from "dayjs";
import ActivityList from "~/components/plant-detail/activity-list";
import PlantInfo from "~/components/plant-detail/plantInfo";
import { PlantPhoto } from "~/components/plant-photo";
import { Button, Text, View } from "~/components/ui";
import {
  getTrackerApiViewPlantGetPlantQueryKey,
  getTrackerApiViewPlantListPlantsQueryKey,
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewAreaGetArea,
  useTrackerApiViewEntryGetPlantEntries,
  useTrackerApiViewPlantGetPlant,
  useTrackerApiViewPlantPostPlant,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { queryClient } from "../_layout";

/* eslint-disable max-lines-per-function */
export default function Plant() {
  const local = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
    refetch: plantRefetch,
  } = useTrackerApiViewPlantGetPlant(local.id!);
  const {
    isLoading: entryIsLoading,
    isError: entryisError,
    error: antryError,
    data: entryData,
  } = useTrackerApiViewEntryGetPlantEntries(local.id!);
  const {
    isLoading: activityIsLoading,
    isError: activityisError,
    error: activityError,
    data: activityData,
  } = useTrackerApiViewActivityListActivities();
  const {
    isLoading: areaIsLoading,
    isError: areaisError,
    error: areaError,
    data: areaData,
  } = useTrackerApiViewAreaGetArea(plantData?.area);
  const {
    mutate: plantMutate,
    isSuccess: plantMutateIsSuccess,
    error: plantMutateError,
    reset: plantMutateReset,
  } = useTrackerApiViewPlantPostPlant({});
  console.log(plantData);
  if (plantIsLoading || areaIsLoading || activityIsLoading || entryIsLoading) {
    return <Text>Loading</Text>;
  }

  if (plantData && areaData) {
    return (
      <Background>
        <Stack.Screen options={{ title: plantData.name, headerBackTitle: "All Plants" }} />
        <View className='flex'>
          <View className='height-200 flex w-full flex-row justify-around pt-2'>
            <View className='m-2'>
              <PlantInfo
                plantData={plantData}
                areaData={areaData}
              />
            </View>
            <View className='m-2'>
              <View className='h-64 w-64'>
                <PlantPhoto
                  plant={plantData}
                  height='64'
                  width='full'
                />
              </View>
            </View>
          </View>

          <View className='pt-2'>
            <Button
              label='Edit Plant'
              onPress={() => {
                router.navigate({
                  pathname: `/plant/edit`,
                  params: { id: plantData.id },
                });
              }}
            />
            <Button
              label='New Activity Entry'
              onPress={() => {
                router.navigate({
                  pathname: `/entry/new`,
                  params: { id: plantData.id },
                });
              }}
            />
            <Button
              label='Send to Graveyard'
              variant='destructive'
              onPress={() => {
                plantMutate(
                  {
                    plantId: local.id!,
                    data: {
                      graveyard: true,
                      death_date: dayjs(new Date()).format("YYYY-MM-DD"),
                    },
                  },
                  {
                    onSuccess() {
                      queryClient.invalidateQueries(getTrackerApiViewPlantGetPlantQueryKey({}));
                      queryClient.invalidateQueries(getTrackerApiViewPlantListPlantsQueryKey({}));
                    },
                    onError: (err) => {
                      console.log(err);
                    },
                  }
                );
              }}
            />
          </View>

          {activityData && entryData && entryData.length > 0 ? (
            <View className='height-200 flex w-full flex-col justify-around pt-2'>
              <Text className=' text-lg text-center flex-0 pt-2 text-primary dark:text-primaryDark'>
                Activity Entries
              </Text>
              <ActivityList
                entryData={entryData}
                activityData={activityData}
              />
            </View>
          ) : null}
        </View>
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
