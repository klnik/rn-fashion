import type { ReactElement } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "@shopify/restyle";
import { AsyncStorage } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import type { InitialState } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import theme from "../../theme/theme";
import type { TFonts } from "../../types";
import { WelcomeAssets } from "../../screens/Welcome";
import { SlidesAssets } from "../../constants";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${
  Constants.manifest ? Constants.manifest.sdkVersion : ""
}`;

export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (
  promises: Promise<void | void[] | Asset[]>[],
  cb: () => void
) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: number[];
  children: ReactElement | ReactElement[];
}

const fonts: Record<TFonts, string> = {
  "SFProDisplay-Bold": require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("../../assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("../../assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("../../assets/fonts/SF-Pro-Display-Medium.otf"),
};
const assets = [...WelcomeAssets, ...SlidesAssets];
export const LoadAssets = ({ children }: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], fonts || {});
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );
  if (!ready || !isNavigationReady) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer {...{ onStateChange, initialState }}>
        <StatusBar style="light" />
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
};
