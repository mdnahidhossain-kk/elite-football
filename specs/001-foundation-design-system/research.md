# Research & Technology Decisions: Phase 1

**Date Generated**: 2025-04-17  
**Feature Scope**: Stages 1–5 (Foundation & Design System)  
**Status**: All unknowns resolved

---

## Theme Architecture Decision

### Problem Solved
How to support Light/Dark theme switching without reloading the app, while maintaining React Native's performance constraints (no re-renders of entire tree).

### Decision: Dual-Pattern Setup
- **React Context** for runtime theme switching (instant UI updates)
- **Zustand store** for theme preference persistence (survives app restarts)
- Context provides `useTheme()` hook to all components
- Components subscribe to context changes reactively

### Why This Approach
1. **Performance**: Context is optimized for single-value changes (theme toggle); no unnecessary re-renders of sibling components
2. **Persistence**: Zustand is lightweight and persists to AsyncStorage without blocking UI
3. **Simplicity**: Two small, focused stores are easier to debug than one mega-store
4. **Testability**: Theme Provider can be mocked independently in tests

### Alternatives Considered
| Alternative | Evaluated | Issue |
|------------|-----------|-------|
| Redux for all state | ✅ Yes | Overkill for Phase 1; more boilerplate per constitution goal of simplicity |
| Single Zustand store for themes | ✅ Yes | Zustand is async; can't guarantee instant UI updates on theme toggle |
| Redux Toolkit + RTK Query | ✅ Yes | Same issue as Redux; too much for theme-only state |
| No persistence (Context only) | ✅ Yes | Would lose user preference on app restart; poor UX |

**Recommendation**: ✅ Proceed with Dual-Pattern (Context + Zustand)

---

## Design Token Implementation

### Problem Solved
How to centralize all design values (colors, spacing, typography) so they're reusable, type-safe, and enforceable via linting/TypeScript.

### Decision: TypeScript-First Token System
- Define tokens in `src/tokens.ts` as TypeScript constants + types
- Organize by category (colors, spacing, typography, shadows, radii)
- Export as singleton object: `TOKENS = { colors: {...}, spacing: {...}, ... }`
- Components consume via `useTheme()` hook that returns the current theme's tokens
- Optional: Use `StyleSheet.create()` to optimize style object creation

### Why This Approach
1. **Compile-Time Safety**: TypeScript prevents typos; referencing invalid token names fails at build time
2. **Single Source of Truth**: One file is the authoritative token reference
3. **Theme-Aware**: Tokens are values (e.g., `colors.primary`), not hard-coded; theme switching updates all references automatically
4. **Zero Overhead**: Just JavaScript objects; no runtime parsing or transformation needed
5. **IDE Support**: Auto-complete in all editors for token names

### Alternatives Considered
| Alternative | Evaluated | Issue |
|------------|-----------|-------|
| CSS Variables (`--color-primary`) | ❌ Not viable | React Native doesn't support CSS; web-only pattern |
| JSON token files (design-tokens format) | ✅ Yes | Extra build step; harder to version-control diffs; less IDE support |
| Hardcoded values per component | ❌ Rejected | Violates constitution; inconsistent colors/spacing across app |
| Configuration library (e.g., `Theme UI`) | ✅ Yes | Dependency bloat; overkill for Phase 1 scope |

**Recommendation**: ✅ Proceed with TypeScript-First Tokens

---

## Navigation Framework: React Navigation vs Expo Router

### Problem Solved
Which React Native navigation library best fits the 5-hub bottom-tab architecture with deep linking and state persistence?

### Decision: React Navigation v7
- Industry standard with largest community and best documentation
- Supports nested navigators (BottomTab + NativeStack combination)
- Full deep linking support with type safety via `linking` config
- State persistence and restoration well-documented
- Animations use Reanimated v3 (aligns with Constitution performance goals)

