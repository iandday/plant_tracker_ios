import { BottomSheetBackgroundProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { Animated, ScrollView, View } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import { Button, Text } from "~/components/ui";
import { Input } from "react-native-elements";
import { queryClient } from "../../app/_layout";
import {
  getTrackerApiViewLocationListLocationsQueryKey,
  useLocationPatchLocation,
  useTrackerApiViewLocationCreateLocation,
  useTrackerApiViewLocationGetLocation,
  useTrackerApiViewLocationGetLocationSuspense,
  useTrackerApiViewLocationListLocations,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import LocationForm from "../location-form";
import Checkbox from "expo-checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Locations() {
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const {
    isLoading: locationIsLoading,
    data: locationData,
    error: locationError,
  } = useTrackerApiViewLocationListLocations({});

  const { mutate: locationMutate } = useLocationPatchLocation();

  const { mutate: locationNewMutate } = useTrackerApiViewLocationCreateLocation();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== id));
    }
  };

  const handleEditMutate = (data: string) => {
    locationMutate(
      { locationId: selectedIds[0], data: { name: data } },
      {
        onSuccess() {
          queryClient.invalidateQueries(getTrackerApiViewLocationListLocationsQueryKey({}));
        },
        onError() {},
      }
    );
  };

  const handleNewMutate = (data: string) => {
    locationNewMutate(
      { data: { name: data } },
      {
        onSuccess() {
          queryClient.invalidateQueries(getTrackerApiViewLocationListLocationsQueryKey({}));
        },
        onError() {},
      }
    );
  };

  if (locationData) {
    return (
      <ScrollView>
        {locationData?.map((obj, index) => {
          return (
            <BouncyCheckbox
              key={index}
              size={25}
              fillColor='red'
              unFillColor='#FFFFFF'
              text={obj.name}
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: "JosefinSans-Regular", color: "white" }}
              onPress={(isChecked: boolean) => {
                handleCheckboxChange(obj.id, isChecked);
              }}
            />
          );
        })}

        {selectedIds.length === 1 ? (
          <>
            <Button
              label='Edit'
              onPress={() => {
                setShowEditModal(true);
              }}
              variant='default'
              fullWidth={false}
              size='lg'
              className='mx-10'
            />
            <LocationForm
              showModal={showEditModal}
              setShowModal={setShowEditModal}
              locationData={locationData.find((x) => x.id === selectedIds[0])}
              handleMutate={handleEditMutate}
            />
          </>
        ) : null}
        <Button
          label='New'
          onPress={() => {
            setShowNewModal(true);
          }}
          variant='default'
          fullWidth={false}
          size='lg'
          className='mx-10'
        />
        <LocationForm
          showModal={showNewModal}
          setShowModal={setShowNewModal}
          handleMutate={handleNewMutate}
        />
      </ScrollView>
    );
  }
}
