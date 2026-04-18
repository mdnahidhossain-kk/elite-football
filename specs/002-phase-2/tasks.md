# Tasks: Phase 2 — Enhanced UI & Component Logic

**Input**: Design documents from `/specs/002-phase-2/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include snapshot and integration tests for Stages 6–10 per research/quickstart guidance.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Phase 2 mobile implementation scaffolding and shared tooling.

- [X] T001 Create Phase 2 feature folder structure for leagues, favorites, search, match-center, and news in `src/features/`
- [X] T002 Create shared typed models and route definitions scaffold in `src/models/phase2/` and `src/navigation/phase2Routes.ts`
- [X] T003 [P] Configure test setup for Jest + React Native Testing Library in `tests/setup/jest.setup.ts`
- [X] T004 [P] Add Phase 2 mock data entry points in `src/mocks/phase2/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Implement `Competition`, `FavoriteItem`, `SearchQuery`, `SearchResultItem`, `MatchDetail`, and `NewsArticle` TypeScript contracts in `src/models/phase2/entities.ts`
- [X] T006 [P] Implement validation/normalization helpers for category keys, letter keys, recents dedupe, and favorites ordering in `src/features/shared/phase2Validation.ts`
- [X] T007 Implement Zustand favorites store with per-type ordering and removal flows in `src/features/favorites/store/favoritesStore.ts`
- [X] T008 Implement search recents persistence service (MMKV preferred, AsyncStorage fallback) in `src/features/search/services/searchRecentsStorage.ts`
- [X] T009 [P] Implement shared no-data/empty/error UI states for Phase 2 surfaces in `src/features/shared/components/ContentFallbackState.tsx`
- [X] T010 [P] Implement accessibility utilities for labels, focus, and tappable target sizing in `src/features/shared/accessibility/phase2A11y.ts`
- [X] T011 [P] Add foundational tests for model validation, favorites ordering, and recents dedupe in `tests/phase2/foundational/phase2Foundations.test.ts`

**Checkpoint**: Foundation ready — user story implementation can now begin in priority order or in parallel.

---

## Phase 3: User Story 1 - Browse Competitions Directory (Priority: P1) 🎯 MVP

**Goal**: Let users browse competitions by category, quick-jump by alphabet, and open competition details.

**Independent Test**: Open leagues screen, switch categories, use alphabetical quick-jump, and open a competition detail route without using global search.

### Tests for User Story 1

- [X] T012 [P] [US1] Add leagues screen snapshot test coverage in `tests/phase2/us1/leaguesScreen.snapshot.test.tsx`
- [X] T013 [P] [US1] Add integration test for category switching and list isolation in `tests/phase2/us1/leaguesCategorySwitch.integration.test.tsx`
- [X] T014 [P] [US1] Add integration test for alphabet quick-jump and fallback behavior in `tests/phase2/us1/leaguesQuickJump.integration.test.tsx`

### Implementation for User Story 1

- [X] T015 [P] [US1] Implement competition grouping and letter index lookup utilities in `src/features/leagues/utils/competitionIndex.ts`
- [X] T016 [P] [US1] Implement category tabs component for leagues in `src/features/leagues/components/CompetitionCategoryTabs.tsx`
- [X] T017 [P] [US1] Implement alphabetical quick-jump rail component in `src/features/leagues/components/AlphabetQuickJump.tsx`
- [X] T018 [US1] Implement competitions FlashList screen with category and quick-jump orchestration in `src/features/leagues/screens/LeaguesScreen.tsx`
- [X] T019 [US1] Implement competition card item and empty-category fallback state in `src/features/leagues/components/CompetitionListItem.tsx`
- [X] T020 [US1] Wire competition selection to detail navigation contract in `src/features/leagues/navigation/openCompetitionDetail.ts`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Manage Personal Favorites (Priority: P1)

**Goal**: Let users switch favorites segments, reorder items, remove items, and see clear empty states.

**Independent Test**: Open favorites, switch tabs, reorder saved items, remove an item, and confirm persistence and immediate list updates.

### Tests for User Story 2

