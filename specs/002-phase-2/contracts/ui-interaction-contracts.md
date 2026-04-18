# UI Interaction Contracts: Phase 2

**Date**: 2026-04-18  
**Scope**: User-facing interaction contracts for Stages 6–10

---

## 1) Leagues & Competitions Contract

### Inputs
- Active category tab (`top`, `domestic`, `international`, `cups`)
- Alphabet quick-jump letter
- Competition selection tap

### Guaranteed Outputs
- List content updates to selected category only
- Quick-jump scrolls to matching section or nearest available fallback
- Competition selection routes to competition detail context

### Fallback Behavior
- Empty category shows explicit empty-state guidance
- Missing logo uses safe placeholder avatar/logo

---

## 2) Favorites Contract

### Inputs
- Active segment tab (`teams`, `players`, `leagues`)
- Reorder gesture (drag/drop)
- Remove gesture/action

### Guaranteed Outputs
- Segment list isolation by active tab
- Reordered list persists for that segment
- Removed item disappears immediately

### Fallback Behavior
- Segment with zero items shows explanatory empty state
- Reorder gesture disabled/ignored when list size < 2

---

## 3) Global Search Contract

### Inputs
- Query text
- Active filter (`all`, `clubs`, `players`, `news`, `leagues`)
- Recent-search selection

### Guaranteed Outputs
- Debounced result update for entered query
- Filter-scoped result projection
- Selecting recent query re-runs corresponding search context

### Fallback Behavior
- No matches returns clear no-results state
- Empty input reveals recent searches (if any) and helper hints

---

## 4) Match Center Contract

### Inputs
- Selected match identifier
- Section tab selection (`info`, `lineups`, `stats`, `h2h`)

### Guaranteed Outputs
- Header retains selected match context through section switches
- Each tab renders its section data without changing fixture identity
- Return to previously viewed tab preserves same fixture context

### Fallback Behavior
- Missing section payload renders “data unavailable” state without leaving screen

---

## 5) News Details Contract

### Inputs
- Article selection
- Share action
- Related-story selection

### Guaranteed Outputs
- Rich content displayed in readable sequence
- Share action emits article share URL through native share sheet
- Selecting related story opens the selected related article

### Fallback Behavior
- Unsupported embedded media renders safe placeholder block
- Missing related stories section hides gracefully without errors

---

## Non-Functional Contract Clauses

- All interactions must maintain accessibility semantics (labels, focus behavior, tap target sizing).
- Animations/transitions should remain smooth and non-blocking on mid-range devices.
- No contract path should hard-fail on partial content; user journey remains navigable.
