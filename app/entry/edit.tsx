import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Background } from "~/components/background";
import { ActivityEntryForm, ActivityEntryFormProps } from "~/components/entry-form";
import dayjs from "dayjs";
import { Text } from "~/components/ui";
import {
  getTrackerApiViewEntryGetEntryQueryKey,
  getTrackerApiViewEntryListEntriesQueryKey,
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewEntryGetEntry,
  useTrackerApiViewEntryPostEntry,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { queryClient } from "../_layout";

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

  const {
    mutate: entryMutate,
    isSuccess: entryMutateIsSuccess,
    error: entryMutateError,
    reset: entryMutateReset,
  } = useTrackerApiViewEntryPostEntry();

  const router = useRouter();
  const handleSubmit: ActivityEntryFormProps["onSubmit"] = async (data) => {
    entryMutate(
      {
        entryId: local.id!,
        data: {
          plant_id: data.plant_id,
          activities: data.activities,
          plant_health: data.plant_health,
          Timestamp: dayjs(data.timestamp).toISOString(),
          notes: data.notes,
          file: data.photo,
        },
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(getTrackerApiViewEntryGetEntryQueryKey({}));
          queryClient.invalidateQueries(getTrackerApiViewEntryListEntriesQueryKey({}));
          router.navigate(`/entry/${local.id}`);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
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
