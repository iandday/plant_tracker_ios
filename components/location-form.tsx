import * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, CustomBackdrop, ControlledInput } from "~/components/ui";
import { BottomSheetBackgroundProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { LocationOut } from "~/lib/plant_tracker/model";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "./ui/form-error";

const schema = z.object({
  name: z.string({
    required_error: "Location is required",
  }),
});
type FormType = z.infer<typeof schema>;

export type LocationFormProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  locationData?: LocationOut;
  onSubmit: SubmitHandler<FormType>;
};

export default function LocationForm({
  showModal,
  setShowModal,
  onSubmit,
  locationData = undefined,
}: LocationFormProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["75%", "75%"], []);
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
      name: locationData?.name,
    },
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
      <BottomSheetView className='bg-background flex-1 p-4'>
        <ControlledInput
          control={control}
          name='name'
          label='Name'
        />
        {errors.name && <FormError message={errors.name.message} />}

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
      </BottomSheetView>
    </BottomSheetModal>
  );
}
