import type { CompetitionCategory } from "../data/mockCompetitions";
import type { Competition } from "../data/mockCompetitions";

export interface CompetitionSection {
  letter: string;
  items: Competition[];
}

export interface CompetitionRowHeader {
  type: "header";
  key: string;
  letter: string;
}

export interface CompetitionRowItem {
  type: "item";
  key: string;
  competition: Competition;
}

export type CompetitionRow = CompetitionRowHeader | CompetitionRowItem;

export function normalizeLetterKey(input: string): string {
  const firstChar = input.trim().charAt(0).toUpperCase();
  if (!firstChar) {
    return "#";
  }

  return /^[A-Z]$/.test(firstChar) ? firstChar : "#";
}

export function groupCompetitionsByLetter(competitions: Competition[]): CompetitionSection[] {
  const grouped = new Map<string, Competition[]>();

  for (const competition of competitions) {
    const key = normalizeLetterKey(competition.letterKey || competition.name);
    const current = grouped.get(key) ?? [];
    current.push(competition);
    grouped.set(key, current);
  }

  const sortedLetters = Array.from(grouped.keys()).sort();
  return sortedLetters.map(letter => ({
    letter,
    items: (grouped.get(letter) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

export function flattenCompetitionSections(sections: CompetitionSection[]): CompetitionRow[] {
  const rows: CompetitionRow[] = [];

  for (const section of sections) {
    rows.push({
      type: "header",
      key: `header-${section.letter}`,
      letter: section.letter,
    });

    for (const competition of section.items) {
      rows.push({
        type: "item",
        key: `item-${competition.id}`,
        competition,
      });
    }
  }

  return rows;
}

export function buildLetterRowIndex(rows: CompetitionRow[]): Record<string, number> {
  return rows.reduce<Record<string, number>>((acc, row, index) => {
    if (row.type === "header") {
      acc[row.letter] = index;
    }
    return acc;
  }, {});
}

export function resolveQuickJumpLetter(
  requestedLetter: string,
  availableLetters: string[]
): string | null {
  if (availableLetters.length === 0) {
    return null;
  }

  const normalizedRequested = normalizeLetterKey(requestedLetter);
  const normalizedAvailable = [...availableLetters].sort();

  if (normalizedAvailable.includes(normalizedRequested)) {
    return normalizedRequested;
  }

  const requestedCode = normalizedRequested.charCodeAt(0);
  const firstGreater = normalizedAvailable.find(letter => letter.charCodeAt(0) > requestedCode);
  if (firstGreater) {
    return firstGreater;
  }

  return normalizedAvailable[normalizedAvailable.length - 1] ?? null;
}

export function filterCompetitionsByCategory(
  competitions: Competition[],
  category: CompetitionCategory
): Competition[] {
  return competitions.filter(competition => competition.category === category);
}
