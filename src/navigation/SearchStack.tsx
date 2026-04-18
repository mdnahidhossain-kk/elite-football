// Search Stack Navigator

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../types/navigation";
import { SearchScreen } from "../features/search/screens/SearchScreen";

const Stack = createNativeStackNavigator<SearchStackParamList>();

export function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
    </Stack.Navigator>
  );
}
