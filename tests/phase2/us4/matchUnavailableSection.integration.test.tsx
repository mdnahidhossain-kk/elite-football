import { MatchDetail } from "../../../src/models/phase2";
import {
  deriveMatchCenterSurfaceState,
  doesMatchSectionHaveData,
} from "../../../src/features/match-center/screens/matchCenterScreenModel";

const PARTIAL_FIXTURE: MatchDetail = {
  matchId: "fixture-9",
  homeTeam: "Inter",
  awayTeam: "Milan",
  status: "ft",
  info: { stadium: "San Siro" },
};

describe("Match center unavailable section integration", () => {
  it("returns fallback state when a selected section payload is unavailable", () => {
    expect(doesMatchSectionHaveData(PARTIAL_FIXTURE, "info")).toBe(true);
    expect(doesMatchSectionHaveData(PARTIAL_FIXTURE, "lineups")).toBe(false);
    expect(doesMatchSectionHaveData(PARTIAL_FIXTURE, "stats")).toBe(false);
    expect(doesMatchSectionHaveData(PARTIAL_FIXTURE, "h2h")).toBe(false);

    expect(deriveMatchCenterSurfaceState(PARTIAL_FIXTURE, "lineups")).toBe("fallback");
    expect(deriveMatchCenterSurfaceState(PARTIAL_FIXTURE, "stats")).toBe("fallback");
    expect(deriveMatchCenterSurfaceState(PARTIAL_FIXTURE, "h2h")).toBe("fallback");
    expect(deriveMatchCenterSurfaceState(PARTIAL_FIXTURE, "info")).toBe("section");
  });
});
