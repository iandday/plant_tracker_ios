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

type SearchParamType = {
  plant_id: string;
};

export default function NewEntry() {
  const { plant_id } = useLocalSearchParams<SearchParamType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activityData, setActivityData] = useState<ActivityOut[]>();
  const [plantData, setPlantData] = useState<PlantOut>();
  const [allPlantData, setAllPlantData] = useState<PlantOut[]>();
  const entryAPI = new EntryApi(undefined, '', axiosInstance);
  const activityAPI = new ActivityApi(undefined, '', axiosInstance);
  const plantAPI = new PlantApi(undefined, '', axiosInstance);

  // const [areaData, setAreaData] = useState<AreaOut[]>();

  // const api = new PlantApi(undefined, '', axiosInstance);
  // const router = useRouter();

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
      try {
        const response =
          await activityAPI.trackerApiViewActivityListActivities();

        if (response.status === 200) {
          setActivityData(response.data);
        }

        // get specified plant
        if (plant_id) {
          const presponse = await plantAPI.trackerApiViewPlantGetPlant(
            plant_id
          );
          if (presponse.status === 200) {
            setPlantData(presponse.data);
          }
        }

        // get all plants
        const apresponse = await plantAPI.trackerApiViewPlantListPlants();
        if (apresponse.status === 200) {
          setAllPlantData(apresponse.data);
        }
      } catch (err) {}
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (activityData) {
    return (
      <Background>
        <Stack.Screen
          options={{
            title: null,
            headerBackTitle: "All Plants",
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
