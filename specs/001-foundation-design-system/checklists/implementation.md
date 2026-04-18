# Phase 1 Implementation Checklist

**Purpose**: Track implementation progress and validate completion against specification  
**Created**: 2025-04-17  
**Feature**: Phase 1 — Foundation & Design System  
**Branch**: `001-foundation-design-system`  
**Status**: Ready for Implementation

---

## Phase Milestones

### ✅ Planning Complete
- [x] Feature specification (spec.md) — 5 user stories, 18 FR#, 12 SC#
- [x] Implementation plan (plan.md) — Architecture, structure, decisions
- [x] Technology research (research.md) — 7 decisions with rationale
- [x] Data models (data-model.md) — Entities + TypeScript types
- [x] Navigation contracts (contracts/navigation.ts) — Type-safe routing
- [x] Developer quickstart (quickstart.md) — Setup guide
- [x] Task list (tasks.md) — 94 actionable tasks organized by user story
- [x] Agent context updated (.claude/instructions.md)

### 🟡 Implementation (Current Phase)
- [ ] All 94 tasks completed
- [ ] All tests passing
- [ ] All linting passing
- [ ] Bundle size <50MB (iOS), <60MB (Android)
- [ ] 60 fps validated on all screens
- [ ] Accessibility audit complete (WCAG AA)

### ⏳ Post-Implementation
- [ ] Code review completed
- [ ] Product owner sign-off
- [ ] PR merged to main branch
- [ ] Ready for Phase 2

---

## Setup Phase (T001–T009)

**Goal**: Project tooling configured, folder structure ready  
**Estimated**: 2–3 hours  
**Owner**: Lead developer  

