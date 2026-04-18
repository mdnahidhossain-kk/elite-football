import { MatchDetail } from "../../../src/models/phase2";
import {
  buildMatchCenterSnapshot,
  MatchCenterSectionKey,
} from "../../../src/features/match-center/screens/matchCenterScreenModel";
import {
  resetMatchDetailStore,
  useMatchDetailStore,
} from "../../../src/features/match-center/store/matchDetailStore";

const FIXTURE: MatchDetail = {
  matchId: "fixture-7",
  homeTeam: "Barcelona",
  awayTeam: "Real Madrid",
  status: "scheduled",
  info: { stadium: "Olympic Stadium" },
  lineups: {
    homeStarters: [],
    awayStarters: [],
    homeSubstitutes: [],
    awaySubstitutes: [],
  },
  stats: {},
  h2h: { entries: [] },
};

describe("Match center sections integration", () => {
  beforeEach(() => {
    resetMatchDetailStore();
  });

  it("keeps fixture identity stable while switching sections", () => {
    const state = useMatchDetailStore.getState();
    state.setMatch(FIXTURE);

    const order: MatchCenterSectionKey[] = ["info", "lineups", "stats", "h2h", "info"];
    const seenIds = order.map(section => {
      useMatchDetailStore.getState().setActiveSection(section);
      return buildMatchCenterSnapshot({
        match: useMatchDetailStore.getState().selectedMatch,
        activeSection: useMatchDetailStore.getState().activeSection,
      }).matchId;
    });

    expect(new Set(seenIds)).toEqual(new Set(["fixture-7"]));
    expect(useMatchDetailStore.getState().selectedMatch?.matchId).toBe("fixture-7");
  });
});
