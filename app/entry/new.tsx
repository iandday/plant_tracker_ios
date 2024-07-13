import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";

import { Background } from "~/components/background";
import type { PlantFormProps } from "~/components/plant-form";

import { Text } from "~/components/ui";
import {
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

/* eslint-disable max-lines-per-function */

type SearchParamType = {
  plant_id: string;
};

export default function NewEntry() {
  const { plant_id } = useLocalSearchParams<SearchParamType>();

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

  const handleSubmit: PlantFormProps["onSubmit"] = async (data) => {
    try {
    } catch (err: unknown) {
      console.log(err);
    }
  };

  if (activityIsLoading || allPlantsIsLoading) {
    return <Text>Loading</Text>;
  }

  if (activityData) {
    return (
      <Background>
        <Stack.Screen
          options={{
            title: "New Activity Entry",
            headerBackTitle: undefined,
          }}
        />
        <Text className=" text-center text-2xl mb-0">New Activity Entry</Text>
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
