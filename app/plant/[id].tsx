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
  useTrackerApiViewEntryGetPlantEntries,
  useTrackerApiViewPlantGetPlant,
  useTrackerApiViewPlantPostPlant,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";

/* eslint-disable max-lines-per-function */
export default function Plant() {
  const local = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    isLoading: plantIsLoading,
    isError: plantisError,
    error: plantError,
    data: plantData,
    refetch: plantRefetch,
  } = useTrackerApiViewPlantGetPlant(local.id!);
  const {
    isLoading: entryIsLoading,
    isError: entryisError,
    error: antryError,
    data: entryData,
  } = useTrackerApiViewEntryGetPlantEntries(local.id!);
  const {
    isLoading: activityIsLoading,
    isError: activityisError,
    error: activityError,
    data: activityData,
  } = useTrackerApiViewActivityListActivities();
  const {
    isLoading: areaIsLoading,
    isError: areaisError,
    error: areaError,
    data: areaData,
  } = useTrackerApiViewAreaGetArea(plantData?.area);
  const { mutate: plantMutate, isSuccess: plantIsSuccess } = useTrackerApiViewPlantPostPlant();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const captureImage = async () => {
    const cameraPermissions = await ImagePicker.getCameraPermissionsAsync();
    if (!cameraPermissions.granted) {
      const newCameraPermissions = await ImagePicker.requestCameraPermissionsAsync();
      if (!newCameraPermissions.granted) {
        console.log("Failed to grant permissions");
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setShowModal(!showModal);
      plantMutate({
        plantId: local.id!,
        data: {
          file: {
            uri: result.assets[0].uri!,
            name: result.assets[0].fileName || `${local.id}-main`,
            type: result.assets[0].mimeType!,
          },
        },
      });
    }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "25%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    const setModal = async () => {
      if (showModal) {
        bottomSheetModalRef.current?.present();
      } else {
        bottomSheetModalRef.current?.dismiss();
      }
    };
    setModal();
  }, [showModal]);

  useEffect(() => {
    const refreshData = async () => {
      if (plantIsSuccess) {
        plantRefetch();
      }
    };
    refreshData();
  }, [plantIsSuccess]);

  const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ style, animatedIndex }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: "#020303",
    }));
    const containerStyle = React.useMemo(
      () => [style, containerAnimatedStyle],
      [style, containerAnimatedStyle]
    );
    return (
      <Animated.View
        pointerEvents='none'
        style={containerStyle}
      />
    );
  };

  if (plantIsLoading || areaIsLoading || activityIsLoading || entryIsLoading) {
    return <Text>Loading</Text>;
  }

  if (plantData && areaData) {
    return (
      <Background>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={CustomBackdrop}
          backgroundComponent={CustomBackground}
        >
          <BottomSheetView className='bg-background flex-1 p-4'>
            <Button
              label='Take New Picture'
              onPress={() => {
                captureImage;
              }}
              variant='default'
              fullWidth={false}
              size='lg'
              className='mx-10'
            />

            <Button
              label='Select Existing Picture'
              onPress={() => {
                pickImage();
              }}
              variant='default'
              fullWidth={false}
              size='lg'
              className='mx-10'
            />
            <Button
              label='Cancel'
              onPress={() => {
                setShowModal(false);
              }}
              variant='default'
              fullWidth={false}
              size='lg'
              className='mx-10'
            />
          </BottomSheetView>
        </BottomSheetModal>

        <Stack.Screen options={{ title: plantData.name, headerBackTitle: "All Plants" }} />
        <View className='flex'>
          <View className='height-200 flex w-full flex-row justify-around pt-2'>
            <View className='m-2'>
              <PlantInfo
                plantData={plantData}
                areaData={areaData}
              />
            </View>
            <View className='m-2'>
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <View className='h-64 w-64'>
                  <PlantPhoto
                    plant={plantData}
                    height='64'
                    width='full'
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className='pt-2'>
            <Button
              label='Edit Plant'
              onPress={() => {
                router.navigate({
                  pathname: `/plant/edit`,
                  params: { id: plantData.id },
                });
              }}
            />
            <Button
              label='New Activity Entry'
              onPress={() => {
                router.navigate({
                  pathname: `/entry/new`,
                  params: { id: plantData.id },
                });
              }}
            />
          </View>

          {activityData && entryData && entryData.length > 0 ? (
            <View className='height-200 flex w-full flex-col justify-around pt-2'>
              <Text className=' text-lg text-center flex-0 pt-2 text-primary dark:text-primaryDark'>
                Activity Entries
              </Text>
              <ActivityList
                entryData={entryData}
                activityData={activityData}
              />
            </View>
          ) : null}
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
