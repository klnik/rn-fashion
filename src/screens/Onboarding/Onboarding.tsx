import React, { useRef } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import { BORDER_RADIUS } from "../../constants";

import { Dot } from "./Dot";
import { Slide } from "./Slide";
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

export const slides: Slide[] = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don’t worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: {
      src: require("../../assets/img/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
    picture: {
      src: require("../../assets/img/2.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      " Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
    picture: {
      src: require("../../assets/img/3.png"),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: {
      src: require("../../assets/img/4.png"),
      width: 1757,
      height: 2551,
    },
  },
];

export const Onboarding = () => {
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
            {slides.map(({ subtitle, description }, index) => (
              <Subslide
                onPress={() => {
                  if (scroll.current?.scrollTo) {
                    scroll.current.scrollTo({
                      x: width * (index + 1),
                      animated: true,
                    });
                  }
                }}
                last={index === slides.length - 1}
                key={`subslide-${index}`}
                {...{ subtitle, description }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};
