// Favorites Stack Navigator

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesStackParamList } from "../types/navigation";
import { FavoritesScreen } from "../features/favorites/screens/FavoritesScreen";

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favorites" }} />
    </Stack.Navigator>
  );
}
