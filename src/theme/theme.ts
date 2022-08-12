import { createTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  primaryButton: "#2CB9B0",
  button: "rgba(12,13,52,0.05)",
  gray: "#f4f0ef",
  black: "#0B0B0B",
  white: "#F0F2F3",
  blackText: "#0C0D34",
};

const theme = createTheme({
  colors: {
    blackText: palette.blackText,
    white: "#fff",
    primaryButton: palette.primaryButton,
    button: palette.button,
    lightGray: palette.gray,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    12: 12,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      fontFamily: "SFProDisplay-Bold",
      color: "white",
      textAlign: "center",
    },
    title28: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "blackText",
    },
    title24: {
      fontFamily: "SFProDisplay-Semibold",
      fontSize: 24,
      color: "blackText",
      lineHeight: 30,
    },
    description: {
      fontFamily: "SFProDisplay-Regular",
      fontSize: 16,
      color: "blackText",
      lineHeight: 24,
      opacity: 0.7,
    },
    body: {
      fontFamily: "SFProDisplay-Regular",
      fontSize: 16,
      color: "blackText",
      lineHeight: 24,
      marginBottom: 40,
    },
    buttonPrimary: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Regular",
      color: "white",
    },
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Regular",
      color: "blackText",
    },
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;
// eslint-disable-next-line import/no-default-export
export default theme;
