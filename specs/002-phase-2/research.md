# Research & Decisions: Phase 2 — Enhanced UI & Component Logic

**Date Generated**: 2026-04-18  
**Feature Scope**: Stages 6–10  
**Status**: Complete

---

## Decision 1: Competition Directory Navigation Model

**Decision**: Use pre-grouped competition data by category + initial-letter index, with O(1) letter-to-section lookup maps.

**Rationale**:  
- Satisfies FR-001 and FR-002 without runtime regrouping overhead during scroll/jump.  
- Supports smooth alphabetical quick-jump for long lists.  
- Keeps navigation deterministic for testing and accessibility announcements.

**Alternatives considered**:  
- Runtime filter/group on every interaction (rejected: avoidable compute churn).  
- Search-only discovery (rejected: does not satisfy browse-first requirement).

---

## Decision 2: Favorites Interaction Persistence

**Decision**: Persist per-entity-type ordering and removals in a single favorites source of truth store, with debounced write operations.

**Rationale**:  
- Directly supports FR-003, FR-004, FR-005, FR-006.  
- Debounced persistence prevents excessive writes during rapid reorder gestures.  
- Clear empty-state handling remains isolated per Teams/Players/Leagues segment.

**Alternatives considered**:  
- Separate storage per tab (rejected: split ownership and sync risk).  
- Immediate writes on every drag step (rejected: higher write frequency and UI risk).

---

## Decision 3: Global Search Behavior

**Decision**: Implement debounced query execution (300ms), filter-scoped result projection, and recent-search recall from local persistence.

**Rationale**:  
- Supports FR-007, FR-008, FR-009 with predictable UX.  
- Balances responsiveness with request churn control.  
- Works on mock data now while preserving Phase 3 API-ready flow.

**Alternatives considered**:  
- No debounce (rejected: unnecessary repeated executions).  
- Server-only recents (rejected: unnecessary dependency for this phase).

---

## Decision 4: Match Center State Architecture

**Decision**: Keep selected fixture context in one match-details state slice and render section tabs (Info, Lineups, Stats, H2H) from that stable context.

**Rationale**:  
- Directly supports FR-010 and FR-011.  
- Prevents context drift while switching tabs repeatedly.  
- Simplifies fallback behavior when one section lacks data (FR-013).

**Alternatives considered**:  
- Independent per-tab context stores (rejected: synchronization risk).  
- Stateless sections each re-fetching context (rejected: redundant and fragile).

---

## Decision 5: News Article Rendering Safety

**Decision**: Render rich text through sanitized HTML/markup pipeline, with lazy media and graceful unsupported-embed fallback.

**Rationale**:  
- Supports FR-012 and FR-013 safely.  
- Maintains readable content flow even when embedded media is missing/unsupported.  
- Keeps sharing and related-article navigation independent from media parsing success.

**Alternatives considered**:  
- Raw HTML rendering (rejected: unsafe).  
- Hard fail on unsupported embed (rejected: blocks user journey).

---

## Decision 6: Testing Focus for Stages 6–10

**Decision**: Prioritize snapshot + interaction integration tests for all five Phase 2 surfaces.

**Rationale**:  
- Matches constitution stage requirement for Stages 6–10.  
- Captures regressions in tab/filter/section behavior and empty states.  
- Ensures acceptance scenarios are independently testable per story.

**Alternatives considered**:  
- Unit-only strategy (rejected: insufficient for UI interaction guarantees).  
- Full E2E-first strategy (rejected for current phase scope/overhead).

---

**Result**: All clarifications resolved; no remaining `NEEDS CLARIFICATION` items.
