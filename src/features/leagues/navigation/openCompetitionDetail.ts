interface LeaguesNavigationLike {
  navigate: (screen: "LeagueDetails", params: { leagueId: string }) => void;
}

export function openCompetitionDetail(navigation: LeaguesNavigationLike, competitionId: string) {
  navigation.navigate("LeagueDetails", { leagueId: competitionId });
}
