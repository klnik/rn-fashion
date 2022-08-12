import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

import { Text, Box } from "../../components";
import { Button } from "../../components/Button/Button";
import theme from "../../theme/theme";

interface WelcomeProps {
  title?: string;
}

const { width } = Dimensions.get("window");
const picture = {
  src: require("../../assets/img/5.png"),
  width: 1200,
  height: 1200,
};
export const assets = [picture.src];
export const Welcome = ({}: WelcomeProps) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Box
        flex={1}
        borderBottomRightRadius={"xl"}
        backgroundColor="lightGray"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Image
          source={picture.src}
          style={{
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
          }}
        />
      </Box>

      <Box flex={1} borderTopLeftRadius="xl">
        <Box
          backgroundColor="lightGray"
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
        />
        <Box
          backgroundColor="white"
          borderTopLeftRadius="xl"
          flex={1}
          justifyContent="space-around"
          alignItems="center"
          padding={"xl"}
        >
          <Text variant="title24" mb={"m"}>
            Let's get started
          </Text>
          <Text variant="description" textAlign="center">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => true}
            style={{ marginVertical: 20 }}
          />
          <Button label="Join us, it's free" onPress={() => true} />
          <Button
            variant="transparent"
            label="Forgot password?"
            onPress={() => true}
          />
        </Box>
      </Box>
    </Box>
  );
};
