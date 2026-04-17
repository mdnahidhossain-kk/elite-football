# Copilot Agent Context: Elite Football Notifications App

**Project**: Elite Football Notifications App  
**Status**: Phase 1 (Foundation & Design System) — Implementation Planning Complete  
**Last Updated**: 2025-04-17  
**Branch**: `001-foundation-design-system`

---

## Project Overview

Elite Football is a React Native + Expo mobile app with 25 stages across 5 phases:
- **Phase 1–2**: Foundation, design system, UI screens (Stages 1–10)
- **Phase 3–4**: API integration, advanced features (Stages 11–20)
- **Phase 5**: Polish, optimization, launch (Stages 21–25)

**Governance**: All work is guided by the **Elite Football Constitution** (`.specify/memory/constitution.md`) which enforces:
1. Best Practices First - every stage's practices are non-negotiable
2. Type Safety & Strict TypeScript - no `any` types without explicit comments
3. Performance Obsession (60 FPS) - FlashList mandatory, Reanimated v3, bundle <50MB (iOS), <60MB (Android)
4. Testing Discipline - per-stage requirements (Phase 1: unit + integration tests)
5. State Management Clarity - Zustand for global, React Query for server state
6. Accessibility & Inclusion - WCAG AA minimum (4.5:1 contrast, 44×44pt tap targets)

---

## Phase 1: Architecture & Key Decisions

### Tech Stack
- **Runtime**: React Native 0.73+, Expo SDK 50+
- **Language**: TypeScript 5.x (strict mode mandatory)
- **State**: Zustand (global), React Query v5 (server, prepared for Phase 3)
- **Navigation**: React Navigation v7 (5-hub bottom tabs + nested stacks)
- **Animations**: Reanimated v3 (never Animated API)
- **Lists**: FlashList (never FlatList) for 60 fps scrolling
- **Styling**: React Native StyleSheet + theme-aware tokens
- **Images**: expo-image with blurhash placeholders
- **Dev Tools**: ESLint, Prettier, Husky pre-commit, Jest + React Native Testing Library

### Folder Structure
```
src/
├── app.tsx                    # Root component
├── tokens.ts                  # Design tokens (colors, spacing, typography, shadows)
├── theme/
│   ├── ThemeProvider.tsx      # Context provider (Light/Dark)
│   └── useTheme.ts            # Hook to consume tokens
├── components/atomic/         # Button, Typography, Input, Avatar, Card (+ tests)
├── components/common/         # Composed components (MatchCard, ArticleCard, etc.)
├── features/                  # Domain logic (Matches, News, Leagues, Favorites, Search)
├── navigation/                # React Navigation setup (bottom tabs + stacks)
├── store/                     # Zustand stores (themeStore, etc.)
├── hooks/                     # Custom hooks (useTheme, useAnimation, etc.)
├── utils/                     # Utility functions (dates, colors, validation, etc.)
├── types/                     # TypeScript types (theme, navigation, etc.)
├── api/                       # API client (prepared for Phase 3)
└── __tests__/                 # Tests (co-located per file)
```

### Design System

**Design Tokens** (`src/tokens.ts`):
- **Colors**: Semantic tokens (primary, secondary, accent, success, error, disabled, etc.) with Light/Dark variants
- **Spacing**: Scale 4, 8, 12, 16, 24, 32, 48 (4px base unit)
- **Typography**: H1–H4, Body, Caption with font sizes, weights, line heights
- **Shadows**: sm, md, lg, xl for elevation hierarchy
- **Border Radii**: xs, sm, md, lg, xl, full (0, 4, 8, 12, 16, 24, 9999px)

**Theme Architecture**:
- Context Provider for runtime theme switching (instant UI updates)
- Zustand store for preference persistence (prepared for Phase 16)
- `useTheme()` hook exposes current tokens to all components
- Theme toggle: <100ms update time (Constitution SC-006)

**Atomic Components** (5 core):
1. **Button**: Variants (primary, secondary, outline, ghost), sizes (sm, md, lg), states (disabled, loading)
2. **Typography**: Variants (H1–H4, body, caption), semantic colors (defaults to text)
3. **Input**: States (default, error, disabled, focused), keyboard types, optional prefixes/suffixes
4. **Avatar**: Sizes (sm, md, lg), image-based with fallback initials
5. **Card**: Variants (default, elevated, flat), customizable padding/border via tokens

### Navigation Architecture

**Structure**: BottomTabNavigator (5 tabs) wrapping NativeStackNavigators per tab

