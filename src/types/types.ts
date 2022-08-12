import type { ImageSourcePropType } from "react-native";

export interface ISlider {
  title: string;
  right?: boolean;
  picture: {
    src: ImageSourcePropType;
    width: number;
    height: number;
  };
}

export type TFonts =
  | "SFProDisplay-Bold"
  | "SFProDisplay-Semibold"
  | "SFProDisplay-Regular"
  | "SFProDisplay-Medium";

export type Routes = {
  Onboarding: undefined;
  Welcome: undefined;
};