- [X] T021 [P] [US2] Add favorites screen snapshot test coverage in `tests/phase2/us2/favoritesScreen.snapshot.test.tsx`
- [X] T022 [P] [US2] Add integration test for segment tab isolation in `tests/phase2/us2/favoritesSegments.integration.test.tsx`
- [X] T023 [P] [US2] Add integration test for reorder persistence and remove behavior in `tests/phase2/us2/favoritesReorderRemove.integration.test.tsx`

### Implementation for User Story 2

- [X] T024 [P] [US2] Implement segmented favorites tab bar for teams/players/leagues in `src/features/favorites/components/FavoritesSegmentTabs.tsx`
- [X] T025 [P] [US2] Implement draggable favorites list item and reorder handlers in `src/features/favorites/components/FavoritesReorderListItem.tsx`
- [X] T026 [US2] Implement favorites screen orchestration with per-segment ordering in `src/features/favorites/screens/FavoritesScreen.tsx`
- [X] T027 [US2] Implement remove action and order re-normalization behavior in `src/features/favorites/services/favoritesMutations.ts`
- [X] T028 [US2] Implement segment-specific empty-state messaging in `src/features/favorites/components/FavoritesEmptyState.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Discover Content Through Search (Priority: P1)

**Goal**: Let users run global search, apply filters, and reuse recent search history.

**Independent Test**: Enter query, switch filters, validate result projection, then re-run via recent search selection.

### Tests for User Story 3

- [X] T029 [P] [US3] Add search screen snapshot test coverage in `tests/phase2/us3/searchScreen.snapshot.test.tsx`
- [X] T030 [P] [US3] Add integration test for debounced query updates and filter-scoped results in `tests/phase2/us3/searchQueryFilter.integration.test.tsx`
- [X] T031 [P] [US3] Add integration test for recent-search recall and no-results fallback in `tests/phase2/us3/searchRecents.integration.test.tsx`

### Implementation for User Story 3

- [X] T032 [P] [US3] Implement search filter chips/tabs UI in `src/features/search/components/SearchFilterBar.tsx`
- [X] T033 [P] [US3] Implement debounced search execution and projection logic in `src/features/search/services/searchEngine.ts`
- [X] T034 [P] [US3] Implement recent-search list and selection component in `src/features/search/components/RecentSearchesList.tsx`
- [X] T035 [US3] Implement global search screen orchestration and state transitions in `src/features/search/screens/SearchScreen.tsx`
- [X] T036 [US3] Implement search result routing helper for club/player/league/news destinations in `src/features/search/navigation/openSearchResult.ts`

**Checkpoint**: User Stories 1–3 are independently functional.

---

## Phase 6: User Story 4 - View Full Match Center Details (Priority: P2)

**Goal**: Let users view Info, Lineups, Stats, and H2H sections while preserving fixture context.

**Independent Test**: Open match center, switch sections repeatedly, and verify section data remains bound to the same selected fixture.

### Tests for User Story 4

- [X] T037 [P] [US4] Add match center snapshot test coverage in `tests/phase2/us4/matchCenter.snapshot.test.tsx`
- [X] T038 [P] [US4] Add integration test for section switching with stable fixture context in `tests/phase2/us4/matchSections.integration.test.tsx`
- [X] T039 [P] [US4] Add integration test for unavailable section fallback states in `tests/phase2/us4/matchUnavailableSection.integration.test.tsx`

### Implementation for User Story 4

- [X] T040 [P] [US4] Implement match-center section tab control in `src/features/match-center/components/MatchCenterSectionTabs.tsx`
- [X] T041 [P] [US4] Implement section renderers for info/lineups/stats/h2h in `src/features/match-center/components/sections/`
- [X] T042 [US4] Implement match detail state slice maintaining stable fixture identity in `src/features/match-center/store/matchDetailStore.ts`
- [X] T043 [US4] Implement match center screen with header context + section fallbacks in `src/features/match-center/screens/MatchCenterScreen.tsx`

**Checkpoint**: User Stories 1–4 are independently functional.

---

## Phase 7: User Story 5 - Read Rich News Articles (Priority: P2)

**Goal**: Let users read rich article content, share articles, and open related stories with graceful media fallbacks.

**Independent Test**: Open article, validate rich content rendering, share it, and open a related article successfully.

### Tests for User Story 5

- [X] T044 [P] [US5] Add news details snapshot test coverage in `tests/phase2/us5/newsDetails.snapshot.test.tsx`
- [X] T045 [P] [US5] Add integration test for share action and related-story navigation in `tests/phase2/us5/newsShareRelated.integration.test.tsx`
- [X] T046 [P] [US5] Add integration test for unsupported media fallback rendering in `tests/phase2/us5/newsUnsupportedMedia.integration.test.tsx`

### Implementation for User Story 5

- [X] T047 [P] [US5] Implement sanitized rich-content renderer wrapper in `src/features/news/components/NewsRichContentRenderer.tsx`
- [X] T048 [P] [US5] Implement related-articles list component in `src/features/news/components/RelatedArticlesList.tsx`
- [X] T049 [US5] Implement native share service for article URLs in `src/features/news/services/shareArticle.ts`
- [X] T050 [US5] Implement news details screen orchestration with media fallback behavior in `src/features/news/screens/NewsDetailsScreen.tsx`

**Checkpoint**: All user stories are independently functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final hardening across all stories.

- [X] T051 [P] Add cross-feature accessibility assertions for labels/focus/tap targets in `tests/phase2/polish/accessibility.integration.test.tsx`
- [X] T052 [P] Add performance-focused interaction test coverage for large lists and tab transitions in `tests/phase2/polish/performance.integration.test.tsx`
- [X] T053 Align Phase 2 implementation notes and constraints in `specs/002-phase-2/quickstart.md`
- [X] T054 Run full Phase 2 validation pass against quickstart exit criteria in `specs/002-phase-2/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phases 3–7 (User Stories)**: Depend on Phase 2.
- **Phase 8 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2.
- **US2 (P1)**: Starts after Phase 2.
- **US3 (P1)**: Starts after Phase 2.
- **US4 (P2)**: Starts after Phase 2; can proceed independently of US1–US3.
- **US5 (P2)**: Starts after Phase 2; can proceed independently of US1–US4.

