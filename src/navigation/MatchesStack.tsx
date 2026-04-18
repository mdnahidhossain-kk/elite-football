// Matches Stack Navigator

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MatchesStackParamList } from "../types/navigation";
import { MatchesScreen } from "../features/matches/screens/MatchesScreen";

const Stack = createNativeStackNavigator<MatchesStackParamList>();

export function MatchesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Matches" component={MatchesScreen} options={{ title: "Matches" }} />
    </Stack.Navigator>
  );
}
