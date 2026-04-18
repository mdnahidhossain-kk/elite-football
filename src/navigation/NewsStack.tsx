// News Stack Navigator

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewsStackParamList } from "../types/navigation";
import { NewsScreen } from "../features/news/screens/NewsScreen";
import { NewsDetailsScreen } from "../features/news/screens/NewsDetailsScreen";

const Stack = createNativeStackNavigator<NewsStackParamList>();

export function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" component={NewsScreen} options={{ title: "News" }} />
      <Stack.Screen
        name="ArticleDetails"
        component={NewsDetailsScreen}
        options={{ title: "Article" }}
      />
    </Stack.Navigator>
  );
}
