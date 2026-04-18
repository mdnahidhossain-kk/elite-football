import { MatchDetail } from "../../../models/phase2/entities";

export const mockMatchDetail: MatchDetail = {
  matchId: "fixture-123",
  homeTeam: "Arsenal",
  awayTeam: "Chelsea",
  status: "live",
  score: { home: 1, away: 0 },
};
