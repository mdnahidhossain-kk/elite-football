// Card Component - Container with variants

import React from "react";
import { View, ViewStyle, Pressable } from "react-native";
import { useTheme } from "../../theme/useTheme";
import { SpacingScale } from "../../types/theme";

export type CardVariant = "default" | "elevated" | "flat";
export type CardPadding = keyof SpacingScale;

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ variant = "default", padding = "md", onPress, children, style }: CardProps) {
  const theme = useTheme();
  const { colors, radii, shadows, spacing } = theme.tokens;

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing[padding],
    };

    switch (variant) {
      case "elevated":
        return {
          ...baseStyle,
          ...shadows.md,
          shadowColor: "#000",
        };
      case "flat":
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case "default":
      default:
        return baseStyle;
    }
  };

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          getCardStyle(),
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          style,
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[getCardStyle(), style]}>{children}</View>;
}
