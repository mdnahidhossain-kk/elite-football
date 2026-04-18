import React from "react";
import { ContentFallbackState } from "../../shared/components/ContentFallbackState";
import { FavoritesSegmentKey } from "../screens/favoritesScreenModel";

const EMPTY_COPY: Record<FavoritesSegmentKey, { title: string; message: string }> = {
  teams: {
    title: "No favorite teams yet",
    message: "Save teams to quickly jump into fixtures and standings from one place.",
  },
  players: {
    title: "No favorite players yet",
    message: "Track player form by adding athletes to this list.",
  },
  leagues: {
    title: "No favorite leagues yet",
    message: "Pin leagues to keep your most-followed competitions nearby.",
  },
};

interface FavoritesEmptyStateProps {
  segment: FavoritesSegmentKey;
}

export function FavoritesEmptyState({ segment }: FavoritesEmptyStateProps) {
  const copy = EMPTY_COPY[segment];
  return (
    <ContentFallbackState
      variant="empty"
      title={copy.title}
      message={copy.message}
      testID={`favorites-empty-${segment}`}
    />
  );
}
