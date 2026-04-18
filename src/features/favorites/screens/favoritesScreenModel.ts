import { FavoriteItem, FavoriteType } from "../../../models/phase2";
import { FavoritesByType } from "../store/favoritesStore";

export enum FavoritesSegmentKey {
  Teams = "teams",
  Players = "players",
  Leagues = "leagues",
}

export interface FavoritesSegmentOption {
  key: FavoritesSegmentKey;
  label: string;
  favoriteType: FavoriteType;
}

export const FAVORITES_SEGMENTS: FavoritesSegmentOption[] = [
  { key: FavoritesSegmentKey.Teams, label: "Teams", favoriteType: "team" },
  { key: FavoritesSegmentKey.Players, label: "Players", favoriteType: "player" },
  { key: FavoritesSegmentKey.Leagues, label: "Leagues", favoriteType: "league" },
];

export const mapFavoritesTypeToSegment = (type: FavoriteType): FavoritesSegmentKey =>
  FAVORITES_SEGMENTS.find(segment => segment.favoriteType === type)?.key ??
  FavoritesSegmentKey.Teams;

export const mapSegmentToFavoritesType = (segment: FavoritesSegmentKey): FavoriteType =>
  FAVORITES_SEGMENTS.find(item => item.key === segment)?.favoriteType ?? "team";

export const getFavoritesForSegment = (
  itemsByType: FavoritesByType,
  segment: FavoritesSegmentKey
): FavoriteItem[] => itemsByType[mapSegmentToFavoritesType(segment)];

export interface FavoritesScreenSnapshotInput {
  activeSegment: FavoritesSegmentKey;
  itemsByType: FavoritesByType;
}

export const buildFavoritesScreenSnapshot = ({
  activeSegment,
  itemsByType,
}: FavoritesScreenSnapshotInput) => {
  const visibleItems = getFavoritesForSegment(itemsByType, activeSegment);
  const counts = {
    teams: itemsByType.team.length,
    players: itemsByType.player.length,
    leagues: itemsByType.league.length,
  };
  return {
    activeSegment,
    segmentCounts: counts,
    visibleFavoriteIds: visibleItems.map(item => item.id),
    visibleFavoriteNames: visibleItems.map(item => item.displayName),
    isEmpty: visibleItems.length === 0,
  };
};
