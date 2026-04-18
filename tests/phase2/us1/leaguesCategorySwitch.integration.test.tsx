import { Competition } from "../../../src/features/leagues/data/mockCompetitions";
import { filterCompetitionsByCategory } from "../../../src/features/leagues/utils/competitionIndex";

const COMPETITIONS: Competition[] = [
  { id: "top-1", name: "Alpha League", category: "top", letterKey: "A" },
  { id: "domestic-1", name: "Bundesliga", category: "domestic", letterKey: "B" },
];

describe("LeaguesScreen category switching", () => {
  it("isolates competition lists per selected category", () => {
    const topCompetitions = filterCompetitionsByCategory(COMPETITIONS, "top");
    const domesticCompetitions = filterCompetitionsByCategory(COMPETITIONS, "domestic");

    expect(topCompetitions).toHaveLength(1);
    expect(topCompetitions[0]?.name).toBe("Alpha League");
    expect(domesticCompetitions).toHaveLength(1);
    expect(domesticCompetitions[0]?.name).toBe("Bundesliga");
  });
});
