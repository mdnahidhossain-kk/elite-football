import { AccessibilityInfo, findNodeHandle, StyleProp, ViewStyle } from "react-native";

export const MIN_TAP_TARGET_SIZE = 44;

export interface AccessibleActionConfig {
  label: string;
  hint?: string;
  disabled?: boolean;
}

export const buildAccessibleLabel = (...parts: Array<string | undefined | null>): string =>
  parts
    .filter((part): part is string => Boolean(part && part.trim()))
    .map(part => part.trim())
    .join(", ");

export const getMinTapTargetStyle = (size = MIN_TAP_TARGET_SIZE): StyleProp<ViewStyle> => ({
  minWidth: size,
  minHeight: size,
  justifyContent: "center",
  alignItems: "center",
});

export const getAccessibleActionProps = (config: AccessibleActionConfig) => ({
  accessibilityRole: "button" as const,
  accessibilityLabel: config.label,
  accessibilityHint: config.hint,
  accessibilityState: { disabled: Boolean(config.disabled) },
});

export const focusNodeForAccessibility = (node: Parameters<typeof findNodeHandle>[0]): void => {
  const reactTag = findNodeHandle(node);
  if (reactTag) {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  }
};
