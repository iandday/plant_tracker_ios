import { useState } from "react";
import React from "react";
import { PlantCard } from "~/components/plant-card";
import { Text } from "~/components/ui/text";
import { Background } from "~/components/background";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useTrackerApiViewSearchSearchPlant } from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { PlantOut } from "~/lib/plant_tracker/model";
import SearchBar from "~/components/search-bar";

type renderItemProps = {
  item: PlantOut;
};

const renderItem = ({ item }: renderItemProps) => (
  <PlantCard
    plant={item}
    key={item.id}
  />
);

export default function MyPlants() {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>("");
  const {
    isLoading: plantIsLoading,
    isPending: plantIsPending,
    isError: plantIsError,
    error: plantError,
    data: plantData,
  } = useTrackerApiViewSearchSearchPlant({ alive_only: true, query: search });

  if (plantIsPending) {
    return <Text>Loading</Text>;
  }

  if (plantIsError) {
    return <span>Error: {plantError.message}</span>;
  }

  return (
    <Background>
      <SearchBar
        search={search}
        setSearch={setSearch}
      />
      <FlatList
        data={plantData.sort((a: PlantOut, b: PlantOut) => a.area.localeCompare(b.area))}
        renderItem={renderItem}
        //ListHeaderComponent={SearchBar({ search, setSearch })}
        //stickyHeaderIndices={[0]}
      />
    </Background>
  );
}
