export type CompetitionCategory = "top" | "domestic" | "international" | "cups";

export interface Competition {
  id: string;
  name: string;
  category: CompetitionCategory;
  letterKey: string;
  country?: string;
}

export const CATEGORY_OPTIONS: Array<{ key: CompetitionCategory; label: string }> = [
  { key: "top", label: "Top" },
  { key: "domestic", label: "Domestic" },
  { key: "international", label: "International" },
  { key: "cups", label: "Cups" },
];

export const MOCK_COMPETITIONS: Competition[] = [
  { id: "epl", name: "Premier League", category: "top", letterKey: "P", country: "England" },
  { id: "laliga", name: "La Liga", category: "top", letterKey: "L", country: "Spain" },
  { id: "seriea", name: "Serie A", category: "top", letterKey: "S", country: "Italy" },
  {
    id: "bundesliga",
    name: "Bundesliga",
    category: "domestic",
    letterKey: "B",
    country: "Germany",
  },
  { id: "ligue1", name: "Ligue 1", category: "domestic", letterKey: "L", country: "France" },
  {
    id: "champions",
    name: "UEFA Champions League",
    category: "international",
    letterKey: "U",
  },
  { id: "europa", name: "UEFA Europa League", category: "international", letterKey: "U" },
  { id: "facup", name: "FA Cup", category: "cups", letterKey: "F", country: "England" },
  { id: "copadelrey", name: "Copa del Rey", category: "cups", letterKey: "C", country: "Spain" },
];
