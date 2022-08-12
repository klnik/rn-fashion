import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";

import { Text } from "../../components/Text";
import { BORDER_RADIUS } from "../../constants";
import type { ISlider } from "../../types";

const { width, height } = Dimensions.get("window");
export const SLIDE_HEIGHT = 0.61 * height;
const style = StyleSheet.create({
  container: {
    width: width,
  },
  titleContainer: {
    justifyContent: "center",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "center",
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});

const transformStyle = (right?: boolean) => {
  return [
    {
      translateY: (SLIDE_HEIGHT - 100) / 2,
    },
    {
      translateX: ((right ? 1 : -1) * width) / 3,
    },
    {
      rotate: right ? "-90deg" : "90deg",
    },
  ];
};

export const Slide = ({ title, right, picture }: ISlider) => {
  return (
    <View
      style={{
        ...style.container,
      }}
    >
      <View
        style={(style.titleContainer, { transform: transformStyle(right) })}
      >
        <Text variant="hero">{title}</Text>
      </View>
    </View>
  );
};
