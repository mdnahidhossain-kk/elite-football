import { create } from "zustand";
import { MatchDetail } from "../../../models/phase2";
import { MatchCenterSectionKey } from "../screens/matchCenterScreenModel";

interface MatchDetailStoreState {
  selectedMatch: MatchDetail | null;
  activeSection: MatchCenterSectionKey;
  setMatch: (match: MatchDetail) => void;
  setActiveSection: (section: MatchCenterSectionKey) => void;
  reset: () => void;
}

export const DEFAULT_MATCH_SECTION: MatchCenterSectionKey = "info";

export const useMatchDetailStore = create<MatchDetailStoreState>(set => ({
  selectedMatch: null,
  activeSection: DEFAULT_MATCH_SECTION,
  setMatch: match =>
    set({
      selectedMatch: match,
      activeSection: DEFAULT_MATCH_SECTION,
    }),
  setActiveSection: section =>
    set(state => ({
      selectedMatch: state.selectedMatch,
      activeSection: section,
    })),
  reset: () =>
    set({
      selectedMatch: null,
      activeSection: DEFAULT_MATCH_SECTION,
    }),
}));

export const resetMatchDetailStore = (): void => {
  useMatchDetailStore.getState().reset();
};
