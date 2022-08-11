import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import type Animated from "react-native-reanimated";

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
  subtitle: {
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 24,
    color: "#0C0D34",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 12,
  },
  description: {
    fontFamily: "SFProDisplay-Regular",
    fontSize: 16,
    color: "#0C0D34",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
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
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        {...{ onPress }}
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
      />
    </View>
  );
};
