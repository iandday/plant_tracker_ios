import { Component, useEffect, useState } from "react";
import React from "react";

import { PlantCard } from "~/components/plant-card";
import { Text } from "~/components/ui/text";
import { Background } from "~/components/background";
import axiosInstance from "~/provider/custom-axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import { useNavigation } from "expo-router";
import {
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { PlantOut } from "~/lib/plant_tracker/model";

export default function MyPlants() {
  const navigation = useNavigation();
  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
  } = useTrackerApiViewPlantListPlants({ exclude_graveyard: false, graveyard_only: true });

  useEffect(() => {
    const fetchData = async () => {
      navigation.setOptions({
        headerSearchBarOptions: {
          onChangeText: (text: string) => console.log(text),
        },
      });
    };
    fetchData();
  }, [navigation]);

  type renderItemProps = {
    item: PlantOut;
  };

  const renderItem = ({ item }: renderItemProps) => (
    <PlantCard
      plant={item}
      key={item.id}
    />
  );

  if (plantIsLoading) {
    return <Text>Loading</Text>;
  }
  if (plantData) {
    return (
      <Background>
        <FlatList
          data={plantData.sort((a: PlantOut, b: PlantOut) => a.area.localeCompare(b.area))}
          renderItem={renderItem}
        />
      </Background>
    );
  }
}
