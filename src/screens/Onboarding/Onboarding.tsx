import { StackNavigationProp } from "@react-navigation/stack";
import React, { useRef } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { interpolateColor, opacity } from "react-native-redash";

import type { AuthNavigationProps } from "../../components/Navigation";
import { BORDER_RADIUS, slides } from "../../constants";
import { Routes } from "../../types";

import { Dot } from "./Dot";
import { Slide } from "./Slide";
import { SlideImage } from "./SlideImage";
import { Subslide } from "./Subslide";
const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slider: {
    height: 0.61 * height,
    width: width,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  picture: {
    width: number;
    height: number;
    src: number;
  };
}

export const Onboarding = ({
  navigation,
}: AuthNavigationProps<"Onboarding">) => {
  const x = useSharedValue(0);
  const scroll = useRef<Animated.ScrollView>(null);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });
  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }));

  const currentIndex = useDerivedValue(() => x.value / width);
  const background = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map(({ color }) => color)
    ),
  }));

  return (
    <View style={style.container}>
      <Animated.View style={[style.slider, background]}>
        {slides.map(({ picture }, index) => {
          return <SlideImage {...{ x, picture, width, index }} key={index} />;
        })}

        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...{ onScroll }}
          scrollEventThrottle={1}
        >
          {slides.map(({ title, picture }, i) => (
            <Slide
              key={`slide-${i}-${title}`}
              {...{ title, picture }}
              right={i % 2 !== 0}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={style.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, background]} />
        <View style={style.footerContent}>
          <View style={style.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} {...{ index, currentIndex }} />
            ))}
          </View>
          <Animated.View
            style={[
              footerStyle,
              {
                flexDirection: "row",
                flex: 1,
                width: width * slides.length,
              },
            ]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else if (scroll.current?.scrollTo) {
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                  key={`subslide-${index}`}
                  {...{ subtitle, description, last }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};
