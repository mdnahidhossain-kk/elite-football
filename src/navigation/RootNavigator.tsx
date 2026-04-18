// Root Navigator - Bottom Tab Navigator with 5 tabs

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../types/navigation";
import { linking } from "./linking";
import { MatchesStack } from "./MatchesStack";
import { NewsStack } from "./NewsStack";
import { LeaguesStack } from "./LeaguesStack";
import { FavoritesStack } from "./FavoritesStack";
import { SearchStack } from "./SearchStack";
import { SettingsScreen } from "../features/settings/screens/SettingsScreen";
import { useTheme } from "../theme/useTheme";

const Tab = createBottomTabNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();
  const { colors } = theme.tokens;

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        }}
      >
        <Tab.Screen
          name="MatchesTab"
          component={MatchesStack}
          options={{
            tabBarLabel: "Matches",
            tabBarIcon: ({ color, size }) => <Ionicons name="football" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="NewsTab"
          component={NewsStack}
          options={{
            tabBarLabel: "News",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="LeaguesTab"
          component={LeaguesStack}
          options={{
            tabBarLabel: "Leagues",
            tabBarIcon: ({ color, size }) => <Ionicons name="trophy" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="FavoritesTab"
          component={FavoritesStack}
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="SearchTab"
          component={SearchStack}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
