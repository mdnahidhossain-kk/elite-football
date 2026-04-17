<!-- 
Sync Impact Report (2025-04-17)
Version bump: 0.0.0 → 1.0.0 (Initial Constitution)
Changed principles: N/A (initial)
Added sections: Core Principles (5), Architecture Standards, Testing Discipline, Performance Thresholds, Governance
Templates updated: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
TODO items: None
-->

# Elite Football Notifications App — Constitution

A governance document for the Elite Football Notifications App, establishing non-negotiable principles for development, architecture, testing, and deployment across all 25 stages.

## Core Principles

### I. Best Practices First (NON-NEGOTIABLE)

Every stage of development enforces documented best practices *before* code is written. This is not aspirational—it is mandatory.

**Rules**:
- All commits reference specific best practices from PLAN.md or this Constitution
- Code reviews must verify compliance with the applicable stage's best practices
- Complexity introduced without explicit best practice justification is rejected
- Architecture decisions documented in the equivalent Stage's objective before implementation

**Rationale**: The Elite Football app targets global, high-engagement audiences. Cutting corners during any phase compounds downstream. Best practices ensure scalability, maintainability, and user satisfaction from day one.

---

### II. Type Safety & Strict TypeScript

All TypeScript code runs in `strict: true` mode. No `any` types except with explicit comments justifying the exception and approval from a reviewer.

**Rules**:
- `tsconfig.json` enforces: `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`
- API responses validated with Zod schemas before use
- Redux/Zustand slices fully typed with discriminated unions
- React Navigation routes typed with `linking` config + type-safe params

**Rationale**: Type safety prevents entire classes of runtime bugs (null reference errors, incorrect API contract assumptions). This is especially critical for finite real-time data (live scores, deep-linked notifications).

---

### III. Performance Obsession (60 FPS Target)

The app MUST deliver smooth 60fps animations and scrolling on mid-range Android devices (Snapdragon 695 or equivalent). This is not optional.

**Rules**:
- All lists use `@shopify/flash-list`, never `FlatList`
- Heavy computations debounced/memoized with `useMemo` and `useCallback`
- React Profiler verified after every component refactor
- Reanimated v3 for all complex animations (never Animated API)
- Bundle size audited at every phase (target: <50MB for iOS, <60MB for Android)

**Rationale**: Live match data requires instant visual feedback. Janky scrolling is a dealbreaker for sports fans. Performance is a feature.

---

### IV. Testing Discipline (Aligned to Stage)

Testing requirements scale with feature complexity:

- **Stages 1–5** (Foundation): Unit tests for utilities, theme tokens, navigation typing
- **Stages 6–10** (UI Complete): Snapshot + integration tests for all screens with mock data
- **Stages 11–15** (API Integration): Contract tests for API client, mocked responses validated with Zod
- **Stages 16–20** (Advanced Features): End-to-end tests for critical user flows (favorites, predictions, notifications)
- **Stages 21–25** (Launch): 100% pass on Beta QA checklist before submission

**Rules**:
- Test names are human-readable; they describe *what* is being tested, not the implementation
- New features without tests are rejected outright
- Mocked API responses must match real API schema (validated with Zod)
- Error boundaries prevent unmounted component memory leaks

**Rationale**: Sports apps face high real-world variability (network latency, partial API failures, concurrency during live events). Testing discipline catches edge cases before users do.

---

### V. State Management Clarity

Global state (user preferences, favorited entities, login tokens) uses Zustand. Async server state (API calls, polling) uses React Query. Never mix these patterns.

**Rules**:
- Zustand store is the source of truth for: user settings, favorites list, auth tokens, theme preference
- React Query handles: match data, news feed, league standings, player stats
- Both stores are normalized (flat structure with IDs, never nested objects)
- Store mutations are pure and side-effect free; effects managed in hooks or components

**Rationale**: Clear separation prevents cache invalidation bugs and race conditions. Developers immediately understand where state lives.

---

### VI. Accessibility & Inclusion (WCAG AA Minimum)

All screens are accessible to users with visual, motor, and cognitive impairments.

**Rules**:
- Tap targets minimum 44×44 points
- Color contrast ratio ≥ 4.5:1 for text (WCAG AA)
- VoiceOver (iOS) and TalkBack (Android) fully functional on all screens
- Focus management explicit in modal/overlay stacks
- Alt text for all images; descriptive link labels (no "tap here")

**Rationale**: Inclusivity expands addressable market. Accessible apps are simply better-architected apps.

---

## Architecture Standards

### Folder Structure

