import { MatchDetail } from "../../../src/models/phase2";
import { buildMatchCenterSnapshot } from "../../../src/features/match-center/screens/matchCenterScreenModel";

const MATCH_DETAIL: MatchDetail = {
  matchId: "fixture-42",
  homeTeam: "Arsenal",
  awayTeam: "Liverpool",
  status: "live",
  score: { home: 1, away: 1 },
  info: { stadium: "Emirates Stadium", referee: "M. Oliver", attendance: 60234 },
  lineups: {
    homeFormation: "4-3-3",
    awayFormation: "4-2-3-1",
    homeStarters: [{ id: "h1", name: "Raya" }],
    awayStarters: [{ id: "a1", name: "Alisson" }],
    homeSubstitutes: [],
    awaySubstitutes: [],
  },
  stats: {
    possessionHome: 54,
    possessionAway: 46,
    shotsHome: 10,
    shotsAway: 8,
  },
  h2h: { entries: [] },
};

describe("MatchCenter snapshot", () => {
  it("matches active section state with fixture context", () => {
    const snapshot = buildMatchCenterSnapshot({
      match: MATCH_DETAIL,
      activeSection: "stats",
    });

    expect(snapshot).toMatchSnapshot();
  });
});