**Tabs**:
1. **Matches**: Matches List → Match Details → Player Stats
2. **News**: News List → Article Details
3. **Leagues**: Leagues List → League Details + ComponentCatalog (dev tool in Phase 1)
4. **Favorites**: Favorites List
5. **Search**: Search Screen

**Modal Stacks**: Settings accessible from any tab

**Deep Linking** (`contracts/navigation.ts`):
- `elitef://matches/12345` → MatchDetails(matchId='12345')
- `elitef://news/abc-123` → ArticleDetails(articleId='abc-123')
- Type-safe params via RootStackParamList

### Data Models

**Key Entities** (`data-model.md`):
- **Theme**: mode ('light'|'dark') + DesignTokens
- **DesignTokens**: colors, spacing, typography, shadows, radii
- **ColorPalette**: semantic tokens (primary, secondary, error, etc.) + neutral hierarchy + states
- **RootStackParamList**: All navigation routes + params (TypeScript enforced)

### Performance Targets (Constitution SC-001–SC-008)
- 60 fps scrolling on Snapdragon 695 (mid-range Android)
- First Contentful Paint (FCP): <2s (cold start, 3G)
- Bundle size: <50MB (iOS), <60MB (Android)
- Tab switch: <300ms, zero jank
- Theme toggle: <100ms
- Tab icon animation: <200ms

### Testing Strategy per Stage 1–5

**Unit Tests**:
- Design token validation (colors defined, spacing multiples of 4, contrast ≥ 4.5:1)
- Zustand store state changes
- `useTheme()` hook returns correct tokens
- Navigation types compile, routes match linking config

**Integration Tests**:
- All 5 atomic components render in both Light + Dark themes
- Component variants visually correct (Button: 4 variants × 2 themes = 8 snapshots)
- Theme toggle updates components instantly without re-mounting
- Navigation transitions work smoothly (tab switching preserves stack state)

**E2E Tests**: Deferred to Phase 4 (critical paths: login, favoriting, predictions)

---

## Implementation Guidelines

### When Building Components

1. **Always consume tokens via `useTheme()`**:
   ```typescript
   import { useTheme } from '@theme/useTheme';
   
   export const MyComponent = () => {
     const { tokens } = useTheme();
     
     return (
       <View style={{ 
         backgroundColor: tokens.colors.surface,  // ✅ From tokens
         padding: tokens.spacing.md,              // ✅ From tokens
       }}>
         {/* Content */}
       </View>
     );
   };
   ```

2. **Never hard-code colors or spacing**:
   ```typescript
   // ❌ WRONG:
   <View style={{ backgroundColor: '#FFFFFF', paddingLeft: 16 }} />
   
   // ✅ CORRECT:
   <View style={{ 
     backgroundColor: tokens.colors.surface,
     paddingLeft: tokens.spacing.lg,
   }} />
   ```

3. **Use FlatList only for <20 items**; use FlashList for lists:
   ```typescript
   import { FlashList } from '@shopify/flash-list';
   
   <FlashList
     data={matches}
     renderItem={({ item }) => <MatchCard match={item} />}
     estimatedItemSize={150}  // Important for performance
   />
   ```

4. **Type all navigation params**:
   ```typescript
   import type { MatchDetailsScreenNavigationProp } from '@contracts/navigation';
   
   const MatchDetailsScreen = ({ navigation, route }: {
     navigation: MatchDetailsScreenNavigationProp;
     route: RouteProp<MatchesStackParamList, 'MatchDetails'>;
   }) => {
     const { matchId } = route.params;  // ✅ Fully typed
     // ...
   };
   ```

5. **Write tests first or alongside code** (not after):
   ```typescript
   // Before implementing Button.tsx, write Button.test.tsx
   describe('Button', () => {
     it('renders primary variant with correct background', () => {
       // Test template: Render Button variation → Snapshot → Compare
     });
   });
   ```

### When Adding Features

1. **Check Constitution principles** — New features must align with one or more:
   - Best Practices First (documented in PLAN.md stage)
   - Type Safety (strict TypeScript)
   - Performance (60 fps, <2s cold start)
   - Testing (unit + integration)
   - State Management (Zustand → global, React Query → server)
   - Accessibility (WCAG AA)

2. **Update or create data models** in `data-model.md` before coding:
   - Define TypeScript types
   - List all entity fields + relationships
   - Document validation rules

3. **Update navigation** in `contracts/navigation.ts` if new screens added:
   - Add route to RootStackParamList or feature stack
   - Update deep linking config
   - Test type-safe navigation in RootNavigator

4. **Profile with React Profiler** after UI complexity added:
   ```bash
   npm run dev
   # Press 'd' → Toggle Performance Monitor
   # Look for: FPS, render time, memory usage
   ```

