// Button Component - 4 variants: primary, secondary, outline, ghost

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../theme/useTheme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// Size styles
const SIZE_STYLES = {
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
  },
};

export function Button({
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const theme = useTheme();
  const { colors, radii } = theme.tokens;
  const sizeStyle = SIZE_STYLES[size];

  const getBackgroundColor = () => {
    if (disabled) return colors.disabled;
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondary;
      case "outline":
      case "ghost":
        return "transparent";
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.surface;
    switch (variant) {
      case "primary":
      case "secondary":
        return "#FFFFFF";
      case "outline":
      case "ghost":
        return colors.primary;
      default:
        return "#FFFFFF";
    }
  };

  const getBorderStyle = () => {
    if (variant === "outline") {
      return {
        borderWidth: 1,
        borderColor: disabled ? colors.disabled : colors.primary,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: radii.md,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
        },
        getBorderStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: sizeStyle.fontSize,
              fontWeight: "600",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  text: {
    textAlign: "center",
  },
});
