import { zodResolver } from "@hookform/resolvers/zod";

import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as z from "zod";
//https://github.com/renrizzolo/react-native-sectioned-multi-select
import type { Option } from "~/components/ui";
import {
  Button,
  ControlledDatePicker,
  ControlledInput,
  ControlledSelect,
  Input,
  Text,
  View,
} from "~/components/ui";
import {
  useTrackerApiViewActivityListActivities,
  useTrackerApiViewPlantListPlants,
} from "~/lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer";
import { ActivityOut, AreaOut, EntryOut, PlantOut } from "~/lib/plant_tracker/model";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { ControlledMultiSelect } from "./ui/multiselect";
import StarRating from "react-native-star-rating-widget";
import { ControlledDateTimePicker } from "./ui/datetimepicker";
import SelectPhoto from "./ui/select-photo";
import { FormError } from "./ui/form-error";

const schema = z.object({
  plant_id: z.string({
    required_error: "Plant is required",
  }),
  timestamp: z.any(),
  notes: z.string({}).optional(),
  activities: z.string().array().min(1),
  plant_health: z.number(),
  photo: z.any(),
});

type FormType = z.infer<typeof schema>;

export type ActivityEntryFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  allPlantData?: PlantOut[];
  activityData: ActivityOut[];
  plantID?: string;
  entryData: EntryOut | undefined;
};

/* eslint-disable max-lines-per-function */
export const ActivityEntryForm = ({
  onSubmit = () => {},
  allPlantData,
  activityData,
  plantID = undefined,
  entryData = undefined,
}: ActivityEntryFormProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [photoSet, setPhotoSet] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      plant_id: entryData ? entryData.plant : plantID ? plantID : undefined,
      activities: entryData ? entryData.activities : [],
      timestamp: new Date(), //entryData ? dayjs(entryData.Timestamp).toDate() : new Date(),
      plant_health: entryData ? entryData.plant_health : 0,
      notes: entryData ? entryData.notes : undefined,
    },
  });

  const handlePhotoMutate = (data: ImagePicker.ImagePickerSuccessResult) => {
    setValue("photo", {
      uri: data.assets[0].uri!,
      name: data.assets[0].fileName || `activity-${Math.random().toString(20).substr(2, 18)}`,
      type: data.assets[0].mimeType!,
    });
    setPhotoSet(true);
  };

  // build plant list for plant select
  const plantList: Option[] = [];
  allPlantData!.forEach(function (arrayItem) {
    var current: Option = { value: arrayItem.id!, label: arrayItem.name };
    plantList.push(current);
  });

  // build activity list for activity select
  const activityList: Option[] = [];
  activityData!.forEach(function (arrayItem) {
    var current: Option = { value: arrayItem.id!, label: arrayItem.name };
    activityList.push(current);
  });

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={true}
    >
      <View className='flex-1 flex-col p-4'>
        <ControlledSelect
          control={control}
          name='plant_id'
          label='Plant'
          options={plantList}
        />
        {errors.plant_id && <FormError message={errors.plant_id.message} />}

        <ControlledMultiSelect
          control={control}
          name='activities'
          items={activityList}
          selectText='Select Activities'
          label='Activities'
        />
        {errors.activities && <FormError message={errors.activities.message} />}

        <ControlledDateTimePicker
          control={control}
          name='timestamp'
          label='Activity Date'
        />
        {errors.timestamp && <FormError message={errors.timestamp.message} />}

        <Controller
          name='plant_health'
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, value } }) => (
            <View className='flex-row justify-between  py-5 pr-4'>
              <Text className='text-primary text-lg mb-1'>Plant Health</Text>

              <StarRating
                rating={value}
                starSize={20}
                enableHalfStar={false}
                onChange={onChange}
                style={{ paddingTop: 4 }}
              />
            </View>
          )}
        />
        {errors.plant_health && <FormError message={errors.plant_health.message} />}

        <ControlledInput
          control={control}
          name='notes'
          label='Notes'
          multiline
        />
        {errors.notes && <FormError message={errors.notes.message} />}

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
    </KeyboardAwareScrollView>
  );
};
