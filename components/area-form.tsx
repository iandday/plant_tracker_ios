import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Background } from "~/components/background";
import ActivityList from "~/components/plant-detail/activity-list";
import PlantInfo from "~/components/plant-detail/plantInfo";
import { PlantPhoto } from "~/components/plant-photo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  CustomBackdrop,
  Input,
  ControlledSelect,
  ControlledInput,
} from "~/components/ui";
import { BottomSheetBackgroundProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { AreaOut, LocationOut } from "~/lib/plant_tracker/model";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Option } from "~/components/ui";
import { FormError } from "./ui/form-error";
import { Keyboard } from "react-native";

const schema = z.object({
  location: z.string({
    required_error: "Location is required",
  }),
  area: z.string({
    required_error: "Area is required",
  }),
});
type FormType = z.infer<typeof schema>;

export type AreaFormProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  locationData: LocationOut[];
  areaData?: AreaOut;
  onSubmit: SubmitHandler<FormType>;
};

export default function AreaForm({
  showModal,
  setShowModal,
  onSubmit,
  locationData,
  areaData = undefined,
}: AreaFormProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["85%", "85%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
      location: areaData?.location.id,
      area: areaData?.name,
    },
  });

  const locationList: Option[] = [];
  locationData!.forEach(function (arrayItem) {
    var current: Option = { value: arrayItem.id!, label: arrayItem.name };
    locationList.push(current);
  });

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

  const [newLoc, setNewLoc] = React.useState<string>();

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={CustomBackdrop}
      backgroundComponent={CustomBackground}
    >
      <BottomSheetView className='bg-background m-4 p-2 flex-col flex-1'>
        <KeyboardAwareScrollView>
          <ControlledSelect
            control={control}
            name='location'
            label='Location'
            options={locationList}
          />
          {errors.location && <FormError message={errors.location.message} />}

          <ControlledInput
            control={control}
            name='area'
            label='Area'
          />
          {errors.area && <FormError message={errors.area.message} />}

          <Button
            label='Submit'
            onPress={handleSubmit(onSubmit)}
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
        </KeyboardAwareScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
