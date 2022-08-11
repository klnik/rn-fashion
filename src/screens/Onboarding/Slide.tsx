import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

import { BORDER_RADIUS } from "../../constants";
import type { ISlider } from "../../types";

const { width, height } = Dimensions.get("window");
export const SLIDE_HEIGHT = 0.61 * height;
const style = StyleSheet.create({
  container: {
    width: width,
  },
  title: {
    fontSize: 80,
    fontFamily: "SFProDisplay-Bold",
    color: "white",
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "red",
    justifyContent: "center",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
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
      <View style={style.underlay}>
        <Image source={picture.src} style={style.picture} />
      </View>
      <View
        style={(style.titleContainer, { transform: transformStyle(right) })}
      >
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
};
