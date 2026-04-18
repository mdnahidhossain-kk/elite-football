import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetQuickJumpProps {
  availableLetters: string[];
  onSelectLetter: (letter: string) => void;
}

export function AlphabetQuickJump({ availableLetters, onSelectLetter }: AlphabetQuickJumpProps) {
  const theme = useTheme();
  const { spacing } = theme.tokens;
  const availableSet = new Set(availableLetters);

  return (
    <View
      style={[styles.container, { paddingVertical: spacing.xs, width: spacing.lg + spacing.xs }]}
    >
      {ALPHABET.map(letter => {
        const enabled = availableSet.has(letter);
        return (
          <Pressable
            key={letter}
            accessibilityRole="button"
            accessibilityLabel={`Jump to ${letter}`}
            onPress={() => onSelectLetter(letter)}
            style={[styles.item, { minHeight: spacing.md, minWidth: spacing.lg + spacing.xs }]}
          >
            <Typography variant="labelSmall" color={enabled ? "primary" : "textTertiary"}>
              {letter}
            </Typography>
          </Pressable>
        );
      })}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Jump to symbol section"
        onPress={() => onSelectLetter("#")}
        style={[styles.item, { minHeight: spacing.md, minWidth: spacing.lg + spacing.xs }]}
      >
        <Typography variant="labelSmall" color={availableSet.has("#") ? "primary" : "textTertiary"}>
          #
        </Typography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
});
