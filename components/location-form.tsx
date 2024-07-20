import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Background } from "~/components/background";
import ActivityList from "~/components/plant-detail/activity-list";
import PlantInfo from "~/components/plant-detail/plantInfo";
import { PlantPhoto } from "~/components/plant-photo";
import { Button, Text, View, TouchableOpacity, CustomBackdrop, Input } from "~/components/ui";
import { BottomSheetBackgroundProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { LocationOut } from "~/lib/plant_tracker/model";

interface LocationFormProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  locationData?: LocationOut;
  handleMutate: any;
}

export default function LocationForm({
  showModal,
  setShowModal,
  handleMutate,
  locationData = undefined,
}: LocationFormProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "25%"], []);
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
        <Input
          onChange={(e) => {
            setNewLoc(e.nativeEvent.text);
          }}
        />

        <Button
          label='Submit'
          onPress={() => {
            handleMutate(newLoc);
            setShowModal(false);
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
  );
}
