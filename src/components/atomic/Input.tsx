// Input Component - Text input with states

import React, { useState } from "react";
import { TextInput, View, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { useTheme } from "../../theme/useTheme";
import { Typography } from "./Typography";

export type InputState = "default" | "error" | "disabled" | "focused";

export interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  state?: InputState;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  state = "default",
  containerStyle,
  ...textInputProps
}: InputProps) {
  const theme = useTheme();
  const { colors, radii, spacing } = theme.tokens;
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (state === "error" || error) return colors.error;
    if (state === "disabled") return colors.disabled;
    if (isFocused || state === "focused") return colors.focus;
    return colors.border;
  };

  const getBackgroundColor = () => {
    if (state === "disabled") return colors.surfaceHover;
    return colors.surface;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography
          variant="label"
          color={state === "disabled" ? "disabled" : "textSecondary"}
          style={{ marginBottom: spacing.xs }}
        >
          {label}
        </Typography>
      )}
      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderRadius: radii.sm,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
          },
        ]}
        placeholderTextColor={colors.textTertiary}
        editable={state !== "disabled"}
        onFocus={e => {
          setIsFocused(true);
          textInputProps.onFocus?.(e);
        }}
        onBlur={e => {
          setIsFocused(false);
          textInputProps.onBlur?.(e);
        }}
      />
      {error && (
        <Typography variant="caption" color="error" style={{ marginTop: spacing.xs }}>
          {error}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    minHeight: 44,
  },
});
