import { cssInterop } from "nativewind";
import Svg from "react-native-svg";

export * from "./button";
export * from "./avatar";
export * from "./card";
export * from "./image";
export * from "./input";
export * from "./progress";
export * from "./text";
export * from "./tooltip";

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
export { SafeAreaView } from "react-native-safe-area-context";

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: "style",
  },
});
