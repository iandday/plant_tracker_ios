import { Component, useEffect, useState } from "react";
import React from "react";

import { PlantCard } from "~/components/plant-card";
import { Text } from "~/components/ui/text";
import { Background } from "~/components/background";
import { AreaApi, AreaOut, PlantApi, PlantOut } from "~/api";
import axiosInstance from "~/provider/custom-axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import { useNavigation } from "expo-router";

export default function MyPlants() {
  const [areaData, setAreaData] = useState<AreaOut[]>([]);
  const [plantData, setPlantData] = useState<PlantOut[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

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

      navigation.setOptions({
        headerSearchBarOptions: {
          onChangeText: (text: string) => console.log(text),
        },
      });

      setIsLoading(false);
    };
    fetchData();
  }, [navigation]);

  type renderItemProps = {
    item: PlantOut;
  };

  const renderItem = ({ item }: renderItemProps) => (
    <PlantCard plant={item} key={item.id} />
  );

  //plantData.sort((a: PlantOut, b: PlantOut) => a.area.localeCompare(b.area)

  if (isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <Background>
      <FlatList
        data={plantData.sort((a: PlantOut, b: PlantOut) =>
          a.area.localeCompare(b.area)
        )}
        renderItem={renderItem}
        //keyExtractor={(item) => item.id}
      />
    </Background>
  );
}