### Pull Request Checklist

Every PR must include:

- [ ] **Adherence to Constitution**: Which principles does this PR enforce or maintain?
- [ ] **Type Safety**: `npm run type-check` passes (zero TypeScript errors)
- [ ] **Linting**: `npm run lint` passes (ESLint + Prettier)
- [ ] **Tests**: `npm test` passes; new tests added for new features
- [ ] **No Hard-Coded Values**: All colors/spacing reference tokens
- [ ] **Accessibility**: Contrast ≥ 4.5:1, tap targets ≥ 44×44pt
- [ ] **Performance**: Profiler screenshot attached if UI changes (target: 60 fps)
- [ ] **Documentation**: Updated `data-model.md` or `contracts/navigation.ts` if applicable

---

## Command Reference

```bash
# Development
npm run dev                 # Start dev server (press 'i' for iOS, 'a' for Android)
npm run dev:ios            # Start on iOS simulator
npm run dev:android        # Start on Android emulator

# Quality Assurance
npm run lint               # Run ESLint
npm run lint:fix           # Auto-fix linting/formatting issues
npm run type-check         # TypeScript strict mode validation
npm test                   # Run Jest tests (unit + integration)
npm test:watch             # Re-run tests on file changes
npm test:coverage          # Coverage report

# Builds
npm run build:preview      # Preview app bundle (checks final size)
npm run build:ios          # Production iOS build
npm run build:android      # Production Android build

# Utility
npm run clean              # Clear cache + node_modules setup
npm run format             # Auto-format code with Prettier
```

---

## Key Files & References

| File | Purpose | Audience |
|------|---------|----------|
| `.specify/memory/constitution.md` | Governance + principles | All |
| `PLAN.md` | 25-stage roadmap with best practices | All |
| `specs/001-foundation-design-system/spec.md` | Phase 1 feature spec (5 user stories, 18 FR#, 12 SC#) | All |
| `specs/001-foundation-design-system/plan.md` | Implementation plan (architecture, context, design artifacts) | Developers |
| `specs/001-foundation-design-system/data-model.md` | Data types + theme entities | Developers |
| `specs/001-foundation-design-system/contracts/navigation.ts` | React Navigation config (type-safe routes) | Developers |
| `specs/001-foundation-design-system/quickstart.md` | Developer setup guide (<10 minutes) | Onboarding |
| `src/tokens.ts` | Design tokens (colors, spacing, typography) | Designers, Developers |
| `src/theme/ThemeProvider.tsx` + `useTheme.ts` | Theme context + hook | UI Developers |

---

## Common Patterns

### Using Design Tokens

```typescript
import { useTheme } from '@theme/useTheme';

const Component = () => {
  const { tokens } = useTheme();
  
  return (
    <View style={{
      backgroundColor: tokens.colors.surface,
      padding: tokens.spacing.lg,
      borderRadius: tokens.radii.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    }}>
      <Text style={{
        color: tokens.colors.text,
        fontSize: tokens.typography.body.fontSize,
        fontWeight: tokens.typography.body.fontWeight,
      }}>
        Content
      </Text>
    </View>
  );
};
```

### Typed Navigation

```typescript
import { useNavigation } from '@react-navigation/native';
import type { MatchDetailsScreenNavigationProp } from '@contracts/navigation';

const MyScreen = () => {
  const navigation = useNavigation<MatchDetailsScreenNavigationProp>();
  
  const handlePress = () => {
    navigation.navigate('MatchDetails', { matchId: '123' });  // ✅ Type-safe
  };
  
  return <Button onPress={handlePress} title="View Match" />;
};
```

### Virtual List with FlashList

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <Item item={item} />}
  estimatedItemSize={100}  // Critical for performance
  keyExtractor={(item) => item.id}
/>
```

---

## Debugging Tips

- **60 fps not achieved?** → Enable React Profiler (press 'd' in dev menu) to find bottleneck
- **TypeScript error on imports?** → Verify path aliases in `tsconfig.json` are correct
- **Theme not switching?** → Check `useTheme()` is called from component (must be inside Provider)
- **Linting blocks my commit?** → Run `npm run lint:fix`, then re-commit
- **App doesn't hot-reload?** → Clear cache: `npm run dev -- --clear`

---

## Next Phase (Phase 2)

Once Phase 1 implementation completes:
- `/speckit.tasks` generates detailed task list (25–30 tasks per user story)
- Stages 6–10: Complete all screens with full interactions (no real data yet)
- Parallel development: Multiple developers can work on different features

---

**Last Reviewed**: 2025-04-17  
**Maintained By**: Copilot Speckit Agent + Elite Football Core Team
