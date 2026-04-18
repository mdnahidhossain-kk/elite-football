import type { StyleProp, ViewStyle } from "react-native";

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

type ReactNativeA11yRuntime = {
  AccessibilityInfo?: {
    setAccessibilityFocus?: (reactTag: number) => void;
  };
  findNodeHandle?: (node: unknown) => number | null;
};

export const focusNodeForAccessibility = (
  node: unknown,
  runtime?: ReactNativeA11yRuntime | null
): void => {
  if (!runtime?.findNodeHandle || !runtime.AccessibilityInfo?.setAccessibilityFocus) {
    return;
  }
  const reactTag = runtime.findNodeHandle(node);
  if (reactTag) {
    runtime.AccessibilityInfo.setAccessibilityFocus(reactTag);
  }
};
