import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import type Animated from "react-native-reanimated";

import { Text } from "../../components/Text";
import { Button } from "../../components/Button/Button";
const { width, height } = Dimensions.get("window");
interface ISubslider {
  subtitle: string;
  description: string;
  onPress: () => void;
  last?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
    width: width,
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
    src?: number;
  };
}

export const Subslide = ({
  subtitle,
  description,
  last,
  onPress,
}: ISubslider) => {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <Text variant={"title24"} textAlign="center" marginTop={"xl"}>
        {subtitle}
      </Text>
      <Text variant="description" mb="l" textAlign={"center"}>
        {description}
      </Text>
      <Button
        {...{ onPress }}
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
      />
    </View>
  );
};