```
/src
  /assets          # Images, fonts, icons (organized by feature)
  /components      # Atomic UI building blocks (Button, Input, Card)
  /features        # Domain-specific logic (Matches, News, Leagues, Teams, Players)
  /navigation      # React Navigation config, linking, types
  /store           # Zustand global stores (user, auth, favorites)
  /hooks           # Custom React + React Query hooks
  /utils           # Helpers, parsers, validators, date utilities
  /types           # Shared TypeScript types (separate from domain types)
  /api             # API client, Zod schemas, request interceptors
```

### Modular Boundaries

- Each feature (`/features/matches`, `/features/news`) is independently testable and deployable
- Cross-feature imports allowed only through well-defined hooks/types
- Circular imports detected and prevented (ESLint rule: `import/no-cycles`)
- No direct database/API calls from UI components; route through hooks + stores

---

### Theming & Design System

- All colors, spacing, typography, shadows defined in a centralized `tokens.ts`
- Components consume tokens via `useTheme()` hook
- Dark/Light theme switching updates `Zustand` store; UI reactively re-renders
- No hard-coded color values anywhere in component code

---

## Testing Discipline Detail

### Unit Tests

- Pure utility functions (date parsing, validators, stores)
- Minimum 80% line coverage for utilities

### Integration Tests

- Full screen render with mocked data + interactions (e.g., pull-to-refresh, tab navigation)
- API client with mocked endpoints + error scenarios
- State transitions (e.g., marking favorite → store updates → feed re-orders)

### E2E Tests (Critical Paths)

- User logs in
- User adds a favorite team → matches feed updates
- User predicts a match → live community percentages update
- User receives notification → deep links to Match Center
- User toggles theme → app re-renders without losing state

### Contract Tests

- Each stage's API contracts (if applicable) verified with real API schema snapshots
- Zod schemas validate actual responses before tests pass

---

## Performance Thresholds

| Metric                          | Target            | Measured At           |
|:--------------------------------|:------------------|:----------------------|
| First Contentful Paint (FCP)    | < 2s              | Cold start, 3G        |
| Time to Interactive (TTI)       | < 3.5s            | Cold start, 3G        |
| Jank-free scrolling             | 60 fps            | Mid-range Android     |
| List scroll lag                 | < 16ms per frame  | FlashList, 1000 items |
| Image load + display            | < 500ms           | Average network       |
| Match details navigation        | Zero jank          | Collapsing header    |
| Theme toggle                    | Instant (<100ms)  | Zustand → Reanimated  |
| API response time (P95)         | < 1s              | Production (live)     |

---

## Governance

### Process & Compliance

- **Constitution Supersedes All**: When this Constitution conflicts with a stage best practice, the Constitution wins.
- **PR Gate**: Every PR must list applicable Principles & Performance Thresholds it addresses or maintains.
- **Stage Checkpoints**: At the end of each stage, brief compliance audit: Do the deliverables meet the Constitution?
- **Rationale Comments**: Non-obvious complexity or exceptions require explicit inline comments referencing this Constitution or PLAN.md.

### Amendment Procedure

1. **Propose**: Open a discussion in the Feature Branch with amendment title + rationale
2. **Justify**: Explain which principle is inadequate + why the change improves governance
3. **Implement**: Branch author updates Constitution, templates (plan/spec/tasks), and PLAN.md if applicable
4. **Vote**: Approval from at least 1 senior reviewer + author
5. **Document**: Prepend Sync Impact Report to Constitution with version bump (semantic versioning)

### Versioning Policy

- **MAJOR** (1.0.0 → 2.0.0): Breaking change in principles or removal of a governance rule
- **MINOR** (1.0.0 → 1.1.0): New principle added or significant guidance refinement
- **PATCH** (1.0.0 → 1.0.1): Clarifications, typos, non-semantic wording improvements

---

### Runtime Guidance

For day-to-day development questions not covered by this Constitution, refer to:
- **Architecture**: `PLAN.md` (Stages 1–25, best practices per stage)
- **Navigation**: React Navigation documentation + `/src/navigation` type definitions
- **API Integration**: Axios + React Query patterns in `/src/api`
- **Testing**: Follow patterns in `/src/__tests__` (unit + integration examples)

This Constitution is enforced through:
- Automated ESLint/TSC gates in CI/CD
- PR review checklists based on applicable Stage principles
- Performance profiling reports attached to merge requests touching UI/state
- Monthly compliance audit (sample 5 recent PRs)

---

**Version**: 1.0.0 | **Ratified**: 2025-04-17 | **Last Amended**: 2025-04-17
