import { Competition } from "../../../src/features/leagues/data/mockCompetitions";
import {
  groupCompetitionsByLetter,
  resolveQuickJumpLetter,
} from "../../../src/features/leagues/utils/competitionIndex";

const COMPETITIONS: Competition[] = [
  { id: "top-1", name: "Alpha League", category: "top", letterKey: "A" },
  { id: "top-2", name: "Championship", category: "top", letterKey: "C" },
];

describe("LeaguesScreen quick jump", () => {
  it("resolves to nearest available fallback letter when requested letter is missing", () => {
    const sections = groupCompetitionsByLetter(COMPETITIONS);
    const availableLetters = sections.map(section => section.letter);

    expect(resolveQuickJumpLetter("B", availableLetters)).toBe("C");
  });
});
