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
export default function NewPlant() {
  const [areaData, setAreaData] = useState<AreaOut[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const api = new PlantApi(undefined, '', axiosInstance);
  const router = useRouter();

  const handleSubmit: PlantFormProps["onSubmit"] = async (data) => {
    try {
      const response = await api.trackerApiViewPlantCreatePlant(
        data.area,
        data.name,
        data.p_date.format("YYYY-MM-DD"),
        undefined,
        undefined,
        data.common_name,
        data.scientific_name,
        data.notes,
        undefined
      );
      if (response.status === 200) {
        router.replace(`/plant/${response.data.id}`);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const areaApi = new AreaApi(undefined, '', axiosInstance);

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
