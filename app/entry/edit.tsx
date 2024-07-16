import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Background } from "~/components/background";
import { ActivityEntryForm, ActivityEntryFormProps } from "~/components/entry-form";
import type { PlantFormProps } from "~/components/plant-form";
import { PlantForm } from "~/components/plant-form";

import { Text } from "~/components/ui";
import {
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewEntryGetEntry,
  useTrackerApiViewPlantGetPlant,
  useTrackerApiViewPlantListPlants,
  useTrackerApiViewPlantPostPlant,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

/* eslint-disable max-lines-per-function */
export default function Edit() {
  const local = useLocalSearchParams<{ id: string }>();

  const {
    isLoading: entryIsLoading,
    isError: entryisError,
    error: entryError,
    data: entryData,
    refetch: entryRefetch,
  } = useTrackerApiViewEntryGetEntry(local.id!);

  const {
    isLoading: allPlantsIsLoading,
    isError: allPlantsIsError,
    error: allPlantsError,
    data: allPlantsData,
  } = useTrackerApiViewPlantListPlants();

  const {
    isLoading: activityIsLoading,
    isError: activityisError,
    error: activityError,
    data: activityData,
  } = useTrackerApiViewActivityListActivities();

  // const {
  //   isLoading: areaIsLoading,
  //   isError: areaisError,
  //   error: areaError,
  //   data: areaData,
  // } = useTrackerApiViewAreaListAreas();
  // const {
  //   mutate: plantMutate,
  //   isSuccess: plantMutateIsSuccess,
  //   error: plantMutateError,
  //   reset: plantMutateReset,
  // } = useTrackerApiViewPlantPostPlant({});

  const router = useRouter();
  const handleSubmit: ActivityEntryFormProps["onSubmit"] = async (data) => {
    console.log(data);
    // plantMutate(
    //   {
    //     plantId: local.id!,
    //     data: {
    //       area_id: data.area!,
    //       purchase_date: data.p_date.format("YYYY-MM-DD"),
    //       name: data.name,
    //       common_name: data.common_name,
    //       scientific_name: data.scientific_name,
    //       notes: data.notes,
    //     },
    //   },
    //   {
    //     onSuccess() {
    //       plantRefetch();
    //       router.navigate(`/plant/${local.id}`);
    //     },
    //     onError: (err) => {
    //       console.log(err);
    //     },
    //   }
    // );
  };

  if (entryIsLoading || allPlantsIsLoading || activityIsLoading) {
    return <Text>Loading</Text>;
  }

  if (entryData && allPlantsData && activityData) {
    return (
      <Background>
        <Stack.Screen
          options={{
            title: null,
            headerBackTitle: "Activity Detail",
          }}
        />
        <Text className=' text-center text-2xl mb-0'>Edit Activity</Text>
        <ActivityEntryForm
          allPlantData={allPlantsData}
          activityData={activityData}
          plantID={entryData.plant}
          entryData={entryData}
          onSubmit={handleSubmit}
        />
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
