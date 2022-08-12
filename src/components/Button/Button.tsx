import { useTheme } from "@shopify/restyle";
import React from "react";
import { StyleSheet } from "react-native";
import type { RectButtonProperties } from "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";

import { Box } from "..";
import type { Theme } from "../../theme/theme";
import { Text } from "../Text";
interface IButton {
  variant: "primary" | "default" | "transparent";
  label: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const Button = ({ variant, label, onPress, style }: IButton) => {
  const theme = useTheme<Theme>();
  let backgroundColor = theme.colors.button;

  if (variant === "primary") {
    backgroundColor = theme.colors.primaryButton;
  } else if (variant === "transparent") {
    backgroundColor = "transparent";
  }
  return (
    <RectButton
      style={[styles.container, style, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text variant={variant === "primary" ? "buttonPrimary" : "button"}>
        {label}
      </Text>
    </RectButton>
  );
};

Button.defaultProps = {
  variant: "default",
};
