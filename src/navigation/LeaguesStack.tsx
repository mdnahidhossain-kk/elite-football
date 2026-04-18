// Leagues Stack Navigator

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { LeaguesStackParamList } from "../types/navigation";
import { LeaguesScreen } from "../features/leagues/screens/LeaguesScreen";
import { Typography } from "../components/atomic/Typography";

const Stack = createNativeStackNavigator<LeaguesStackParamList>();

function LeagueDetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h3">League Details</Typography>
    </View>
  );
}

export function LeaguesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Leagues" component={LeaguesScreen} options={{ title: "Leagues" }} />
      <Stack.Screen
        name="LeagueDetails"
        component={LeagueDetailsScreen}
        options={{ title: "League Details" }}
      />
    </Stack.Navigator>
  );
}
