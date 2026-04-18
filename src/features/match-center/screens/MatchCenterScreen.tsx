import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/atomic/Typography";
import { MatchDetail } from "../../../models/phase2";
import { useTheme } from "../../../theme/useTheme";
import { mockMatchDetail } from "../../../mocks/phase2";
import { ContentFallbackState } from "../../shared/components/ContentFallbackState";
import { MatchCenterSectionTabs } from "../components/MatchCenterSectionTabs";
import {
  MatchH2HSectionView,
  MatchInfoSectionView,
  MatchLineupsSectionView,
  MatchStatsSectionView,
} from "../components/sections";
import {
  buildMatchCenterSnapshot,
  deriveMatchCenterSurfaceState,
  MatchCenterSectionKey,
} from "./matchCenterScreenModel";
import { useMatchDetailStore } from "../store/matchDetailStore";

type MatchCenterRoute = {
  params?: {
    matchId?: string;
  };
};

interface MatchCenterScreenProps {
  route?: MatchCenterRoute;
  matchDetail?: MatchDetail;
}

const resolveMatchDetail = (matchId?: string, fallback?: MatchDetail): MatchDetail => {
  if (fallback) {
    return fallback;
  }

  if (matchId && matchId === mockMatchDetail.matchId) {
    return mockMatchDetail;
  }

  return mockMatchDetail;
};

export function MatchCenterScreen({ route, matchDetail }: MatchCenterScreenProps) {
  const theme = useTheme();
  const { colors, spacing, radii } = theme.tokens;
  const selectedMatch = useMatchDetailStore(state => state.selectedMatch);
  const activeSection = useMatchDetailStore(state => state.activeSection);
  const setMatch = useMatchDetailStore(state => state.setMatch);
  const setActiveSection = useMatchDetailStore(state => state.setActiveSection);

  React.useEffect(() => {
    const nextMatch = resolveMatchDetail(route?.params?.matchId, matchDetail);
    setMatch(nextMatch);
  }, [matchDetail, route?.params?.matchId, setMatch]);

  const surfaceState = deriveMatchCenterSurfaceState(selectedMatch, activeSection);
  const snapshot = buildMatchCenterSnapshot({ match: selectedMatch, activeSection });

  const renderActiveSection = React.useCallback(
    (section: MatchCenterSectionKey) => {
      if (!selectedMatch) {
        return null;
      }
      switch (section) {
        case "info":
          return selectedMatch.info ? <MatchInfoSectionView data={selectedMatch.info} /> : null;
        case "lineups":
          return selectedMatch.lineups ? (
            <MatchLineupsSectionView data={selectedMatch.lineups} />
          ) : null;
        case "stats":
          return selectedMatch.stats ? <MatchStatsSectionView data={selectedMatch.stats} /> : null;
        case "h2h":
          return selectedMatch.h2h ? <MatchH2HSectionView data={selectedMatch.h2h} /> : null;
        default:
          return null;
      }
    },
    [selectedMatch]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { padding: spacing.lg, gap: spacing.md }]}>
        <Typography variant="h2">Match Center</Typography>
        <View
          style={[
            styles.headerCard,
            {
              borderRadius: radii.md,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              padding: spacing.md,
              gap: spacing.xs,
            },
          ]}
        >
          <Typography variant="label">{snapshot.header ?? "Fixture unavailable"}</Typography>
          <Typography variant="caption" color="textSecondary">
            {`Fixture ID: ${snapshot.matchId ?? "N/A"} • Status: ${snapshot.status ?? "unknown"}`}
          </Typography>
        </View>

        <MatchCenterSectionTabs activeSection={activeSection} onSectionChange={setActiveSection} />

        {surfaceState === "fallback" ? (
          <ContentFallbackState
            testID="match-center-section-fallback"
            variant="no-data"
            title="Section unavailable"
            message="This section does not have data yet for the selected fixture."
          />
        ) : (
          renderActiveSection(activeSection)
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerCard: {
    borderWidth: 1,
  },
});
