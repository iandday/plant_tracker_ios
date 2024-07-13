import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Background } from "~/components/background";
import type { PlantFormProps } from "~/components/plant-form";
import { PlantForm } from "~/components/plant-form";

import { Text } from "~/components/ui";
import {
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewPlantGetPlant,
  useTrackerApiViewPlantPostPlant,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

/* eslint-disable max-lines-per-function */
export default function Edit() {
  const local = useLocalSearchParams<{ id: string }>();

  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
    refetch: plantRefetch,
  } = useTrackerApiViewPlantGetPlant(local.id!);

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
  } = useTrackerApiViewPlantPostPlant({});

  const router = useRouter();
  const handleSubmit: PlantFormProps["onSubmit"] = async (data) => {
    plantMutate(
      {
        plantId: local.id!,
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
        onSuccess() {
          plantRefetch();
          router.navigate(`/plant/${local.id}`);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  if (plantIsLoading || areaIsLoading) {
    return <Text>Loading</Text>;
  }

  if (plantData && areaData) {
    return (
      <Background>
        <Stack.Screen
          options={{
            title: null,
            headerBackTitle: "Plant Detail",
          }}
        />
        <Text className=" text-center text-2xl mb-0">
          Edit {plantData.name}
        </Text>
        <PlantForm
          plantData={plantData}
          areaData={areaData}
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
