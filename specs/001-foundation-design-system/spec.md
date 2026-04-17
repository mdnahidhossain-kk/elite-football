# Feature Specification: Phase 1 — Foundation & Design System

**Feature Branch**: `001-foundation-design-system`  
**Created**: 2025-04-17  
**Status**: Draft  
**Input**: User description: "phase 1"  
**Source Reference**: [PLAN.md](../../PLAN.md) — Stages 1–5

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Environment Setup (Priority: P1)

A developer clones the repository and can immediately start building features with all tooling, linting, and TypeScript configuration pre-configured.

**Why this priority**: This is the foundation that blocks all other work. Without proper setup, developers lose velocity to configuration and debugging trivial errors.

**Independent Test**: A fresh clone compiles with `npm run build` (or equivalent), passes `npm run lint`, and strict TypeScript mode catches type errors immediately. Path aliases (`@components/*`, `@features/*`) resolve correctly in imports.

**Acceptance Scenarios**:

1. **Given** a fresh clone of the repository, **When** running `npm install && npm run dev`, **Then** the app compiles with zero TypeScript errors and runs on iOS simulator / Android emulator
2. **Given** TypeScript strict mode enabled (`"strict": true`), **When** attempting `const x: any = ...`, **Then** ESLint rule rejects the code (unless explicitly commented)
3. **Given** configured path aliases in `tsconfig.json`, **When** importing a component as `import Button from '@components/Button'`, **Then** the import resolves correctly and linter passes
4. **Given** pre-commit hooks configured via Husky, **When** committing code that violates Prettier or ESLint rules, **Then** the commit is rejected with clear error messages

---

### User Story 2 - Design System & Theme Engine (Priority: P1)

A designer and developer collaborate to define a reusable design system with light/dark themes, atomic components, and enforced design tokens. No hard-coded colors or spacing anywhere in component code.

**Why this priority**: A unified design language is mandatory for a polished app. Without it, inconsistency fragments the user experience across screens. This is built *now* so all subsequent UI work reuses it.

**Independent Test**: A "Component Catalog" screen displays all atomic components (Button, Typography, Input, Avatar, Card) in *both* Light and Dark themes. Toggling theme preference updates the catalog instantly without reloading. Every button, color, and spacing value is traced back to a design token.

**Acceptance Scenarios**:

1. **Given** a Button component with variant props (`primary`, `secondary`, `outline`, `ghost`), **When** rendering in the Component Catalog, **Then** all 4 variants appear correctly in both Light and Dark themes with proper contrast
2. **Given** a Typography component with variants (`H1`, `H2`, `Body`, `Caption`), **When** changing device text size in OS settings, **Then** text scales proportionally without breaking layouts
3. **Given** a theme provider wrapping the app, **When** user toggles Dark mode in settings, **Then** all screens instantly switch colors without losing state (no navigation reset)
4. **Given** a Card component using design tokens, **When** inspecting the code, **Then** all colors reference named tokens (e.g., `colors.surface`, `colors.border`), never hard-coded hex values
5. **Given** a Spacing scale defined globally (4, 8, 12, 16, 24, 32…), **When** a developer builds a new screen, **Then** the only available spacing options are from the scale (enforced by StyleSheet or type system)

---

### User Story 3 - Navigation Architecture & Bottom Tab Bar (Priority: P1)

A user launches the app and can seamlessly navigate between 5 main hubs (Matches · News · Leagues · Favorites · Search) via a bottom tab bar with animated icons. Swipe-back and native gestures work fluidly on both platforms.

**Why this priority**: Navigation structure determines how users explore the app. A broken or janky navigation creates friction before users even reach content. This must be rock-solid from day one.

**Independent Test**: Tapping each of the 5 tab icons navigates to the corresponding screen. Swiping back (iOS) or using back button (Android) returns to the previous screen within the same tab. Switching tabs and returning doesn't reset the internal navigator state.

**Acceptance Scenarios**:

1. **Given** the app is launched, **When** the app initializes, **Then** the Matches tab is active (default) with a bottom tab bar showing all 5 icons
2. **Given** the user is on the Matches tab, **When** tapping the News tab, **Then** the navigation transitions smoothly to the News screen without flickering
3. **Given** the user navigates 3 levels deep in one tab (e.g., Matches → Fixture Detail → Player Stats), **When** switching to another tab and back, **Then** the original tab state is preserved (still on Player Stats screen)
4. **Given** a custom animated icon for each tab using `lucide-react-native`, **When** switching tabs, **Then** the icon animates (scale, color change) as visual feedback
5. **Given** the app is running on iOS, **When** swiping the screen's left edge (native swipe-back), **Then** the navigator pops the current screen and shows the previous one
6. **Given** the app is running on Android, **When** pressing the back button, **Then** the navigator pops the current screen (respects Android navigation conventions)

---

### User Story 4 - Matches Screen Skeleton & Structure (Priority: P2)

