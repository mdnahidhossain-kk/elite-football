// Leagues Stack Navigator

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LeaguesStackParamList } from "../types/navigation";
import { LeaguesScreen } from "../features/leagues/screens/LeaguesScreen";

const Stack = createNativeStackNavigator<LeaguesStackParamList>();

export function LeaguesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Leagues" component={LeaguesScreen} options={{ title: "Leagues" }} />
    </Stack.Navigator>
  );
}
