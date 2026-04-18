// Typography Component - Text hierarchy component

import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "../../theme/useTheme";
import { ColorPalette } from "../../types/theme";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "label"
  | "labelSmall"
  | "caption";
export type TextAlign = "left" | "center" | "right";

export interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  color?: keyof ColorPalette;
  align?: TextAlign;
  numberOfLines?: number;
  style?: TextStyle;
}

export function Typography({
  variant = "body",
  children,
  color = "text",
  align = "left",
  numberOfLines,
  style,
}: TypographyProps) {
  const theme = useTheme();
  const { typography, colors } = theme.tokens;

  const variantStyle = typography[variant];

  const getColor = () => {
    const colorValue = colors[color];
    if (!colorValue) return colors.text;
    return colorValue;
  };

  return (
    <Text
      style={[
        styles.base,
        {
          fontSize: variantStyle.fontSize,
          lineHeight: variantStyle.lineHeight,
          fontWeight: variantStyle.fontWeight,
          color: getColor(),
          textAlign: align,
          letterSpacing: variantStyle.letterSpacing ?? 0,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    // Base style
  },
});
