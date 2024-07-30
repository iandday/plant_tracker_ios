import { Component, useEffect, useLayoutEffect, useState } from "react";
import React from "react";

import { PlantCard } from "~/components/plant-card";
import { Text } from "~/components/ui/text";
import { Background } from "~/components/background";
import axiosInstance from "~/provider/custom-axios";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import filter from "lodash.filter";
import { useNavigation } from "expo-router";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { PlantOut } from "~/lib/plant_tracker/model";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "~/components/ui/input";

interface renderHeaderProps {
  search: string;
  setSearch: any;
}

const renderHeader = ({ search, setSearch }: renderHeaderProps) => (
  <View className='flex flex-row justify-center align-center items-center'>
    <FeatherIcon
      color='#848484'
      name='search'
      size={17}
      className=' flex-0 '
    />

    <Input
      autoCapitalize='none'
      autoCorrect={false}
      clearButtonMode='while-editing'
      onChangeText={(val) => setSearch(val)}
      placeholder='Start searching..'
      placeholderTextColor='#848484'
      returnKeyType='done'
      //style={styles.searchControl}
      value={search}
      className=' w-full'
    />
    {search ? (
      <TouchableOpacity
        onPress={() => {
          console.log("cancel pressed");
        }}
      >
        <Text className='pl-5'>Cancel</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

export default function MyPlants() {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>();
  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
  } = useTrackerApiViewPlantListPlants({ exclude_graveyard: true });

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
          ListHeaderComponent={renderHeader({ search, setSearch })}
          stickyHeaderIndices={[0]}
        />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: "center",
  },
  /** Search */
  search: {
    position: "relative",
    backgroundColor: "#efefef",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
  },
  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
  searchMessage: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#848484",
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Row */
  row: {
    height: 60,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
  },
  rowMessage: {
    marginTop: 4,
    color: "#848484",
  },
});
