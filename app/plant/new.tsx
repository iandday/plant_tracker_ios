import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Background } from "~/components/background";
import type { PlantFormProps } from "~/components/plant-form";
import { PlantForm } from "~/components/plant-form";
import { Text } from "~/components/ui";
import {
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewPlantCreatePlant,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

/* eslint-disable max-lines-per-function */
export default function NewPlant() {
  const router = useRouter();
  const {
    isLoading: areaIsLoading,
    isError: areaisError,
    error: areaError,
    data: areaData,
  } = useTrackerApiViewAreaListAreas();
  const {
    mutate: plantMutate,
    isSuccess: plantMutateIsSuccess,
    error: plantMutateError,
    reset: plantMutateReset,
    data: plantData,
  } = useTrackerApiViewPlantCreatePlant();

  const handleSubmit: PlantFormProps["onSubmit"] = async (data) => {
    plantMutate(
      {
        data: {
          area_id: data.area!,
          purchase_date: data.p_date.format("YYYY-MM-DD"),
          name: data.name,
          common_name: data.common_name,
          scientific_name: data.scientific_name,
          notes: data.notes,
        },
      },
      {
        onSuccess(data) {
          router.replace(`/plant/${data!.id}`);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  if (areaIsLoading) {
    return <Text>Loading</Text>;
  }

  if (areaData) {
    return (
      <Background>
        <Stack.Screen
          options={{
            title: null,
            headerBackTitle: "All Plants",
          }}
        />
        <Text className=" text-center text-2xl mb-0">New Plant</Text>
        <PlantForm areaData={areaData} onSubmit={handleSubmit} />
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
