import React from "react";
import type { TextProps, TextStyle } from "react-native";
import { StyleSheet, Text as NNText } from "react-native";
import { twMerge } from "tailwind-merge";

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
}

export const Text = ({
  className = "",
  style,
  tx,
  children,
  ...props
}: Props) => {
  const textStyle = React.useMemo(
    () => twMerge("text-foreground", className),
    [className]
  );

  const nStyle = React.useMemo(
    () => StyleSheet.flatten([style]) as TextStyle,
    [style]
  );
  return (
    <NNText className={textStyle} style={nStyle} {...props}>
      {children}
    </NNText>
  );
};
