import { Component, useEffect, useState } from "react";
import React from "react";

import { PlantCard } from "~/components/plant-card";
import { Text } from "~/components/ui/text";
import { Background } from "~/components/background";
import axiosInstance from "~/provider/custom-axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import filter from "lodash.filter";
import { useNavigation } from "expo-router";
import {
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewEntryListEntries,
  useTrackerApiViewPlantListPlants,
  useTrackerApiViewSearchSearchEntry,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { EntryOut, PlantOut } from "~/lib/plant_tracker/model";
import { EntryCard } from "~/components/entry-card";
import SearchBar from "~/components/search-bar";

type renderItemProps = {
  item: EntryOut;
};

export default function MyEntries() {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>("");
  const {
    isLoading: entryIsLoading,
    isPending: entryIsPending,
    isError: entryIsError,
    error: entryError,
    data: entryData,
  } = useTrackerApiViewSearchSearchEntry({ query: search });

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
  } = useTrackerApiViewPlantListPlants();

  const renderItem = ({ item }: renderItemProps) => (
    <EntryCard
      entry={item}
      key={item.id}
      activityData={activityData!}
      plantData={plantData!.filter((x) => x.id === item.plant)[0]}
    />
  );

  if (entryIsError) {
    return <span>Error: {entryError.message}</span>;
  }

  if (activityData && plantData) {
    return (
      <Background>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        {entryIsPending ? <Text>Loading Data</Text> : null}
        {entryData && !entryIsPending ? (
          <FlatList
            data={entryData.sort((a: EntryOut, b: EntryOut) => a.plant.localeCompare(b.plant))}
            renderItem={renderItem}
          />
        ) : (
          <Text>No Results</Text>
        )}
      </Background>
    );
  }
}