- [ ] T001: Expo project initialized (app.json, tsconfig.json)
- [ ] T002: Dependencies installed (npm install)
- [ ] T003: TypeScript strict mode enabled
- [ ] T004: Path aliases configured (@components/*, @features/*, etc.)
- [ ] T005: ESLint setup + custom rules
- [ ] T006: Prettier setup + formatting rules
- [ ] T007: Husky pre-commit hooks active
- [ ] T008: Jest + React Native Testing Library configured
- [ ] T009: Folder structure created (src/theme, src/components, src/features, etc.)

**Checkpoint Validation**:
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes (zero errors)
- [ ] Git commit blocked by Husky when linting fails
- [ ] Can import using path aliases (`@components/Button`)

---

## Foundational Phase (T010–T020)

**Goal**: Theme system + navigation types; blocks all user stories  
**Estimated**: 1–2 hours  
**Owner**: 2–3 developers (parallel T010–T015 + T016–T020)  

### Design Tokens & Theme (T010–T014)

- [ ] T010: Design tokens defined (src/tokens.ts)
  - [ ] Light color palette
  - [ ] Dark color palette
  - [ ] Spacing scale (4, 8, 12, 16, 24, 32, 48)
  - [ ] Typography scale (H1–H4, body, caption)
  - [ ] Shadows (sm, md, lg, xl)
  - [ ] Border radii (xs, sm, md, lg, xl, full)

- [ ] T011: Theme TypeScript types (src/types/theme.ts)
  - [ ] Theme interface
  - [ ] DesignTokens interface
  - [ ] ColorPalette interface
  - [ ] SpacingScale, TypographyScale, ShadowScale, BorderRadiiScale

- [ ] T012: Zustand theme store (src/store/themeStore.ts)
  - [ ] Initial state (mode, modeOverride)
  - [ ] setMode action
  - [ ] toggleMode action
  - [ ] Persistent storage hooks (Phase 16 preparation)

- [ ] T013: ThemeProvider Context (src/theme/ThemeProvider.tsx)
  - [ ] Context creation + provider component
  - [ ] Wraps app root in app.tsx
  - [ ] Provides tokens to descendants

- [ ] T014: useTheme() hook (src/theme/useTheme.ts)
  - [ ] Returns current tokens
  - [ ] Returns theme actions
  - [ ] Enforces Context usage (errors if called outside Provider)

### Navigation Types (T015–T016)

- [ ] T015: Navigation param types (src/types/navigation.ts)
  - [ ] RootStackParamList (all route names)
  - [ ] MatchesStackParamList (Matches, MatchDetails, PlayerStats)
  - [ ] NewsStackParamList (News, ArticleDetails)
  - [ ] LeaguesStackParamList (Leagues, LeagueDetails, ComponentCatalog)
  - [ ] FavoritesStackParamList, SearchStackParamList

- [ ] T016: React Navigation linking config (src/navigation/linking.ts)
  - [ ] Deep linking configuration
  - [ ] URI → screen mappings
  - [ ] Type-safe route params

### Testing (T017–T020)

- [ ] T017: Design tokens unit tests
  - [ ] All colors defined for light + dark
  - [ ] All spacings multiples of 4
  - [ ] Color contrast ≥ 4.5:1 for all text colors
  - [ ] No duplicate token names

- [ ] T018: Zustand store unit tests
  - [ ] setMode changes state correctly
  - [ ] toggleMode switches light ↔ dark
  - [ ] Subscribers receive updates on state change

- [ ] T019: useTheme() hook unit tests
  - [ ] Returns correct tokens for current theme
  - [ ] Updates when theme changes
  - [ ] Throws error if called outside Provider

- [ ] T020: Navigation types unit tests
  - [ ] All routes compile without TypeScript errors
  - [ ] RouteParams correctly typed
  - [ ] Deep linking URIs match route structure

**Checkpoint Validation**:
- [ ] `npm test` passes for all foundational tests
- [ ] All tokens accessible via `useTheme()`
- [ ] Theme toggle triggers subscriber updates
- [ ] All navigation routes type-safe (TS validation)

---

## User Story 1: Developer Environment Setup (T021–T030)

**Goal**: Developer can clone → install → develop with zero manual config  
**Estimated**: 1 hour  
**Owner**: Lead developer + testing  

### Testing (T021–T024)
- [ ] T021: Project compilation test
  - [ ] `npm run type-check` → zero errors
  - [ ] `npm run build:preview` succeeds

- [ ] T022: ESLint validation test
  - [ ] `npm run lint` → all checks pass
  - [ ] No warnings or errors in src/

- [ ] T023: Path alias resolution test
  - [ ] Import `@components/Button` → resolves correctly
  - [ ] All path aliases in tsconfig verified

- [ ] T024: Husky pre-commit test
  - [ ] Bad commit blocked by Husky
  - [ ] `npm run lint:fix` unblocks commit

### Implementation (T025–T030)
- [ ] T025: Root App component (src/app.tsx)
  - [ ] Wraps with ThemeProvider
  - [ ] Wraps with RootNavigator
  - [ ] Can render child screens

- [ ] T026: npm scripts (package.json)
  - [ ] `npm run dev` → starts dev server
  - [ ] `npm run lint` → runs ESLint
  - [ ] `npm run type-check` → TypeScript validation
  - [ ] `npm test` → runs Jest
  - [ ] `npm run build:preview` → bundle size check

- [ ] T027: Expo app config (app.json)
  - [ ] App name, version, description
  - [ ] Splash screen defined
  - [ ] Icon paths defined
  - [ ] Android/iOS configs

- [ ] T028: Git ignore files
  - [ ] .gitignore (node_modules, .expo, build/, coverage/)
  - [ ] .prettierignore
  - [ ] .eslintignore

- [ ] T029: README.md
  - [ ] Quick start (clone → install → dev)
  - [ ] Prerequisites (Node.js version)
  - [ ] Troubleshooting section

- [ ] T030: Cold start performance baseline
  - [ ] App starts in <2 seconds (FCP)
  - [ ] React Profiler snapshot captured
  - [ ] Baseline established for monitoring

**Checkpoint Validation**:
- [ ] Fresh clone can build in <10 minutes
- [ ] All tooling enforces Constitution principles
- [ ] Any developer can set up successfully

---

## User Story 2: Design System & Theme (T031–T046)

**Goal**: All atomic components exist, theme switching works flawlessly  
**Estimated**: 2–3 hours  
**Owner**: 3–4 developers (components in parallel)  

### Testing (T031–T037)
- [ ] T031: Button snapshot tests (8 variants × 2 themes)
  - [ ] primary, secondary, outline, ghost in light theme
  - [ ] Same 4 in dark theme
  - [ ] All snapshots match baseline

- [ ] T032: Typography snapshot tests
  - [ ] H1, H2, H3, H4, body, caption in both themes
  - [ ] Text sizes, weights, line heights correct

- [ ] T033: Input state tests
  - [ ] default, error, disabled, focused states
  - [ ] Keyboard types work (email, number, etc.)

- [ ] T034: Avatar tests
  - [ ] small, medium, large sizes
  - [ ] Image + fallback initials both work

- [ ] T035: Card tests
  - [ ] default, elevated, flat variants
  - [ ] Correct shadows, radii, spacing

- [ ] T036: Theme toggle integration test
  - [ ] Toggle theme → all components update <100ms
  - [ ] No re-mount, no state loss
  - [ ] Performance profiled (target <100ms)

- [ ] T037: Visual regression test (snapshots)
  - [ ] All component variants captured
  - [ ] Baselines established for future changes

### Implementation (T038–T046)
- [ ] T038: Button component (src/components/atomic/Button.tsx)
  - [ ] Props: title, variant, size, disabled, loading, onPress
  - [ ] Variants: primary, secondary, outline, ghost
  - [ ] Sizes: sm, md, lg
  - [ ] All colors from tokens
  - [ ] Accessibility: tap target ≥ 44×44pt

- [ ] T039: Typography component (src/components/atomic/Typography.tsx)
  - [ ] Props: variant, children, color, align, numberOfLines
  - [ ] Variants: H1, H2, H3, H4, body, bodySmall, label, caption
  - [ ] Semantic colors (defaults to text)
  - [ ] All sizes from tokens

- [ ] T040: Input component (src/components/atomic/Input.tsx)
  - [ ] Props: placeholder, value, onChangeText, error, disabled, state
  - [ ] States: default, error (red border), disabled (grayed), focused
  - [ ] Keyboard types: default, email, numeric, etc.
  - [ ] Optional prefix/suffix icons

- [ ] T041: Avatar component (src/components/atomic/Avatar.tsx)
  - [ ] Props: source, initials, size
  - [ ] Sizes: sm (24px), md (40px), lg (56px)
  - [ ] Fallback initials if image missing
  - [ ] Circular shape

- [ ] T042: Card component (src/components/atomic/Card.tsx)
  - [ ] Props: variant, padding, onPress, children
  - [ ] Variants: default, elevated (shadow), flat (no shadow)
  - [ ] Padding options from spacing scale
  - [ ] Touch feedback (onPress)

- [ ] T043: Component Catalog screen (src/features/leagues/ComponentCatalog.tsx)
  - [ ] Dev-only screen (hidden in production)
  - [ ] Displays all 5 components
  - [ ] All variants visible for each component
  - [ ] Both Light + Dark themes side-by-side
  - [ ] Theme toggle to switch between themes

- [ ] T044: Settings screen (src/features/settings/SettingsScreen.tsx)
  - [ ] Theme toggle (Light ↔ Dark)
  - [ ] Future user preferences (placeholder sections)
  - [ ] Accessible focus management

- [ ] T045: Contrast validation utility (src/utils/contrast.ts)
  - [ ] Function to check WCAG AA contrast (≥ 4.5:1 for text)
  - [ ] All primary text colors validated
  - [ ] Test matrix: all text colors on all surface colors

- [ ] T046: Performance profiling (theme toggle <100ms)
  - [ ] React Profiler data collected
  - [ ] Theme toggle measured at <100ms
  - [ ] No jank observed (60 fps during transition)

**Checkpoint Validation**:
- [ ] All 5 atomic components exist and render correctly
- [ ] Component Catalog displays all variants in both themes
- [ ] Theme toggle updates all components <100ms
- [ ] No hard-coded colors/spacing in components
- [ ] All snapshots passing

---

## User Story 3: Navigation Architecture (T047–T061)

**Goal**: 5-hub navigation with state preservation, animated icons, type safety  
**Estimated**: 2 hours  
**Owner**: 2 developers  

### Testing (T047–T051)
- [ ] T047: Navigation routes unit tests
  - [ ] All 5 routes exist (Matches, News, Leagues, Favorites, Search)
  - [ ] All nested routes type-safe
  - [ ] No route name conflicts

- [ ] T048: RootNavigator rendering test
  - [ ] All 5 tab icons render
  - [ ] Bottom tab navigator visible
  - [ ] Default tab is Matches

- [ ] T049: Tab switch performance test
  - [ ] Tab switch completes <300ms
  - [ ] Zero visual jank (60 fps during transition)

- [ ] T050: Stack state preservation test
  - [ ] Navigate Matches → MatchDetails → PlayerStats
  - [ ] Switch to News tab
  - [ ] Return to Matches tab → still on PlayerStats screen
  - [ ] State fully preserved

- [ ] T051: Deep linking test
  - [ ] URI: `elitef://matches/123` → MatchDetails(matchId='123')
  - [ ] URI: `elitef://news/abc` → ArticleDetails(articleId='abc')
  - [ ] Invalid URIs gracefully fallback to default route

### Implementation (T052–T061)
- [ ] T052: RootNavigator (src/navigation/RootNavigator.tsx)
  - [ ] BottomTabNavigator with 5 tabs
  - [ ] Each tab has icon + label
  - [ ] Settings accessible as modal from any tab
  - [ ] Initial route is Matches tab

- [ ] T053: MatchesStack (src/navigation/MatchesStack.tsx)
  - [ ] NativeStackNavigator
  - [ ] Routes: Matches, MatchDetails, PlayerStats
  - [ ] Swipe-back enabled (iOS)

- [ ] T054: NewsStack (src/navigation/NewsStack.tsx)
  - [ ] NativeStackNavigator
  - [ ] Routes: News, ArticleDetails
  - [ ] Swipe-back enabled

- [ ] T055: LeaguesStack (src/navigation/LeaguesStack.tsx)
  - [ ] Routes: Leagues, LeagueDetails, ComponentCatalog
  - [ ] Swipe-back enabled

- [ ] T056: FavoritesStack (src/navigation/FavoritesStack.tsx)
  - [ ] Route: Favorites (single screen, no drill-down yet)

- [ ] T057: SearchStack (src/navigation/SearchStack.tsx)
  - [ ] Route: Search (single screen)

- [ ] T058: Animated tab icons (src/components/common/AnimatedTabIcon.tsx)
  - [ ] Uses lucide-react-native icons
  - [ ] Reanimated v3 animations
  - [ ] Icon animates on tab switch (<200ms)
  - [ ] Color change + scale effect

- [ ] T059: Placeholder screens (all 5 tabs)
  - [ ] MatchesScreen: Placeholder with mock data structure
  - [ ] NewsScreen: Placeholder
  - [ ] LeaguesScreen: Placeholder + access to ComponentCatalog
  - [ ] FavoritesScreen: Empty state
  - [ ] SearchScreen: Empty state

- [ ] T060: Link integration
  - [ ] Deep linking config integrated (contracts/navigation.ts)
  - [ ] URI patterns map to screens
  - [ ] Route params type-checked

- [ ] T061: Tab icon animation performance
  - [ ] Animation completes <200ms
  - [ ] No frame drops during animation
  - [ ] Reanimated profiler data collected

**Checkpoint Validation**:
- [ ] All 5 tabs accessible and navigate smoothly
- [ ] Stack state preserved when switching tabs
- [ ] Deep linking works end-to-end
- [ ] Tab icons animate without jank
- [ ] Type safety verified (all routes typed)

---

## User Story 4: Matches Screen (T062–T073)

**Goal**: Matches screen layout complete, 60 fps scrolling, calendar header functional  
**Estimated**: 2 hours  
**Owner**: 1–2 developers  

### Testing (T062–T066)
- [ ] T062: CalendarHeader component test
  - [ ] Date chips render: Yesterday, Today, Tomorrow
  - [ ] Tapping chip updates view
  - [ ] Current date chip highlighted

- [ ] T063: MatchCard component test
  - [ ] Renders with mock data
  - [ ] Shows team crests, score, live minute, status bages
  - [ ] Images load with blurhash placeholder

- [ ] T064: FlashList performance test
  - [ ] 100+ items scroll at 60 fps
  - [ ] Mid-range device (Snapdragon 695) baseline established
  - [ ] React Profiler snapshot captured

- [ ] T065: Image loading test
  - [ ] Blurhash placeholder visible immediately
  - [ ] Real image loads asynchronously
  - [ ] No layout shift when image loads

- [ ] T066: Fixture grouping test
  - [ ] Fixtures grouped by league (Premier League, La Liga, etc.)
  - [ ] League headers display correctly
  - [ ] Sorting order matches specification

### Implementation (T067–T073)
- [ ] T067: CalendarHeader component (src/features/matches/components/CalendarHeader.tsx)
  - [ ] Date chips: Yesterday, Today, Tomorrow
  - [ ] Swipeable horizontal scroll (future week dates)
  - [ ] Callback: onDateSelected
  - [ ] Current date highlighted

- [ ] T068: MatchCard component (src/components/common/MatchCard.tsx)
  - [ ] Team crests (left + right)
  - [ ] Score in center
  - [ ] Live minute counter (if live)
  - [ ] Status badge (LIVE, HT, FT, SCHEDULED)
  - [ ] Onpress handler

- [ ] T069: Fixture grouping utility (src/features/matches/utils/groupFixtures.ts)
  - [ ] Function: groupFixturesByLeague(fixtures) → grouped data
  - [ ] Returns: [{ league: 'Premier League', fixtures: [...] }, ...]

- [ ] T070: MatchesScreen (src/features/matches/screens/MatchesScreen.tsx)
  - [ ] CalendarHeader at top
  - [ ] FlashList with MatchCard items
  - [ ] SectionList-style grouping (league headers + cards)
  - [ ] Mock data loaded for today/tomorrow/yesterday
  - [ ] Responds to date chip changes

- [ ] T071: Mock match data (src/features/matches/fixtures/mockData.ts)
  - [ ] 100+ fixtures spanning 3 days
  - [ ] Multiple leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1)
  - [ ] Various match states (scheduled, live, finished)
  - [ ] Team names, crests, scores

- [ ] T072: Blurhash image integration
  - [ ] Team crest images use expo-image
  - [ ] Blurhash placeholders configured
  - [ ] Images lazy-load asynchronously

- [ ] T073: Performance validation
  - [ ] Scrolling verified at 60 fps
  - [ ] React Profiler data: scroll performance <16ms per frame
  - [ ] Bundle size impact <100KB (screen + mock data)

**Checkpoint Validation**:
- [ ] MatchesScreen renders with mock data
- [ ] Calendar header dates switch correctly
- [ ] Scrolling smooth at 60 fps
- [ ] Team images load with blurhash placeholders
- [ ] Fixtures grouped by league

---

## User Story 5: News Screen (T074–T085)

**Goal**: News screen with carousel, main feed, widgets, all at 60 fps  
**Estimated**: 2 hours  
**Owner**: 1–2 developers  

### Testing (T074–T078)
- [ ] T074: HeroCarousel test
  - [ ] Carousel renders 3+ featured articles
  - [ ] Swipe left/right transitions smoothly
  - [ ] Dot indicators update on swipe
  - [ ] Gradient overlay ensures text contrast ≥ 4.5:1

- [ ] T075: ArticleCard test
  - [ ] Renders with image, headline, author, date, description
  - [ ] Onpress handler works
  - [ ] Layout responsive (text wraps)

- [ ] T076: News feed performance test
  - [ ] 50+ articles in main feed scroll at 60 fps
  - [ ] Carousel + main feed + widgets all performant
  - [ ] React Profiler snapshot (target: <16ms per frame)

- [ ] T077: Contrast validation test
  - [ ] All hero carousel text meets WCAG AA (≥ 4.5:1)
  - [ ] Gradient overlay verified
  - [ ] Fallback text color if image too light/dark

- [ ] T078: Widget scrolling test
  - [ ] Horizontal widgets scroll independently
  - [ ] Main feed scroll not affected by widget scroll
  - [ ] Widget items virtualized (FlashList)

### Implementation (T079–T085)
- [ ] T079: HeroCarousel component (src/features/news/components/HeroCarousel.tsx)
  - [ ] Swipeable carousel library (react-native-pager-view or Reanimated-based)
  - [ ] 3+ featured articles
  - [ ] Dot pagination indicators
  - [ ] Gradient overlay (prevents text blend)
  - [ ] Article tap navigates to details

- [ ] T080: ArticleCard component (src/components/common/ArticleCard.tsx)
  - [ ] Featured image
  - [ ] Headline, author, publish date
  - [ ] 2-3 line description
  - [ ] Onpress callback

- [ ] T081: NewsWidgets component (src/features/news/components/NewsWidgets.tsx)
  - [ ] 2 horizontal scrollable sections: "Transfer Rumors" + "Quick Updates"
  - [ ] Each widget is a FlashList (virtualized)
  - [ ] Widget items render as compact cards
  - [ ] Independent scroll (doesn't affect main feed)

- [ ] T082: NewsScreen (src/features/news/screens/NewsScreen.tsx)
  - [ ] HeroCarousel at top (sticky on scroll)
  - [ ] Main article feed below
  - [ ] Parallax/collapsing header effect
  - [ ] NewsWidgets section
  - [ ] All mock data loaded

- [ ] T083: Mock article data (src/features/news/fixtures/mockData.ts)
  - [ ] 3 featured articles (carousel)
  - [ ] 50+ main feed articles
  - [ ] Transfer rumors + quick updates widget items
  - [ ] Realistic titles, images, dates

- [ ] T084: Contrast & accessibility
  - [ ] Verify gradient overlay
  - [ ] Text colors meet WCAG AA
  - [ ] Tap targets ≥ 44×44pt

- [ ] T085: Performance validation
  - [ ] News screen scrolls at 60 fps
  - [ ] Carousel smooth (<200ms transition)
  - [ ] Widgets independent scroll
  - [ ] React Profiler data: <16ms per frame

**Checkpoint Validation**:
- [ ] NewsScreen renders hero carousel + main feed + widgets
- [ ] Carousel swipes smoothly with dot indicators
- [ ] Main feed scrolls at 60 fps
- [ ] Widgets scroll independently
- [ ] All text meets accessibility contrast standards

---

## Polish & Cross-Cutting (T086–T094)

**Goal**: Final refinements, full validation, documentation  
**Estimated**: 1 hour  
**Owner**: Lead developer + QA  

- [ ] T086: Update .claude/instructions.md
  - [ ] Updated tech stack section
  - [ ] Actual folder structure (post-implementation)
  - [ ] Any deviations from plan + rationale

- [ ] T087: Create CONTRIBUTING.md
  - [ ] Commit conventions (format: `feat(T038): description`)
  - [ ] PR checklist (linting, tests, performance, accessibility)
  - [ ] Code review process

- [ ] T088: Update quickstart.md
  - [ ] Any setup changes discovered during dev
  - [ ] Troubleshooting updates
  - [ ] Performance baseline instructions

- [ ] T089: Code cleanup
  - [ ] Remove TODO comments (or track as Phase 2 items)
  - [ ] Ensure all exports documented
  - [ ] Verify all imports use path aliases

- [ ] T090: Final linting validation
  - [ ] `npm run lint` → zero errors
  - [ ] `npm run type-check` → zero TypeScript errors
  - [ ] `npm test` → 100% tests passing

- [ ] T091: React Profiler audit
  - [ ] Screenshot all 5 main screens
  - [ ] Verify 60 fps on mid-range device (Snapdragon 695)
  - [ ] Create performance baseline spreadsheet

- [ ] T092: Bundle size audit
  - [ ] `npm run build:preview` output
  - [ ] Verify <50MB (iOS), <60MB (Android)
  - [ ] Identify large dependencies, optimize if needed

- [ ] T093: Accessibility audit
  - [ ] All text >12px (readable)
  - [ ] All buttons/tappables ≥ 44×44pt
  - [ ] Color contrast ≥ 4.5:1 (use WebAIM checker)
  - [ ] VoiceOver/TalkBack navigation functional

- [ ] T094: Phase 1 completion checklist
  - [ ] Create spec/001-foundation-design-system/checklists/implementation.md
  - [ ] Document all tasks completed ✓
  - [ ] Sign-off: All user stories independently testable + passing
  - [ ] Recommendation: Proceed to Phase 2

**Final Checkpoint Validation**:
- [ ] All 94 tasks checked off ✓
- [ ] All tests passing (npm test)
- [ ] All linting passing (npm run lint, npm run type-check)
- [ ] Bundle size verified
- [ ] Performance validated (60 fps)
- [ ] Accessibility audit complete
- [ ] Code review approved
- [ ] Ready for Phase 2

---

## Summary

| Phase | Tasks | Est. Time | Owner | Status |
|-------|-------|-----------|-------|--------|
| Setup | T001–T009 (9) | 2–3h | Lead | ⏳ Not started |
| Foundational | T010–T020 (11) | 1–2h | 2–3 devs | ⏳ Not started |
| US1: Developer | T021–T030 (10) | 1h | Lead + QA | ⏳ Not started |
| US2: Design | T031–T046 (16) | 2–3h | 3–4 devs | ⏳ Not started |
| US3: Navigation | T047–T061 (15) | 2h | 2 devs | ⏳ Not started |
| US4: Matches | T062–T073 (12) | 2h | 1–2 devs | ⏳ Not started |
| US5: News | T074–T085 (12) | 2h | 1–2 devs | ⏳ Not started |
| Polish | T086–T094 (9) | 1h | Lead + QA | ⏳ Not started |
| **TOTAL** | **94** | **13–16h (seq) / 4–5h (parallel)** | **Team** | **⏳ Ready** |

---

## Next Steps

1. **Start Setup Phase**: Assign T001–T009 to lead developer
2. **After Setup**: Begin Foundational Phase once T009 complete
3. **After Foundational**: Kick off User Story phases (can parallelize)
4. **Parallel Work**: Multiple developers work on different user stories
5. **After All Stories**: Polish phase + final validation
6. **Sign-Off**: Product owner approves Phase 1 completion
7. **Proceed**: Ready for Phase 2 (Stages 6–10: Enhanced UI)

---

**Phase 1 Status**: ✅ **TASK LIST COMPLETE & READY FOR IMPLEMENTATION**

**Last Updated**: 2025-04-17 | **Maintained By**: Copilot Speckit Tasks Agent
