import { MOCK_COMPETITIONS } from "../../../src/features/leagues/data/mockCompetitions";
import {
  filterCompetitionsByCategory,
  groupCompetitionsByLetter,
} from "../../../src/features/leagues/utils/competitionIndex";

describe("LeaguesScreen snapshot", () => {
  it("matches grouped top-competitions structure", () => {
    const topCompetitions = filterCompetitionsByCategory(MOCK_COMPETITIONS, "top");
    const grouped = groupCompetitionsByLetter(topCompetitions);

    expect(grouped).toMatchSnapshot();
  });
});
