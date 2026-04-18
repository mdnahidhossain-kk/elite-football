import React from "react";
import { Pressable, ScrollView, Share, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { NewsArticle } from "../../../models/phase2";
import { useTheme } from "../../../theme/useTheme";
import { mockNewsArticle, mockNewsArticles } from "../../../mocks/phase2";
import { ContentFallbackState } from "../../shared/components/ContentFallbackState";
import { NewsRichContentRenderer } from "../components/NewsRichContentRenderer";
import { RelatedArticlesList } from "../components/RelatedArticlesList";
import { openRelatedArticle } from "../navigation/openRelatedArticle";
import { shareArticle } from "../services/shareArticle";
import {
  buildNewsDetailsSnapshot,
  deriveNewsDetailsSurfaceState,
  selectRelatedArticles,
} from "./newsDetailsScreenModel";

type NewsDetailsRoute = {
  params?: {
    articleId?: string;
    source?: "featured" | "main" | "related";
  };
};

interface NewsDetailsNavigationLike {
  navigate: (routeName: string, params: { articleId: string; source: "related" }) => void;
}

interface NewsDetailsScreenProps {
  route?: NewsDetailsRoute;
  navigation?: NewsDetailsNavigationLike;
  article?: NewsArticle;
}

const resolveArticle = (articleId?: string, fallback?: NewsArticle): NewsArticle | null => {
  if (fallback) {
    return fallback;
  }

  if (!articleId) {
    return mockNewsArticle;
  }

  return mockNewsArticles.find(item => item.id === articleId) ?? null;
};

export function NewsDetailsScreen({ route, navigation, article }: NewsDetailsScreenProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;
  const selectedArticle = resolveArticle(route?.params?.articleId, article);
  const surfaceState = deriveNewsDetailsSurfaceState(selectedArticle);
  const relatedArticles = selectRelatedArticles(selectedArticle, mockNewsArticles);
  const snapshot = buildNewsDetailsSnapshot({
    article: selectedArticle,
    relatedArticles,
  });

  const handleShare = React.useCallback(async () => {
    if (!selectedArticle) {
      return;
    }
    await shareArticle(
      { title: selectedArticle.title, url: selectedArticle.shareUrl },
      { share: content => Share.share(content) }
    );
  }, [selectedArticle]);

  const handleRelatedSelect = React.useCallback(
    (relatedArticleId: string) => {
      if (!navigation) {
        return;
      }
      openRelatedArticle(navigation, relatedArticleId);
    },
    [navigation]
  );

  if (surfaceState === "fallback" || !selectedArticle) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ContentFallbackState
          variant="no-data"
          title="Article unavailable"
          message="This article could not be loaded."
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
    >
      <Typography variant="h2">{selectedArticle.title}</Typography>
      <Typography variant="caption" color="textSecondary">
        {`${selectedArticle.author ?? "Unknown author"} • ${selectedArticle.publishedAt}`}
      </Typography>

      <View
        style={[
          styles.card,
          {
            borderRadius: radii.md,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: spacing.md,
          },
        ]}
      >
        <NewsRichContentRenderer blocks={selectedArticle.contentBlocks} />
      </View>

      <Pressable
        onPress={() => {
          void handleShare();
        }}
        style={[styles.shareButton, { borderRadius: radii.sm }]}
      >
        <Typography variant="label" color="surface">
          Share article
        </Typography>
      </Pressable>

      <RelatedArticlesList items={relatedArticles} onSelect={handleRelatedSelect} />

      <Typography variant="caption" color="textSecondary">
        {`Snapshot: ${JSON.stringify(snapshot)}`}
      </Typography>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
  },
  shareButton: {
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0EA5E9",
    paddingHorizontal: 12,
  },
});
