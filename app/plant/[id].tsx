import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ActivityOut, AreaOut, EntryOut, PlantOut } from "~/api";
import { ActivityApi, AreaApi, EntryApi, PlantApi } from "~/api";
import { Background } from "~/components/background";
import ActivityList from "~/components/plant-detail/activity-list";
import PlantInfo from "~/components/plant-detail/plantInfo";
import { PlantPhoto } from "~/components/plant-photo";
import axiosInstance from "~/provider/custom-axios";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  CustomBackdrop,
} from "~/components/ui";
import * as ImagePicker from "expo-image-picker";
import {
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

/* eslint-disable max-lines-per-function */
export default function Plant() {
  const local = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [areaData, setAreaData] = useState<AreaOut>();
  const [plantData, setPlantData] = useState<PlantOut>();
  const [entryData, setEntryData] = useState<EntryOut[]>();
  const [activityData, setActivityData] = useState<ActivityOut[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const api = new PlantApi(undefined, '', axiosInstance);

  const captureImage = async () => {
    const cameraPermissions = await ImagePicker.getCameraPermissionsAsync();
    if (!cameraPermissions.granted) {
      const newCameraPermissions =
        await ImagePicker.requestCameraPermissionsAsync();
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
      api.trackerApiViewPlantPostPlant(
        local.id!,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          uri: result.assets[0].uri!,
          name: result.assets[0].fileName!,
          type: result.assets[0].mimeType!,
        }
      );
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
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, '', axiosInstance);
      const areaApi = new AreaApi(undefined, '', axiosInstance);
      const activityApi = new ActivityApi(undefined, '', axiosInstance);
      const entryApi = new EntryApi(undefined, '', axiosInstance);

      try {
        const response = await api.trackerApiViewPlantGetPlant(local.id!);
        if (response.status === 200) {
          setPlantData(response.data);
        }
        const areaResponse = await areaApi.trackerApiViewAreaGetArea(
          response.data.area
        );
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
        const entryResponse = await entryApi.trackerApiViewEntryGetPlantEntries(
          response.data.id!
        );
        if (entryResponse.status === 200) {
          setEntryData(entryResponse.data);
        }
        const activityResponse =
          await activityApi.trackerApiViewActivityListActivities();
        if (activityResponse.status === 200) {
          setActivityData(activityResponse.data);
        }
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {
        console.error(err);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [local.id]);

  const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
  }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: "#020303",
    }));
    const containerStyle = React.useMemo(
      () => [style, containerAnimatedStyle],
      [style, containerAnimatedStyle]
    );
    return <Animated.View pointerEvents="none" style={containerStyle} />;
  };

  if (isLoading) {
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
          <BottomSheetView className="bg-background flex-1 p-4">
            <Button
              label="Take New Picture"
              onPress={() => {
                captureImage;
              }}
              variant="default"
              fullWidth={false}
              size="lg"
              className="mx-10"
            />

            <Button
              label="Select Existing Picture"
              onPress={() => {
                pickImage();
              }}
              variant="default"
              fullWidth={false}
              size="lg"
              className="mx-10"
            />
            <Button
              label="Cancel"
              onPress={() => {
                setShowModal(false);
              }}
              variant="default"
              fullWidth={false}
              size="lg"
              className="mx-10"
            />
          </BottomSheetView>
        </BottomSheetModal>

        <Stack.Screen
          options={{ title: plantData.name, headerBackTitle: "All Plants" }}
        />

        <View className="height-200 flex w-full flex-row justify-around pt-2">
          <View className="m-2">
            <PlantInfo plantData={plantData} areaData={areaData} />
          </View>
          <View className="m-2">
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              <View className="h-64 w-64">
                <PlantPhoto plant={plantData} height="64" width="full" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="pt-2">
          <Button
            label="Edit Plant"
            onPress={() => {
              router.navigate({
                pathname: `/plant/edit`,
                params: { id: plantData.id },
              });
            }}
          />
        </View>
        {activityData && entryData && entryData.length > 0 ? (
          <View className="pt-2 text-primary  dark:text-primaryDark">
            <View className="items-center">
              <Text className="pt-2 text-lg text-primary  dark:text-primaryDark">
                Activity Entries
              </Text>
            </View>
            <View className="flex w-full  pt-2">
              <ActivityList entryData={entryData} activityData={activityData} />
            </View>
          </View>
        ) : null}
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
