import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { NewsArticle } from "../../../models/phase2";
import {
  buildAccessibleLabel,
  getAccessibleActionProps,
  getMinTapTargetStyle,
} from "../../shared/accessibility/phase2A11y";

interface RelatedArticlesListProps {
  items: NewsArticle[];
  onSelect: (articleId: string) => void;
}

export function RelatedArticlesList({ items, onSelect }: RelatedArticlesListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Typography variant="h3">Related stories</Typography>
      <View style={styles.list}>
        {items.map(article => (
          <Pressable
            key={article.id}
            onPress={() => onSelect(article.id)}
            style={[styles.card, getMinTapTargetStyle()]}
            {...getAccessibleActionProps({
              label: buildAccessibleLabel("Open related article", article.title),
              hint: "Navigates to the selected related story",
            })}
          >
            <Typography variant="label">{article.title}</Typography>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  list: {
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
});
