import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";

import type { ActivityOut, AreaOut, EntryOut, PlantOut } from "~/api";
import { ActivityApi, AreaApi, EntryApi, PlantApi } from "~/api";
import { Background } from "~/components/background";
import type { PlantFormProps } from "~/components/plant-form";
import { PlantForm } from "~/components/plant-form";
import axiosInstance from "~/provider/custom-axios";
import { Text } from "~/components/ui";

/* eslint-disable max-lines-per-function */
export default function Edit() {
  const local = useLocalSearchParams<{ id: string }>();

  const [areaData, setAreaData] = useState<AreaOut[]>();
  const [plantData, setPlantData] = useState<PlantOut>();
  const [entryData, setEntryData] = useState<EntryOut[]>();
  const [activityData, setActivityData] = useState<ActivityOut[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const api = new PlantApi(undefined, '', axiosInstance);
  const router = useRouter();

  const handleSubmit: PlantFormProps["onSubmit"] = async (data) => {
    try {
      const response = await api.trackerApiViewPlantPostPlant(
        local.id,
        data.area!,
        data.p_date.format("YYYY-MM-DD"),
        undefined,
        undefined,
        data.name,
        data.common_name,
        data.scientific_name,
        data.notes,
        undefined
      );
      if (response.status === 200) {
        router.replace(`/plant/${local.id}`);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, '', axiosInstance);
      const areaApi = new AreaApi(undefined, '', axiosInstance);

      try {
        const response = await api.trackerApiViewPlantGetPlant(local.id);
        if (response.status === 200) {
          setPlantData(response.data);
        }
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
  }, [local.id]);

  if (isLoading) {
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
