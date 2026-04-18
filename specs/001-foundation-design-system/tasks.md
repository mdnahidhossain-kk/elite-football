---
description: "Implementation tasks for Phase 1 — Foundation & Design System"
---

# Tasks: Phase 1 — Foundation & Design System

**Input**: Design documents from `specs/001-foundation-design-system/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/navigation.ts ✅

**Status**: Ready for development  
**Branch**: `001-foundation-design-system`  
**Total Tasks**: 38 implementation + testing tasks

**Organization**: Tasks grouped by user story (US1–US5) to enable independent implementation. Each story is independently testable and deliverable.

---

## Format: `- [ ] [ID] [P?] [Story] Description with file path`

- **Checkbox**: `- [ ]` (markdown checkbox)
- **Task ID**: Sequential (T001, T002, ...) in execution order
- **[P]**: Parallelizable (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, US3, US4, US5) — Setup/Foundational tasks have no label
- **Description**: Clear action with exact file path
- **Example**: `- [ ] T005 [P] [US1] Create Button component in src/components/atomic/Button.tsx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling configuration (Stages 1)

**Checkpoint**: All tasks here must complete before user story work begins. No blockers between setup and stories.

- [ ] T001 Initialize Expo project with TypeScript strict mode (`app.json`, `tsconfig.json`)
- [ ] T002 [P] Install core dependencies (react-native, expo-sdk, react-navigation, zustand, reanimated, flash-list, expo-image, zod, eslint, prettier, husky)
- [ ] T003 [P] Configure TypeScript strict mode in `tsconfig.json` (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`)
- [ ] T004 [P] Configure path aliases in `tsconfig.json` (`@components/*`, `@features/*`, `@navigation/*`, `@store/*`, `@hooks/*`, `@utils/*`, `@types/*`, `@api/*`)
- [ ] T005 [P] Configure ESLint (`.eslintrc.js`) with Airbnb rules + custom token-only color enforcement
- [ ] T006 [P] Configure Prettier (`.prettierrc`) for consistent formatting (2-space indents, trailing commas, semicolons)
- [ ] T007 [P] Configure Husky pre-commit hooks (`.husky/pre-commit`) to run ESLint + Prettier before commits
- [ ] T008 [P] Configure Jest (jest.config.js) + React Native Testing Library for test execution
- [ ] T009 Create folder structure: `src/theme/`, `src/components/`, `src/features/`, `src/navigation/`, `src/store/`, `src/hooks/`, `src/utils/`, `src/types/`, `src/api/`, `__tests__/`

**Checkpoint**: Setup complete. All tooling enforces Constitution principles. TypeScript strict mode prevents compilation.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work begins until this phase completes.

- [ ] T010 [P] Define design tokens in `src/tokens.ts` (all color palettes: light + dark, spacing scale 4-48, typography scale, shadows, radii)
- [ ] T011 [P] Create Theme types in `src/types/theme.ts` (Theme, DesignTokens, ColorPalette, SpacingScale, TypographyScale, ShadowScale, BorderRadiiScale)
- [ ] T012 [P] Create Zustand theme store in `src/store/themeStore.ts` (mode, modeOverride, setMode, toggleMode, persistence hooks)
- [ ] T013 [P] Create ThemeProvider Context in `src/theme/ThemeProvider.tsx` (wraps app, provides tokens to descendants)
- [ ] T014 [P] Create `useTheme()` hook in `src/theme/useTheme.ts` (returns current tokens + actions, enforces Context usage)
- [ ] T015 Create navigation types in `src/types/navigation.ts` (RootStackParamList, all stack param lists, route names enum)
- [ ] T016 [P] Create React Navigation linking config in `src/navigation/linking.ts` (deep linking URIs, type-safe route mapping)
- [ ] T017 Unit test: Design tokens validation in `src/tokens.test.ts` (verify all colors exist, spacing is multiple of 4, contrast ≥ 4.5:1)
- [ ] T018 Unit test: Zustand theme store in `src/store/themeStore.test.ts` (setMode, toggleMode, store subscriptions)
- [ ] T019 Unit test: `useTheme()` hook in `src/theme/useTheme.test.ts` (hook returns correct tokens, updates on theme change)
- [ ] T020 Unit test: Navigation types in `src/types/navigation.test.ts` (all routes compile, param types match)

**Checkpoint**: Foundation complete. All atomic components can now build on tokens + theme. Navigation types are type-safe.

---

## Phase 3: User Story 1 — Developer Environment Setup (Priority: P1) 🎯

**Goal**: Developer can clone repo, run `npm install && npm run dev`, and immediately start building with full tooling support (no manual config needed)

**Independent Test**: Fresh clone → ESLint passes → TypeScript zero errors → Path aliases resolve → Husky blocks bad commits → All tooling works

### Tests for User Story 1

- [ ] T021 Integration test: Project compiles with zero TypeScript errors in `src/app.test.ts`
- [ ] T022 Integration test: ESLint passes on entire `src/` directory in `src/__tests__/lint.test.ts`
- [ ] T023 Integration test: Path aliases resolve correctly in `src/__tests__/paths.test.ts` (import @components/Button resolves)
- [ ] T024 Integration test: Pre-commit hook blocks commits with linting violations in `.husky/__tests__/husky.test.ts`

### Implementation for User Story 1

- [ ] T025 [US1] Create root App component (`src/app.tsx`) wrapping ThemeProvider + RootNavigator
- [ ] T026 [US1] Add npm scripts to `package.json`: `dev`, `lint`, `lint:fix`, `type-check`, `test`, `build:preview`, `build:ios`, `build:android`
- [ ] T027 [P] [US1] Create `src/app.json` with app metadata (name, version, splash screen, icon paths)
- [ ] T028 [P] [US1] Create `.gitignore` + `.prettierignore` + `.eslintignore` (node_modules, .expo, build outputs, test coverage)
- [ ] T029 [US1] Create README.md in repo root with quick start instructions (clone → install → npm run dev)
- [ ] T030 [US1] Verify developer setup performance: App cold start <2s FCP (benchmark in React Profiler)

**Checkpoint**: Developer environment is rock-solid. Any developer can clone → setup → build in <10 minutes.

---

## Phase 4: User Story 2 — Design System & Theme Engine (Priority: P1)

**Goal**: Design tokens and theme switching work flawlessly. Component Catalog displays all 5 atomic components in Light + Dark themes. Theme toggle updates entire app <100ms.

**Independent Test**: Component Catalog screen shows all 5 components (Button, Typography, Input, Avatar, Card) in both themes. Toggling themes updates all components instantly without state loss or jank.

### Tests for User Story 2

- [ ] T031 [P] Integration test: Button component renders all 4 variants in both themes in `src/components/atomic/__tests__/Button.integration.test.tsx`
- [ ] T032 [P] Integration test: Typography component renders all variants (H1–H4, body, caption) in `src/components/atomic/__tests__/Typography.integration.test.tsx`
- [ ] T033 [P] Integration test: Input component renders states (default, error, disabled, focused) in `src/components/atomic/__tests__/Input.integration.test.tsx`
- [ ] T034 [P] Integration test: Avatar component renders sizes (sm, md, lg) in `src/components/atomic/__tests__/Avatar.integration.test.tsx`
- [ ] T035 [P] Integration test: Card component renders variants (default, elevated, flat) in `src/components/atomic/__tests__/Card.integration.test.tsx`
- [ ] T036 Integration test: Theme toggle updates all components <100ms in `src/__tests__/themeToggle.integration.test.ts`
- [ ] T037 Integration test: Snapshots for Button variants (8 snapshots: 4 variants × 2 themes) in snapshot test

### Implementation for User Story 2

- [ ] T038 [P] [US2] Create Button component in `src/components/atomic/Button.tsx` (variants: primary, secondary, outline, ghost + sizes/states)
- [ ] T039 [P] [US2] Create Typography component in `src/components/atomic/Typography.tsx` (variants: H1–H4, body, caption + semantic colors)
- [ ] T040 [P] [US2] Create Input component in `src/components/atomic/Input.tsx` (states: default, error, disabled, focused + keyboard types)
- [ ] T041 [P] [US2] Create Avatar component in `src/components/atomic/Avatar.tsx` (sizes: sm, md, lg + image + fallback initials)
- [ ] T042 [P] [US2] Create Card component in `src/components/atomic/Card.tsx` (variants: default, elevated, flat + padding options)
- [ ] T043 [US2] Create Component Catalog screen in `src/features/leagues/ComponentCatalog.tsx` (dev tool: displays all 5 components in both themes)
- [ ] T044 [US2] Create Settings screen in `src/features/settings/SettingsScreen.tsx` (theme toggle + future user preferences)
- [ ] T045 [P] [US2] Create `src/utils/contrast.ts` utility to validate color contrast (verify all text colors ≥ 4.5:1)
- [ ] T046 [P] [US2] Performance test: Theme toggle responds <100ms (React Profiler benchmark) in `src/__tests__/performance.test.ts`

**Checkpoint**: Design system is complete. All atomic components exist and are pixel-perfect in both themes. No hard-coded colors/spacing anywhere in component code.

---

## Phase 5: User Story 3 — Navigation Architecture & Bottom Tab Bar (Priority: P1)

**Goal**: App has 5-tab bottom navigation (Matches · News · Leagues · Favorites · Search). Swiping back works. Tabs preserve stack state. Animated icons provide visual feedback.

**Independent Test**: Tap all 5 tabs → each navigates smoothly. Drill 3 levels deep in one tab → switch tabs → return → stack state preserved. Icons animate on tab change.

### Tests for User Story 3

- [ ] T047 [P] Integration test: All 5 tab navigation routes exist in `src/navigation/__tests__/navigation.integration.test.ts`
- [ ] T048 [P] Integration test: RootNavigator renders with all 5 tabs visible in `src/navigation/__tests__/RootNavigator.integration.test.tsx`
- [ ] T049 [P] Integration test: Tab switching <300ms with zero jank in `src/__tests__/navigation.performance.test.ts`
- [ ] T050 Integration test: Stack state preserved when switching tabs in `src/navigation/__tests__/stackState.integration.test.ts`
- [ ] T051 Integration test: Deep linking works (elitef://matches/123 → MatchDetails) in `src/navigation/__tests__/deepLinking.integration.test.ts`

### Implementation for User Story 3

- [ ] T052 [US3] Create RootNavigator (BottomTabNavigator) in `src/navigation/RootNavigator.tsx` with 5 tabs + Settings modal
- [ ] T053 [P] [US3] Create MatchesStack (NativeStackNavigator) in `src/navigation/MatchesStack.tsx` (Matches → MatchDetails → PlayerStats)
- [ ] T054 [P] [US3] Create NewsStack (NativeStackNavigator) in `src/navigation/NewsStack.tsx` (News → ArticleDetails)
- [ ] T055 [P] [US3] Create LeaguesStack (NativeStackNavigator) in `src/navigation/LeaguesStack.tsx` (Leagues → LeagueDetails + ComponentCatalog)
- [ ] T056 [P] [US3] Create FavoritesStack (NativeStackNavigator) in `src/navigation/FavoritesStack.tsx` (Favorites)
- [ ] T057 [P] [US3] Create SearchStack (NativeStackNavigator) in `src/navigation/SearchStack.tsx` (Search)
- [ ] T058 [P] [US3] Create Reanimated animated icons for each tab in `src/components/common/AnimatedTabIcon.tsx`
- [ ] T059 [US3] Create placeholder screens for all 5 tabs (Matches, News, Leagues, Favorites, Search) with mock data
- [ ] T060 [US3] Integrate linking config + deep linking verification
- [ ] T061 [P] [US3] Performance verify: Tab switch animation completes <200ms without frame drops

**Checkpoint**: Navigation is seamless. 5 hubs are accessible. State preservation works. All gestures (swipe-back iOS, back button Android) function.

---

## Phase 6: User Story 4 — Matches Screen Skeleton & Structure (Priority: P2)

**Goal**: Matches screen displays all fixtures (mock data) for today/tomorrow/yesterday. Calendar header lets user switch dates. Match cards grouped by league. FlashList scrolling at 60 fps. Team crests use blurhash placeholders.

**Independent Test**: Calendar header functional (date switching). Match list scrolls at 60 fps. Team images load with blurhash placeholders visible first. No jank on mid-range devices.

### Tests for User Story 4

- [ ] T062 [P] Integration test: CalendarHeader renders date chips in `src/features/matches/components/__tests__/CalendarHeader.integration.test.tsx`
- [ ] T063 [P] Integration test: Match cards render with mock data in `src/features/matches/components/__tests__/MatchCard.integration.test.tsx`
- [ ] T064 Integration test: FlashList scrolls at 60 fps in `src/features/matches/__tests__/MatchesScreen.performance.test.ts`
- [ ] T065 [P] Integration test: Blurhash placeholders appear before images load in `src/__tests__/imageLoading.integration.test.ts`
- [ ] T066 Integration test: Fixtures grouped by league correctly in `src/features/matches/__tests__/fixtureGrouping.test.ts`

### Implementation for User Story 4

- [ ] T067 [P] [US4] Create CalendarHeader component in `src/features/matches/components/CalendarHeader.tsx` (date chips: Yesterday, Today, Tomorrow)
- [ ] T068 [P] [US4] Create MatchCard component in `src/components/common/MatchCard.tsx` (team crests, score, live minute, status badge)
- [ ] T069 [P] [US4] Create FixtureGrouping utility in `src/features/matches/utils/groupFixtures.ts` (organize by league)
- [ ] T070 [US4] Create MatchesScreen in `src/features/matches/screens/MatchesScreen.tsx` (calendar header + FlashList of match cards)
- [ ] T071 [US4] Add mock match data in `src/features/matches/fixtures/mockData.ts` (100+ fixtures for testing scroll performance)
- [ ] T072 [P] [US4] Configure team crest images with blurhash placeholders (use expo-image)
- [ ] T073 [US4] Performance verify: Matches screen scrolls at 60 fps with 100+ items

**Checkpoint**: Matches screen is visually complete and performant. Scrolling is smooth. Calendar navigation works.

---

## Phase 7: User Story 5 — News Feed Skeleton & Structure (Priority: P2)

**Goal**: News screen displays hero carousel (swipeable featured articles) + main feed (standard article cards) + horizontal widgets ("Transfer Rumors"). All mock data. Mock content loads instantly. Carousel parallax/collapsible header. All text meets WCAG AA contrast.

**Independent Test**: Hero carousel swipes smoothly. Main feed scrolls at 60 fps. Horizontal widgets independent scroll (don't affect main scroll). All text contrast verified ≥ 4.5:1.

### Tests for User Story 5

- [ ] T074 [P] Integration test: HeroCarousel renders featured articles in `src/features/news/components/__tests__/HeroCarousel.integration.test.tsx`
- [ ] T075 [P] Integration test: Article cards render with images in `src/components/common/__tests__/ArticleCard.integration.test.tsx`
- [ ] T076 Integration test: News feed scrolls at 60 fps in `src/features/news/__tests__/NewsScreen.performance.test.ts`
- [ ] T077 [P] Integration test: Gradient overlays ensure 4.5:1 text contrast in `src/__tests__/contrast.integration.test.ts`
- [ ] T078 [P] Integration test: Horizontal widgets scroll independently in `src/features/news/components/__tests__/NewsWidgets.integration.test.tsx`

### Implementation for User Story 5

- [ ] T079 [P] [US5] Create HeroCarousel component in `src/features/news/components/HeroCarousel.tsx` (swipeable carousel, dot indicators, gradient overlay)
- [ ] T080 [P] [US5] Create ArticleCard component in `src/components/common/ArticleCard.tsx` (image, headline, author, date, description)
- [ ] T081 [P] [US5] Create NewsWidgets component in `src/features/news/components/NewsWidgets.tsx` (horizontal scrollable "Transfer Rumors" + "Quick Updates")
- [ ] T082 [US5] Create NewsScreen in `src/features/news/screens/NewsScreen.tsx` (HeroCarousel at top + main feed + widgets)
- [ ] T083 [US5] Add mock article data in `src/features/news/fixtures/mockData.ts` (50+ articles for testing)
- [ ] T084 [P] [US5] Verify gradient contrast: All text on hero images meets WCAG AA (≥ 4.5:1)
- [ ] T085 [US5] Performance verify: News screen scrolls at 60 fps with carousel + widgets

**Checkpoint**: News screen is visually polished and performant. Carousel experience is premium. All content meets accessibility standards.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements, documentation, and validation

- [ ] T086 [P] Documentation: Update `.claude/instructions.md` with updated context post-implementation
- [ ] T087 [P] Documentation: Create CONTRIBUTING.md with dev guidelines, commit conventions, PR checklist
- [ ] T088 [P] Documentation: Update `quickstart.md` with any changes discovered during implementation
- [ ] T089 Code cleanup: Remove any TODO comments, ensure all exports are documented
- [ ] T090 Run final linting: `npm run lint && npm run type-check && npm test` → All pass
- [ ] T091 Performance audit: React Profiler snapshot on all 5 main screens → Verify 60 fps
- [ ] T092 Bundle size audit: `npm run build:preview` → Verify <50MB (iOS), <60MB (Android)
- [ ] T093 Accessibility audit: Verify all text >12px, contrast ≥ 4.5:1, tap targets ≥ 44×44pt
- [ ] T094 Create Phase 1 completion checklist in `specs/001-foundation-design-system/checklists/implementation.md`

**Checkpoint**: Phase 1 is production-ready. All tasks passing. Bundle optimized. Performance validated. Accessibility compliant.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately ✅
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - US1 (Developer Environment): Can run after Foundational
  - US2 (Design System): Can run after Foundational + US1
  - US3 (Navigation): Can run parallel with US2
  - US4 (Matches Screen): Can run parallel with US3 (uses tokens from US2)
  - US5 (News Screen): Can run parallel with US4
- **Polish (Phase 6)**: Depends on all user stories being mostly complete

### User Story Task Dependencies (within each story)

- **US1**: Tests → Implementation (verify setup works)
- **US2**: Tests → Atomic components (T038–T042 in parallel) → Catalog screen
- **US3**: Tests → Navigation stacks (T053–T057 in parallel) → Screens
- **US4**: Tests → Calendar + Card components (parallel) → Screen
- **US5**: Tests → Carousel + Article Card (parallel) → Widgets → Screen

### Parallel Opportunities

**All [P] tasks can run in parallel** within their phase:

- **Setup Phase**: T002–T008 (dependency installation, ESLint, Prettier, Husky, Jest setup)
- **Foundational Phase**: T010–T014 (tokens, types, stores) + T016 (linking) can run in parallel; one developer per task
- **US1 Phase**: T027–T028 (gitignore + app.json) can run parallel with implementation
- **US2 Phase**: T038–T042 (5 atomic components) can run fully in parallel + T043–T045 separately
- **US3 Phase**: T053–T057 (5 navigation stacks) can run in parallel
- **US4 Phase**: T067–T072 (components + mock data) can run in parallel
- **US5 Phase**: T079–T084 (components + mock data) can run in parallel
- **US2 + US3**: Fully parallel (no shared file dependencies)
- **US4 + US5**: Fully parallel (use different feature folders)

### Recommended Execution

**Minimum (Single Developer, Sequential)**:
1. Setup Phase (T001–T009): 2–3 hours
2. Foundational Phase (T010–T020): 1–2 hours
3. US1 (T021–T030): 1 hour
4. US2 (T031–T046): 2–3 hours
5. US3 (T047–T061): 2 hours
6. US4 (T062–T073): 2 hours
7. US5 (T074–T085): 2 hours
8. Polish (T086–T094): 1 hour

**Total**: ~13–16 hours

**Parallel Team (4–5 Developers, Staggered)**:
1. Developer A: Setup (T001–T009) + Foundational tokens/store (T010–T015)
2. Developer B: Foundational navigation (T016–T020) + US1 (T021–T030)
3. Developer C: US2 atomic components (T038–T042) + catalog screen (T043)
4. Developer D: US3 navigation stacks (T053–T057) + screens (T058–T061)
5. Developer E: US4 + US5 (T067–T085) in parallel (different folders, no conflicts)

**Total**: ~4–5 hours (with proper parallelization)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup Phase (T001–T009)
2. Complete Foundational Phase (T010–T020)
3. Complete US1 (T021–T030)
4. **STOP and VALIDATE**: App runs with full tooling. Any developer can clone → build → develop.
5. Demo to team: "Developer setup is now rock-solid"

### Incremental Delivery

1. Setup + Foundational + US1 → MVP: Developer environment works ✅
2. Add US2 (Design System) → MVP+: All components exist, theme works ✅
3. Add US3 (Navigation) → MVP+: Navigation shell complete, 5 hubs accessible ✅
4. Add US4 + US5 (Screens) → MVP+: All 5 main screens render with mock data ✅
5. Polish phase → Ready for Phase 2

Each increment is independently testable and adds value.

### Parallel Team Strategy

Once Foundational completes:
- Developer A: US1 (1 hour) → Then US4 implementation
- Developer B: US2 (3 hours) atomic components → Then component refinements
- Developer C: US3 (2 hours) navigation + screens
- Developer D: US4 (2 hours) matches screen
- Developer E: US5 (2 hours) news screen

All finish around the same time; merge branches in order: US1 → US2 → US3 → US4/US5 (parallel) → Polish.

---

## Notes & Quality Gates

- **[P]**: Multiple developers can work on these simultaneously (different files, zero conflicts)
- **No [P]**: Sequential tasks (dependencies on earlier tasks, or shared file modifications)
- **US Label**: Tasks specific to user stories; setup/foundational have no label
- **File Paths**: All exact for clarity; helps with code review + status tracking
- **Tests First**: All [P] testing tasks should be written before implementation (TDD approach)
- **Performance**: Every screen task includes React Profiler validation (target: 60 fps)
- **Commits**: One task = one commit. Clear commit messages reference task ID: `"feat(T038): implement Button component"`

---

## Completion Criteria

**Phase 1 is COMPLETE when**:

- All 94 tasks are marked ✅ (checkbox completed)
- All tests pass: `npm test` → 100% pass rate
- All linting passes: `npm run lint` → Zero errors
- TypeScript strict: `npm run type-check` → Zero errors
- Bundle size verified: <50MB (iOS), <60MB (Android)
- Performance validated: 60 fps on all screens (Snapdragon 695 baseline)
- Accessibility audit: All text/buttons meet WCAG AA, tap targets ≥ 44×44pt
- Code review: All PRs merged after +1 approvals
- Team sign-off: Product owner approves design system + navigation

**At this point**: Phase 1 is production-ready. Proceed to Phase 2 (Stages 6–10: Enhanced UI & Full Screens).

---

## Summary Table

| Phase | Stories | Tasks | Duration | Blockers | Output |
|-------|---------|-------|----------|----------|--------|
| 1: Setup | — | T001–T009 (9) | 2–3h | None | Tooling configured |
| 2: Foundational | — | T010–T020 (11) | 1–2h | Setup ✓ | Theme + Navigation types |
| 3: US1 Developer | 1 | T021–T030 (10) | 1h | Foundational | App runs, tooling enforced |
| 4: US2 Design | 1 | T031–T046 (16) | 2–3h | Foundational | 5 atomic components + theme switching |
| 5: US3 Navigation | 1 | T047–T061 (15) | 2h | Foundational | 5-hub navigation + stack state |
| 6: US4 Matches | 1 | T062–T073 (12) | 2h | US2 ✓ | Matches screen at 60 fps |
| 7: US5 News | 1 | T074–T085 (12) | 2h | US2 ✓ | News screen with widgets + carousel |
| 8: Polish | — | T086–T094 (9) | 1h | All ✓ | Documentation + final validation |
| **Total** | **5** | **94** | **13–16h (seq) / 4–5h (parallel)** | — | **Phase 1 Complete** |

---

**Status**: ✅ **TASK LIST READY FOR IMPLEMENTATION**

Each task is actionable, specific, and complete. Developers can pick tasks in order (sequential) or in parallel groups (staggered) according to team capacity.

**Next**: Assign tasks to developers, start with Setup phase (T001–T009), then Foundational (T010–T020), then user stories.

---

**Last Updated**: 2025-04-17 | **Created By**: Copilot Speckit Tasks Agent
