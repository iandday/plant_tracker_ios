import React, { useState } from "react";

import { Button, Text } from "~/components/ui";

import { queryClient } from "../../app/_layout";
import {
  getTrackerApiViewLocationListLocationsQueryKey,
  useLocationPatchLocation,
  useTrackerApiViewLocationCreateLocation,
  useTrackerApiViewLocationListLocations,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import LocationForm, { LocationFormProps } from "../location-form";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Background } from "../background";

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

  const handleEditMutate: LocationFormProps["onSubmit"] = async (data) => {
    locationMutate(
      { locationId: selectedIds[0], data: { name: data.name } },
      {
        onSuccess() {
          setShowEditModal(false);
          queryClient.invalidateQueries(getTrackerApiViewLocationListLocationsQueryKey({}));
        },
        onError() {
          setShowEditModal(false);
        },
      }
    );
  };

  const handleNewMutate: LocationFormProps["onSubmit"] = async (data) => {
    locationNewMutate(
      { data: { name: data.name } },
      {
        onSuccess() {
          setShowNewModal(false);
          queryClient.invalidateQueries(getTrackerApiViewLocationListLocationsQueryKey({}));
        },
        onError() {
          setShowNewModal(false);
        },
      }
    );
  };

  if (locationData) {
    return (
      <Background>
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
              textStyle={{ fontFamily: "JosefinSans-Regular", color: "white", textDecorationLine: "none" }}
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
              onSubmit={handleEditMutate}
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
          onSubmit={handleNewMutate}
        />
      </Background>
    );
  }
}
