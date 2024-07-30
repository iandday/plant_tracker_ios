import * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, CustomBackdrop } from "~/components/ui";
import * as ImagePicker from "expo-image-picker";
import { BottomSheetBackgroundProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface selectPhotoProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleMutate: any;
}

export default function SelectPhoto({ showModal, setShowModal, handleMutate }: selectPhotoProps) {
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
      setShowModal(!showModal);
      handleMutate(result);
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
      handleMutate(result);
    }
  };

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
        <Button
          label='Take New Picture'
          onPress={() => {
            captureImage();
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
  );
}
