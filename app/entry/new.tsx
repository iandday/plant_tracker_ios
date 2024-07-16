import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";

import { Background } from "~/components/background";
import { ActivityEntryForm, ActivityEntryFormProps, ActivityForm } from "~/components/entry-form";
import type { PlantFormProps } from "~/components/plant-form";

import { Text } from "~/components/ui";
import {
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewEntryCreateEntry,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

/* eslint-disable max-lines-per-function */

type SearchParamType = {
  id: string;
};

export default function NewEntry() {
  const { id: plant_id } = useLocalSearchParams<SearchParamType>();

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

  const {
    mutate: activityEntryMutate,
    isSuccess: activityEntryMutateIsSuccess,
    error: activityEntryMutateError,
    reset: activityEntryMutateReset,
    data: activityEntryData,
  } = useTrackerApiViewEntryCreateEntry();

  const handleSubmit: ActivityEntryFormProps["onSubmit"] = async (data) => {
    activityEntryMutate(
      {
        data: {
          plant_id: data.plant_id,
          activities: data.activities,
          plant_health: data.plant_health,
          Timestamp: data.timestamp.toISOString(),
          notes: data.notes,
          file: data.photo,
        },
      },
      {
        onSuccess(data) {
          router.replace(`/plant/${data!.plant}`);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
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
        <ActivityEntryForm
          onSubmit={handleSubmit}
          allPlantData={allPlantsData}
          activityData={activityData}
          plantID={plant_id}
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
