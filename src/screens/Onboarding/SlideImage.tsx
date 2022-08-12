import React from "react";
import { View, StyleSheet, Image } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import theme from "../../theme/theme";

interface SlideImageProps {
  x: SharedValue<number>;
  picture: { src: any; width: number; height: number };
  width: number;
  index: number;
}
const BORDER_RADIUS = theme.borderRadii.xl;

const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomEndRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
});

export const SlideImage = ({ x, index, width, picture }: SlideImageProps) => {
  const imgStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      x.value,
      [(index - 0.5) * width, index * width, (index + 0.5) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <Animated.View style={[styles.underlay, imgStyle]} key={index}>
      <Image
        source={picture.src}
        style={{
          width: width - BORDER_RADIUS,
          height:
            ((width - theme.borderRadii.xl) * picture.height) / picture.width,
        }}
      />
    </Animated.View>
  );
};
