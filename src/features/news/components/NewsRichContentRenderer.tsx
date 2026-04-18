import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { ContentFallbackState } from "../../shared/components/ContentFallbackState";
import { NewsContentBlock } from "../../../models/phase2";
import { mapNewsBlocksToRenderableItems } from "./newsRichContentMapper";

interface NewsRichContentRendererProps {
  blocks: NewsContentBlock[];
}

export function NewsRichContentRenderer({ blocks }: NewsRichContentRendererProps) {
  const items = mapNewsBlocksToRenderableItems(blocks);

  return (
    <View style={styles.container}>
      {items.map(item => {
        if (item.kind === "text") {
          return (
            <Typography key={item.id} variant={item.heading ? "h3" : "body"}>
              {item.text}
            </Typography>
          );
        }

        if (item.kind === "image") {
          return (
            <View key={item.id} style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
              {item.caption ? (
                <Typography variant="caption" color="textSecondary">
                  {item.caption}
                </Typography>
              ) : null}
            </View>
          );
        }

        return (
          <ContentFallbackState
            key={item.id}
            variant="no-data"
            title="Media unavailable"
            message={item.label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  imageContainer: {
    gap: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
  },
});
