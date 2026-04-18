import { Insets } from "react-native";

const MIN_TAP_SIZE = 44;

export function createA11yLabel(primary: string, secondary?: string): string {
  const base = primary.trim();
  if (!secondary?.trim()) {
    return base;
  }

  return `${base}, ${secondary.trim()}`;
}

export function createHint(hint: string): string {
  return hint.trim();
}

export function getMinimumHitSlop(width: number, height: number): Insets {
  const vertical = Math.max(0, Math.ceil((MIN_TAP_SIZE - height) / 2));
  const horizontal = Math.max(0, Math.ceil((MIN_TAP_SIZE - width) / 2));

  return {
    top: vertical,
    bottom: vertical,
    left: horizontal,
    right: horizontal,
  };
}

export function createFocusableA11yProps(label: string, hint?: string) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
  };
}
