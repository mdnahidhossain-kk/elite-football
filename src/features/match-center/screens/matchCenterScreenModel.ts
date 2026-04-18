import { MatchDetail } from "../../../models/phase2";

export type MatchCenterSectionKey = "info" | "lineups" | "stats" | "h2h";
export type MatchCenterSurfaceState = "section" | "fallback";

export const MATCH_CENTER_SECTIONS: Array<{ key: MatchCenterSectionKey; label: string }> = [
  { key: "info", label: "Info" },
  { key: "lineups", label: "Lineups" },
  { key: "stats", label: "Stats" },
  { key: "h2h", label: "H2H" },
];

export const doesMatchSectionHaveData = (
  match: MatchDetail | null,
  section: MatchCenterSectionKey
): boolean => {
  if (!match) {
    return false;
  }

  switch (section) {
    case "info":
      return Boolean(match.info);
    case "lineups":
      return Boolean(match.lineups);
    case "stats":
      return Boolean(match.stats);
    case "h2h":
      return Boolean(match.h2h);
    default:
      return false;
  }
};

export const deriveMatchCenterSurfaceState = (
  match: MatchDetail | null,
  section: MatchCenterSectionKey
): MatchCenterSurfaceState => (doesMatchSectionHaveData(match, section) ? "section" : "fallback");

export const buildMatchCenterSnapshot = ({
  match,
  activeSection,
}: {
  match: MatchDetail | null;
  activeSection: MatchCenterSectionKey;
}) => ({
  matchId: match?.matchId ?? null,
  header: match ? `${match.homeTeam} vs ${match.awayTeam}` : null,
  status: match?.status ?? null,
  activeSection,
  availableSections: MATCH_CENTER_SECTIONS.filter(item =>
    doesMatchSectionHaveData(match, item.key)
  ).map(item => item.key),
  surfaceState: deriveMatchCenterSurfaceState(match, activeSection),
});