### Within Each User Story

- Tests should be authored before implementation and fail first.
- Data/utilities/components before screen orchestration.
- Screen orchestration before integration polish.

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel.
- Foundational tasks T006, T009, T010, T011 can run in parallel after T005 starts.
- In each story, [P] tests can run in parallel.
- In each story, [P] components/utilities can run in parallel before orchestration tasks.
- US1–US5 can be parallelized across team members once Phase 2 is complete.

---

## Parallel Example: User Story 3

```bash
# Parallel test work
Task: "Add search screen snapshot test coverage in tests/phase2/us3/searchScreen.snapshot.test.tsx"
Task: "Add integration test for debounced query updates and filter-scoped results in tests/phase2/us3/searchQueryFilter.integration.test.tsx"
Task: "Add integration test for recent-search recall and no-results fallback in tests/phase2/us3/searchRecents.integration.test.tsx"

# Parallel implementation work
Task: "Implement search filter chips/tabs UI in src/features/search/components/SearchFilterBar.tsx"
Task: "Implement debounced search execution and projection logic in src/features/search/services/searchEngine.ts"
Task: "Implement recent-search list and selection component in src/features/search/components/RecentSearchesList.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 and Phase 2.
2. Complete US1 tasks (T012–T020).
3. Validate US1 independently.

### Incremental Delivery

1. Foundation complete (Phases 1–2).
2. Deliver US1–US3 (core discovery/personalization/search).
3. Deliver US4–US5 (deep engagement surfaces).
4. Finalize with Polish phase.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. Split US1–US3 among developers after foundation.
3. Add US4 and US5 in parallel and converge in Phase 8.

---

## Notes

- [P] tasks touch different files and avoid incomplete-task dependencies.
- [US#] labels map each task to its story for independent delivery/testing.
- All task descriptions include repository-relative file paths for immediate execution.
