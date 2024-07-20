import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { type Dayjs } from "dayjs";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { Option } from "~/components/ui";
import { Button, ControlledDatePicker, ControlledInput, ControlledSelect, Text, View } from "~/components/ui";
import { AreaOut, PlantOut } from "~/lib/plant_tracker/model";
import SelectPhoto from "./ui/select-photo";

const schema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),

  common_name: z.string({}).nullable(),
  scientific_name: z.string({}).nullable(),
  notes: z.string({}).nullable(),
  area: z.string({}).nullable(),
  p_date: z.instanceof(dayjs as unknown as typeof Dayjs).nullable(),
  photo: z.any(),
});

export type FormType = z.infer<typeof schema>;

export type PlantFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  plantData?: PlantOut;
  areaData: AreaOut[];
};

const blankPlantOut: PlantOut = {
  name: "",
  common_name: "",
  scientific_name: "",
  notes: "",
  area: "",
  purchase_date: "",
  user: "",
};
/* eslint-disable max-lines-per-function */
export const PlantForm = ({ onSubmit = () => {}, plantData = blankPlantOut, areaData }: PlantFormProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [photoSet, setPhotoSet] = useState<boolean>(false);

  const defaultValues = plantData.name
    ? {
        name: plantData.name,
        common_name: plantData.common_name,
        scientific_name: plantData.scientific_name,
        notes: plantData.notes,
        area: plantData.area,
        p_date: dayjs(plantData?.purchase_date, "YYYY-MM-DD"),
      }
    : {
        common_name: "",
        scientific_name: "",
        notes: "",
        p_date: dayjs(),
      };

  const { handleSubmit, control, setValue, resetField } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handlePhotoMutate = (data: ImagePicker.ImagePickerSuccessResult) => {
    setValue("photo", {
      uri: data.assets[0].uri!,
      name: data.assets[0].fileName || `activity-${Math.random().toString(20).substr(2, 18)}`,
      type: data.assets[0].mimeType!,
    });
    setPhotoSet(true);
  };

  // build list for area select
  const areaList: Option[] = [];
  areaData.forEach(function (arrayItem) {
    var current: Option = { value: arrayItem.id, label: arrayItem.name };
    areaList.push(current);
  });

  return (
    <View className='flex-1 flex-col p-4'>
      <ControlledInput
        control={control}
        name='name'
        label='Name'
      />
      <ControlledInput
        control={control}
        name='common_name'
        label='Common Name'
      />
      <ControlledInput
        control={control}
        name='scientific_name'
        label='Scientific Name'
      />
      <ControlledSelect
        control={control}
        name='area'
        label='Area'
        options={areaList}
      />
      <ControlledDatePicker
        control={control}
        name='p_date'
        label='Purchase Date'
      />

      <ControlledInput
        control={control}
        name='notes'
        label='Notes'
        multiline
      />
      <SelectPhoto
        showModal={showModal}
        setShowModal={setShowModal}
        handleMutate={handlePhotoMutate}
      />
      {photoSet ? (
        <Button
          label='Remove Photo'
          onPress={() => {
            resetField("photo");
            setPhotoSet(false);
          }}
        />
      ) : (
        <Button
          label='Add/Change Photo'
          onPress={() => setShowModal(true)}
        />
      )}
      <Button
        label='Save'
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