A developer builds the Matches screen layout with a calendar header, fixture list grouped by league, and match cards. The screen is *not* connected to real data yet (P2 is E2E, P3 is API integration).

**Why this priority**: The structural foundation for content. This P2 story ensures the screen *layout* is correct; data comes later. Teams can parallelize UI + API work without blocking each other.

**Independent Test**: The Matches screen renders with mock data showing fixtures for today, tomorrow, and yesterday. The calendar header is swipeable between dates. Match cards display team crests, live minute counters (if applicable), scores, and status tags (LIVE/HT/FT). No data fetches; all data is hardcoded in the screen component for testing.

**Acceptance Scenarios**:

1. **Given** mock match data loaded into local state, **When** the Matches screen renders, **Then** fixtures are grouped by league (e.g., "Premier League", "La Liga") with appropriate headers
2. **Given** a calendar header with date chips (Yesterday, Today, Tomorrow), **When** tapping "Today", **Then** the list scrolls/filters to show only today's fixtures
3. **Given** a FlashList of match cards, **When** scrolling rapidly through 100+ fixtures, **Then** the list remains at 60 fps (no jank on mid-range devices)
4. **Given** match cards with team crests (small images), **When** the screen initially renders, **Then** placeholder images appear instantly (blurhash), then real images load
5. **Given** a live match in the fixture list, **When** the match card renders, **Then** a live minute counter displays (e.g., "42'") and a "LIVE" badge appears

---

### User Story 5 - News Feed Skeleton & Structure (Priority: P2)

A developer builds the News screen layout with a featured carousel, standard article feed, and horizontal scrollable widgets. Like the Matches screen, this is mock data only—no API integration yet.

**Why this priority**: Same rationale as US4. Structural layout is decoupled from data fetching. Multiple developers can work on screens in parallel.

**Independent Test**: The News screen displays a hero carousel with 3 featured articles (swipeable), a main feed of standard articles with images and headlines, and horizontal widget carousels for "Transfer Rumors" and "Quick Updates". All data is mock; smooth scrolling confirmed at 60 fps.

**Acceptance Scenarios**:

1. **Given** a carousel with hero articles, **When** swiping left/right, **Then** the carousel transitions smoothly and a dot indicator updates to show the current page
2. **Given** a main feed of articles below the carousel, **When** scrolling down past the carousel, **Then** the carousel "sticks" at the top via a collapsing header (parallax effect)
3. **Given** gradient overlays on hero images, **When** article titles are displayed on top of images, **Then** text contrast is ≥ 4.5:1 (WCAG AA)
4. **Given** article cards with author, date, and description, **When** tapping an article, **Then** navigation transitions (or sheet pops up) showing full details
5. **Given** horizontal scrollable "Transfer Rumors" widget, **When** swiping left/right within the widget, **Then** only the widget scrolls (doesn't affect the main feed's scroll)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Application MUST initialize with a valid React Native + Expo project structure using TypeScript in strict mode
- **FR-002**: TypeScript compiler MUST enforce `strict: true`, `noImplicitAny: true`, and `strictNullChecks: true` configurations; any violations block compilation
- **FR-003**: ESLint + Prettier MUST be installed and configured; pre-commit Husky hooks MUST prevent commits that violate linting or formatting rules
- **FR-004**: Path aliases (`@components/*`, `@features/*`, `@utils/*`, etc.) MUST be configured in `tsconfig.json` and resolve correctly at runtime
- **FR-005**: Design tokens (colors, spacing, typography, shadows) MUST be centrally defined (e.g., `src/tokens.ts` or `src/theme/tokens.ts`) and consumed via a `useTheme()` hook; no hard-coded color/spacing values allowed in components
- **FR-006**: Theme Provider MUST support Light and Dark themes; toggling themes in app settings MUST update all screens reactively without losing app state
- **FR-007**: React Navigation (v7 or Expo Router) MUST be configured with 5 bottom-tab navigators (Matches, News, Leagues, Favorites, Search)
- **FR-008**: Each tab MUST have its own Native Stack Navigator supporting swipe-back (iOS) and back-button navigation (Android)
- **FR-009**: Tab icons MUST animate on switch using `lucide-react-native` and `react-native-reanimated`; no frame drops tolerated on mid-range devices
- **FR-010**: Matches screen MUST render a calendar header with horizontal date chips (Yesterday, Today, Tomorrow) and a FlashList of match cards grouped by league
- **FR-011**: Match cards MUST display team crests, score, live minute (if applicable), and status tags (LIVE/HT/FT) using mock data
- **FR-012**: Match card images (team crests) MUST use blurhash placeholders for instant visual feedback; images load asynchronously without blocking
- **FR-013**: News screen MUST render a hero carousel with featured articles and a main feed below it with standard article cards
- **FR-014**: Hero carousel MUST support swipe-left/right navigation with dot indicators; gradient overlays ensure text contrast ≥ 4.5:1 (WCAG AA)
- **FR-015**: News feed MUST include horizontal scrollable widget sections ("Transfer Rumors", "Quick Updates") that scroll independently of the main feed
- **FR-016**: All primary screens (Matches, News, Leagues, Favorites, Search) MUST render with mock data; no API calls made during Phase 1
- **FR-017**: Component Catalog screen MUST exist in the Leagues or Development tab; it displays all atomic components (Button, Typography, Input, Avatar, Card) in Light and Dark themes
- **FR-018**: All scrollable lists (match fixtures, articles, components) MUST use `@shopify/flash-list` and maintain 60 fps on Snapdragon 695 or equivalent mid-range device

