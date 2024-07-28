import { useState } from "react";
import { ScrollView } from "react-native";
import { Button } from "~/components/ui";
import {
  getTrackerApiViewAreaListAreasQueryKey,
  useAreaPatchArea,
  useTrackerApiViewAreaCreateArea,
  useTrackerApiViewAreaListAreas,
  useTrackerApiViewLocationListLocations,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { Background } from "../background";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import AreaForm from "../area-form";
import { SubmitHandler } from "react-hook-form";
import { AreaFormProps } from "~/components/area-form";
import { queryClient } from "~/app/_layout";

export default function Areas() {
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //data
  const {
    isLoading: locationIsLoading,
    data: locationData,
    error: locationError,
  } = useTrackerApiViewLocationListLocations({});
  const { isLoading: areaIsLoading, data: areaData, error: areaError } = useTrackerApiViewAreaListAreas({});
  const { mutate: areaMutate } = useAreaPatchArea();
  const { mutate: areaNewMutate } = useTrackerApiViewAreaCreateArea();

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== id));
    }
  };

  const handleEditMutate: AreaFormProps["onSubmit"] = async (data) => {
    console.log("hello");
    areaMutate(
      { areaId: selectedIds[0], data: { location_id: data.location, name: data.area } },
      {
        onSuccess() {
          setShowEditModal(false);
          queryClient.invalidateQueries(getTrackerApiViewAreaListAreasQueryKey());
        },
        onError(error) {
          console.log(error);
          setShowEditModal(false);
        },
      }
    );
  };

  const handleNewMutate: AreaFormProps["onSubmit"] = async (data) => {
    areaNewMutate(
      { data: { location_id: data.location, name: data.area } },
      {
        onSuccess() {
          queryClient.invalidateQueries(getTrackerApiViewAreaListAreasQueryKey({}));
          setShowNewModal(false);
        },
        onError(error) {
          console.log(error);
          setShowNewModal(false);
        },
      }
    );
  };

  if (locationData && areaData) {
    return (
      <Background>
        <ScrollView className='pb-20'>
          {areaData?.map((obj, index) => {
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
              <AreaForm
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                locationData={locationData}
                areaData={areaData.find((x) => x.id === selectedIds[0])}
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
          <AreaForm
            showModal={showNewModal}
            setShowModal={setShowNewModal}
            locationData={locationData}
            onSubmit={handleNewMutate}
          />
        </ScrollView>
      </Background>
    );
  }
}