### Why This Approach
1. **Maturity**: v7 is stable; used in thousands of production apps
2. **Flexibility**: Bottom-tab + nested stack navigator combination is native to design
3. **Typing**: Can type all params and return values; no `any` types needed
4. **Community**: Largest ecosystem of third-party libraries and examples
5. **Performance**: Reanimated v3 integration is hardened; no frame drops on mid-range devices

### Alternatives Considered
| Alternative | Evaluated | Issue |
|------------|-----------|-------|
| Expo Router | ✅ Yes | Newer (v3); file-based routing adds abstraction; not as battle-tested yet for complex nested navigators |
| NativeNavigation (unmaintained) | ❌ Rejected | Project archived; no support |
| Custom navigation (DIY) | ❌ Rejected | Re-inventing wheel; high maintenance debt, especially for deep linking |

**Recommendation**: ✅ Proceed with React Navigation v7

---

## Component Library: Atomic Design Approach

### Problem Solved
How to design 5 atomic components that cover all Phase 1–25 UI needs without creating component bloat or maintenance overhead?

### Decision: Five Core Components
Each component is minimal, single-responsibility, and fully typed:

1. **Button**: States (enabled, disabled, loading), variants (primary, secondary, outline, ghost), sizes
2. **Typography**: Hierarchy (H1, H2, H3, H4, Body, Caption, Label), weights (regular, medium, bold)
3. **Input**: States (default, error, disabled, focused), optional prefixes/suffixes, keyboard types
4. **Avatar**: Image-based user representation; sizes (small, medium, large); fallback initials
5. **Card**: Container; variants (default, elevated, flat); padding/border customizable via tokens

### Composition Strategy
All other screens build from these 5 atoms. Example:
- MatchCard = Card + Typography + Avatar + Button (nested composition)
- ArticleCard = Card + Image + Typography + Button
- CategoryHeader = Typography + Button (optional action)

### Why This Approach
1. **Reusability**: Five components are the 80/20 split; they cover 80% of all UI needs
2. **Maintainability**: Smaller library = fewer bugs, easier to test
3. **Consistency**: All screens reuse the same components; visual consistency is automatic
4. **Scalability**: New screens add combinations, not new components
5. **Design Systems 101**: This is the proven pattern (Material Design, Ionic, etc.)

### Alternatives Considered
| Alternative | Evaluated | Issue |
|------------|-----------|-------|
| 20+ component library | ✅ Yes | Maintenance nightmare; most sit unused; constitution goal is simplicity |
| No component library (ad-hoc UI) | ❌ Rejected | Violates design system principle; inconsistency across app |
| Copy-paste from UI kit (Figma) | ❌ Rejected | No single source of truth; drift between design and code inevitable |

**Recommendation**: ✅ Proceed with Five Core Components

---

## Performance Strategy

### Problem Solved
How to achieve 60 fps scrolling on mid-range Android devices (Snapdragon 695) while maintaining ship velocity and not over-optimizing prematurely?

### Decision: FlashList + Reanimated v3 + React Profiler  
- **FlashList** is mandatory for all virtualized lists (matches, news, components, etc.); never use `FlatList`
- **Reanimated v3** for all animations; never use React Native `Animated` API
- **React Profiler** integrated into dev workflow; every UI change includes a performance check
- **Bundle size monitoring**: Target <50MB (iOS), <60MB (Android); audit after each phase

### Why This Approach
1. **FlashList**: 10–15% faster than FlatList at scale due to optimized windowing algorithm
2. **Reanimated v3**: Runs animations on the native thread (not JS thread); zero jank even on low-end devices
3. **React Profiler**: Catches regressions early; unoptimized renders blocked in PR reviews
4. **Measured, not Assumed**: No premature optimization; only optimize based on profiling data

### Alternatives Considered
| Alternative | Evaluated | Issue |
|------------|-----------|-------|
| FlatList (built-in) | ✅ Yes | Slower at scale; OK for <100 items but not for sports data volumes |
| Manual virtualization (DIY) | ❌ Rejected | High complexity; FlashList already handles this and is proven |
| React Native performace obsession (too early) | ✅ Yes | Constitution balances pragmatism; optimize when data-driven, not hypothetical |