### Key Entities *(design system)*

- **Design Token**: Immutable, named value representing a visual property (color, spacing, border radius, shadow, typography scale). Examples: `colors.primary`, `spacing.md`, `radius.lg`
- **Theme**: Collection of design tokens reflecting a visual identity (Light or Dark). Themes are swappable runtime; the Token system should be theme-aware
- **Component**: Reusable UI building block (Button, Card, Input, Avatar, Typography). Each component consumes tokens via `useTheme()`
- **Navigation Stack**: React Navigation container managing a cohesive set of screens (e.g., MatchesStack contains Matches List, Fixture Detail, Player Stats)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: TypeScript compilation succeeds with zero errors on first clone and build (no configuration needed post-install)
- **SC-002**: All screens render at **60 fps** during smooth scrolling on a mid-range Android device (Snapdragon 695 or equivalent)
- **SC-003**: First Contentful Paint (FCP) **< 2 seconds** on a cold app start (3G network simulated)
- **SC-004**: App bundle size **< 50 MB (iOS)** and **< 60 MB (Android)** uncompressed after build
- **SC-005**: Switching between tabs completes in **< 300ms** with zero visual jank (measured with React Profiler)
- **SC-006**: Theme toggle (Light ↔ Dark) updates all screens **< 100ms** without re-initializing the app state
- **SC-007**: All text on hero sections (News carousel) meets **WCAG AA color contrast** (≥ 4.5:1)
- **SC-008**: Tab icons animate on switch; animation completes in **< 200ms** without frame drops
- **SC-009**: **100% of developers** on the team can set up the project successfully in **< 10 minutes** post-clone
- **SC-010**: Component Catalog screen displays all 5 atomic components (Button, Typography, Input, Avatar, Card) with **all variants** visible in both themes
- **SC-011**: Code review checklist confirms **zero hard-coded colors or spacing** in component code; all references trace to design tokens
- **SC-012**: ESLint pre-commit hook blocks **any commit** that violates strict TypeScript, Prettier formatting, or custom linting rules

---

## Assumptions

- **Target Devices**: Minimum mid-range Android (Snapdragon 695) and iOS 15+; development prioritizes performance on these platforms, not high-end flagships
- **Developer Experience**: Developers have Node.js 18+ and familiarity with React/TypeScript; no on-ramp needed for basic syntax, but architecture enforcement is new
- **Existing Infrastructure**: No legacy codebase to migrate; building from scratch allows clean architecture decisions
- **Network Environment**: Phase 1 has *no* network calls; all data is hardcoded/mocked locally (Phase 3 adds real API integration)
- **Design Language**: Design tokens are inspired by modern design systems (Material Design, Tailwind scale) but customized for Elite Football branding
- **Accessibility Default**: WCAG AA is the non-negotiable baseline; developers are expected to validate contrast and focus management during PR reviews (enforcement via tooling where possible)
- **Theme Persistence**: User's theme preference (Light/Dark) is persisted locally; no server sync required during Phase 1

---

## Edge Cases

- **Device Theme Change**: If device switches from Light to Dark mode while app is in memory, the app's theme preference takes precedence (dev can override it if they wish)
- **Table Rotation**: When rotating device between portrait/landscape, scroll position and focused item (if any) MUST be preserved
- **Rapid Tab Switching**: User rapidly taps different tabs (5+ times in 1 second); navigation stack MUST not duplicate screens or crash
- **Slow Image Loading**: If a blurhash placeholder appears but the real image take >10 seconds to load, a placeholder remains visible; no blank space crashes the layout
- **Low Memory**: On devices with <2GB RAM, the app MUST not crash when scrolling through large component lists; only visible items are rendered (virtualized via FlashList)
- **Missing Font**: If a custom font file is missing or fails to load at startup, the app falls back to a system font and logs an error (doesn't crash)

---

## Notes & [NEEDS CLARIFICATION] Status

✅ **All clarifications resolved:No blocking ambiguities detected. The specification aligns tightly with PLAN.md Stages 1–5 and Phase 1 objectives.**

---

**Version**: 1.0.0 | **Creator**: Copilot (Speckit Specify Agent) | **Last Updated**: 2025-04-17
