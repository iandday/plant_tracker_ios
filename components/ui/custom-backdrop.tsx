import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const CustomBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "000000",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} className="bg-background" />;
};
