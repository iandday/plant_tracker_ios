import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Background } from "~/components/background";
import ActivityList from "~/components/plant-detail/activity-list";
import PlantInfo from "~/components/plant-detail/plantInfo";
import { PlantPhoto } from "~/components/plant-photo";
import { Button, Text, View, TouchableOpacity, CustomBackdrop } from "~/components/ui";
import * as ImagePicker from "expo-image-picker";
import {
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewAreaGetArea,
  useTrackerApiViewEntryGetEntry,
  useTrackerApiViewEntryGetPlantEntries,
  useTrackerApiViewPlantGetPlant,
  useTrackerApiViewPlantPostPlant,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { usePlantServiceTrackerApiViewPlantGetPlant } from "~/lib/api/queries";
import EntryInfo from "~/components/entry-detail/entryInfo";
import SelectPhoto from "~/components/ui/select-photo";
import { EntryPhoto } from "~/components/entry-photo";

/* eslint-disable max-lines-per-function */
export default function ActivityEntry() {
  const local = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    isLoading: entryIsLoading,
    isError: entryisError,
    error: entryError,
    data: entryData,
    refetch: entryRefetch,
  } = useTrackerApiViewEntryGetEntry(local.id!);

  const {
    status: plantStatus,
    fetchStatus: plantFetchStatus,
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
    refetch: plantRefetch,
  } = useTrackerApiViewPlantGetPlant(entryData?.plant);

  const {
    isLoading: areaIsLoading,
    isError: areaisError,
    error: areaError,
    data: areaData,
  } = useTrackerApiViewAreaGetArea(plantData?.area, {
    query: { queryKey: [plantData?.area!] },
  });

  const {
    isLoading: activityIsLoading,
    isError: activityisError,
    error: activityError,
    data: activityData,
  } = useTrackerApiViewActivityListActivities();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleMutate = (data: ImagePicker.ImagePickerSuccessResult) => {
    console.log(data);
  };

  // useEffect(() => {
  //   const refreshData = async () => {
  //     if (plantIsSuccess) {
  //       plantRefetch();
  //     }
  //   };
  //   refreshData();
  // }, [plantIsSuccess]);

  if (plantIsLoading || entryIsLoading) {
    return <Text>Loading</Text>;
  }

  if (activityData && plantData && entryData) {
    return (
      <Background>
        <SelectPhoto
          showModal={showModal}
          setShowModal={setShowModal}
          handleMutate={handleMutate}
        />
        <Stack.Screen options={{ title: plantData.name, headerBackTitle: "Back" }} />

        <View className='height-200 flex w-full flex-column items-center pt-2 pb-5'>
          <View className='p-2'>
            <EntryInfo
              entryData={entryData}
              activityData={activityData}
            />
          </View>
          <View className='m-2'>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              <View className='h-64 w-64'>
                <EntryPhoto
                  entry={entryData}
                  height='64'
                  width='full'
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className='pt-2'>
          <Button
            label='Edit Entry'
            onPress={() => {
              router.navigate({
                pathname: `/entry/edit`,
                params: { id: entryData.id },
              });
            }}
          />
        </View>
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
/* eslint-enable max-lines-per-function */
