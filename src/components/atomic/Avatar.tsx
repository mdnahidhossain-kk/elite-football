// Avatar Component - User/team representation

import React from "react";
import { View, Image, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/useTheme";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

const SIZE_CONFIG = {
  sm: { container: 32, fontSize: 12 },
  md: { container: 48, fontSize: 16 },
  lg: { container: 64, fontSize: 24 },
};

function getInitials(name: string): string {
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function Avatar({ src, name = "", size = "md", style }: AvatarProps) {
  const theme = useTheme();
  const { colors, radii } = theme.tokens;
  const sizeConfig = SIZE_CONFIG[size];

  if (src) {
    return (
      <Image
        source={{ uri: src }}
        style={{
          width: sizeConfig.container,
          height: sizeConfig.container,
          borderRadius: sizeConfig.container / 2,
          backgroundColor: colors.secondary,
        }}
        accessibilityLabel={name}
      />
    );
  }

  return (
    <View
      style={[
        {
          width: sizeConfig.container,
          height: sizeConfig.container,
          borderRadius: radii.full,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.secondary,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            color: "#FFFFFF",
            fontSize: sizeConfig.fontSize,
            fontWeight: "600",
          },
        ]}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  initials: {
    textAlign: "center",
  },
});
