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
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewEntryListEntries,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { EntryOut, PlantOut } from "~/lib/plant_tracker/model";
import { EntryCard } from "~/components/entry-card";

export default function MyEntries() {
  const navigation = useNavigation();
  const {
    isLoading: entryIsLoading,
    isError: entryisError,
    error: entryError,
    data: entryData,
  } = useTrackerApiViewEntryListEntries();
  const {
    isLoading: activityIsLoading,
    isError: activityisError,
    error: activityError,
    data: activityData,
  } = useTrackerApiViewActivityListActivities();
  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
  } = useTrackerApiViewPlantListPlants({ exclude_graveyard: false });

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
    item: EntryOut;
  };

  const renderItem = ({ item }: renderItemProps) => (
    <EntryCard
      entry={item}
      activityData={activityData!}
      plantData={plantData!.filter((x) => x.id === item.plant)[0]}
    />
  );

  if (entryIsLoading || activityIsLoading || plantIsLoading) {
    return <Text>Loading</Text>;
  }
  if (entryData && activityData && plantData) {
    return (
      <Background>
        <FlatList
          data={entryData.sort((a: EntryOut, b: EntryOut) => a.plant.localeCompare(b.plant))}
          renderItem={renderItem}
        />
      </Background>
    );
  }
}
