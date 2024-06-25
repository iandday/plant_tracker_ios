import type { ImageProps } from "expo-image";
import { Image as NImage } from "expo-image";
import { cssInterop } from "nativewind";
import * as React from "react";

export type ImgProps = ImageProps & {
  classNames?: string;
};

cssInterop(NImage, { className: "style" });

export const Image = ({
  style,
  classNames,
  placeholder = "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
  ...props
}: ImgProps) => {
  return (
    <NImage
      className={classNames}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
