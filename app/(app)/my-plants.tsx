import { useEffect, useState } from "react";
import React from "react";

import { PlantCard } from "~/components/plant-card";
import { Text } from "~/components/ui/text";
import { Background } from "~/components/background";
import { AreaApi, AreaOut, PlantApi, PlantOut } from "~/api";
import axiosInstance from "~/provider/custom-axios";
import { ScrollView } from "react-native-gesture-handler";

export default function MyPlants() {
  const [areaData, setAreaData] = useState<AreaOut[]>([]);
  const [plantData, setPlantData] = useState<PlantOut[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, undefined, axiosInstance);
      const areaApi = new AreaApi(undefined, undefined, axiosInstance);
      // get alive plants
      try {
        const response = await api.trackerApiViewPlantListPlants(true, false);
        if (response.status === 200) {
          setPlantData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get area data
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
  return (
    <Background>
      <ScrollView className="px-4">
        {plantData
          .sort((a: PlantOut, b: PlantOut) => a.area.localeCompare(b.area))
          .map((plant: any) => (
            <PlantCard plant={plant} key={plant.id} />
          ))}
      </ScrollView>
    </Background>
  );
}
