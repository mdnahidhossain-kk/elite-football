import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { Typography } from "../../../components/atomic/Typography";
import { useTheme } from "../../../theme/useTheme";
import { LeaguesScreenProps } from "../../../types/navigation";
import {
  CATEGORY_OPTIONS,
  Competition,
  CompetitionCategory,
  MOCK_COMPETITIONS,
} from "../data/mockCompetitions";
import { CompetitionCategoryTabs } from "../components/CompetitionCategoryTabs";
import { AlphabetQuickJump } from "../components/AlphabetQuickJump";
import { CompetitionListItem, EmptyCategoryState } from "../components/CompetitionListItem";
import { openCompetitionDetail } from "../navigation/openCompetitionDetail";
import {
  CompetitionRow,
  buildLetterRowIndex,
  filterCompetitionsByCategory,
  flattenCompetitionSections,
  groupCompetitionsByLetter,
  resolveQuickJumpLetter,
} from "../utils/competitionIndex";

interface LeaguesScreenOverrides {
  competitions?: Competition[];
  onQuickJumpResolved?: (letter: string | null) => void;
}

export function LeaguesScreen({
  navigation,
  competitions = MOCK_COMPETITIONS,
  onQuickJumpResolved,
}: LeaguesScreenProps & LeaguesScreenOverrides) {
  const theme = useTheme();
  const { colors, spacing } = theme.tokens;
  const [activeCategory, setActiveCategory] = useState<CompetitionCategory>("top");
  const listRef = useRef<FlashListRef<CompetitionRow> | null>(null);

  const filteredCompetitions = useMemo(
    () => filterCompetitionsByCategory(competitions, activeCategory),
    [activeCategory, competitions]
  );

  const sections = useMemo(
    () => groupCompetitionsByLetter(filteredCompetitions),
    [filteredCompetitions]
  );
  const rows = useMemo(() => flattenCompetitionSections(sections), [sections]);
  const letterRowIndex = useMemo(() => buildLetterRowIndex(rows), [rows]);
  const availableLetters = useMemo(() => sections.map(section => section.letter), [sections]);

  const handleQuickJump = (letter: string) => {
    const resolved = resolveQuickJumpLetter(letter, availableLetters);
    onQuickJumpResolved?.(resolved);
    if (!resolved) {
      return;
    }

    const targetIndex = letterRowIndex[resolved];
    if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex < rows.length) {
      try {
        listRef.current?.scrollToIndex({ index: targetIndex, animated: true });
      } catch {
        // FlashList can throw if layout isn't ready; safe to ignore and keep screen stable.
        if (__DEV__) {
          console.warn("Leagues quick-jump could not scroll to index", targetIndex);
        }
      }
    }
  };

  const renderRow = useCallback(
    ({ item }: { item: CompetitionRow }) => {
      if (item.type === "header") {
        return (
          <Typography variant="label" color="textSecondary" style={styles.sectionHeader}>
            {item.letter}
          </Typography>
        );
      }

      return (
        <CompetitionListItem
          competition={item.competition}
          onPress={competition => openCompetitionDetail(navigation, competition.id)}
        />
      );
    },
    [navigation]
  );

  const categoryLabel =
    CATEGORY_OPTIONS.find(category => category.key === activeCategory)?.label ?? "Selected";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing.lg, gap: spacing.md }]}>
        <Typography variant="h2">Leagues</Typography>
        <CompetitionCategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </View>

      <View style={styles.content}>
        <View
          style={[styles.listContainer, { paddingHorizontal: spacing.lg, paddingTop: spacing.md }]}
        >
          {rows.length === 0 ? (
            <EmptyCategoryState categoryLabel={categoryLabel} />
          ) : (
            <FlashList
              ref={listRef}
              data={rows}
              keyExtractor={row => row.key}
              renderItem={renderRow}
            />
          )}
        </View>

        <AlphabetQuickJump availableLetters={availableLetters} onSelectLetter={handleQuickJump} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  listContainer: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 12,
    marginBottom: 8,
  },
});