**Recommendation**: ✅ Proceed with FlashList + Reanimated v3 + Profiler

---

## Testing Strategy: Unit + Integration (Phase 1)

### Problem Solved
What types of tests should Phase 1 include to meet Constitution testing discipline while not adding excessive overhead?

### Decision: Unit + Integration per Stage 1–5 Requirements
- **Unit Tests** (T011–T015): Tokens, hooks, stores, navigation typing
- **Integration Tests** (T016–T020): Component rendering with mock props, theme switching, navigation flow
- **E2E Tests**: Deferred to Phase 4 (critical user flows); Phase 1 focuses on structure

### Test Scope
```
tests/
├── unit/
│   ├── tokens.test.ts        # Verify all token categories defined
│   ├── themeStore.test.ts    # Zustand store state changes
│   ├── useTheme.test.ts      # Hook returns correct theme
│   └── navigation.test.ts    # Navigation types compile, routes match linking config
├── integration/
│   ├── Button.integration.test.tsx      # Renders all variants in both themes
│   ├── Typography.integration.test.tsx  # Text scaling, contrast checks
│   ├── MatchCard.integration.test.tsx   # Renders with mock data
│   ├── ArticleCard.integration.test.tsx
│   └── ThemeSwitching.integration.test.tsx  # Theme toggle updates all components
└── e2e/
    └── (Phase 4 only; placeholder for critical paths)
```

### Why This Approach
1. **Constitution Compliance**: Stage 1–5 requires unit + integration; Phase 1 delivers exactly that
2. **Regression Prevention**: Tests catch breaking changes early (esp. theme switching, navigation)
3. **Documentation**: Tests double as usage examples for future developers
4. **Confidence**: PR reviewers can be confident code is solid before merge

### Alternatives Considered
| Alternative | Evaluated | Issue |
|------------|-----------|-------|
| TDD (tests first, then code) | ✅ Yes | Ideal but slows Phase 1 velocity; adopted for Phase 2 and beyond |
| No tests (test in QA later) | ❌ Rejected | Violates Constitution; testing discipline is non-negotiable |
| 100% E2E coverage | ✅ Yes | Too heavy for Phase 1; focus on structure, then behaviors in Phase 4+ |

**Recommendation**: ✅ Proceed with Unit + Integration per Constitution Stage Requirements

---

## Additional Decisions

### Pre-Commit Hooks & Linting
- Husky + ESLint + Prettier enforces code quality before commits
- No commit succeeds if linting fails; prevents merging broken code to feature branch
- ESLint rules include: `react/no-unescaped-entities`, `typescript-eslint/no-explicit-any`, custom token-only color rules

### Image Loading: expo-image + blurhash
- `expo-image` replaces `Image` component; built-in support for blurhash placeholders
- Improves perceived performance; users see placeholder immediately, real image loads async
- Matches Constitution performance obsession principle

### API Integration Preparation (Phase 3)
- Phase 1 creates `src/api/` folder with:
  - `client.ts`: Axios instance with interceptors (auth, errors, retries)
  - `zod-schemas.ts`: Placeholder for response validation schemas
  - Ready for Phase 11 API integration without refactoring

---

## Summary Table

| Decision | Chosen | Confidence |
|----------|--------|-----------|
| Theme Architecture | Context + Zustand | 🟢 High |
| Token System | TypeScript-First | 🟢 High |
| Navigation | React Navigation v7 | 🟢 High |
| Component Library | 5 Core Components | 🟢 High |
| Performance | FlashList + Reanimated v3 | 🟢 High |
| Testing | Unit + Integration | 🟢 High |
| Image Loading | expo-image + blurhash | 🟢 High |

All decisions align with Constitution principles and are ready for Phase 1 implementation.

---

**Status**: ✅ **Research Complete** — Proceed to data-model.md and contracts/
