import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Onboarding } from "./src/screens/Onboarding";
import { LoadAssets } from "./src/components/LoadAssets";
import { Welcome } from "./src/screens/Welcome";
import type { Routes } from "./src/types";

const Stack = createStackNavigator<Routes>();
const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <LoadAssets>
      <AuthenticationNavigator />
    </LoadAssets>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
