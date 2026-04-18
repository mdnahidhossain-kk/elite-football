# Quickstart: Phase 2 Implementation & Validation Guide

**Purpose**: Validate implemented Phase 2 interaction behavior against FR-001..FR-013 and stage-level constraints.

---

## 1. Prerequisites

- Read `spec.md`, `plan.md`, `research.md`, `data-model.md`, and `contracts/ui-interaction-contracts.md`.
- Ensure acceptance scenarios and FR-001..FR-013 are understood by implementers and reviewers.
- Install dependencies: `npm install`.

---

## 2. Story-by-Story Validation Targets

### US1 — Competitions Directory
- Verify category tab behavior contract.
- Verify alphabetical quick-jump expectations and fallback for missing letters.
- Verify transition contract to competition details.

### US2 — Favorites Management
- Verify tab segmentation model (`team/player/league`) and independent ordering.
- Verify reorder persistence and immediate delete behavior.
- Verify empty-state guidance contract.

### US3 — Global Search
- Verify debounced search behavior and filter scoping.
- Verify recent-search recall contract.
- Verify explicit no-results state handling.

### US4 — Match Center
- Verify single fixture context remains stable across Info/Lineups/Stats/H2H.
- Verify unavailable section fallback behavior.

### US5 — News Details
- Verify rich content rendering contract and share behavior.
- Verify related-story navigation.
- Verify unsupported media graceful fallback.

---

## 3. Test Coverage Baseline (Stages 6–10)

- Snapshot coverage exists for the five primary Phase 2 surfaces.
- Integration coverage exists for:
  - category/filter/tab switching
  - reorder + remove actions
  - section navigation with stable context
  - empty/no-data/no-results states
  - related-article and share interactions

---

## 4. Implementation Notes & Constraints Alignment

- Type safety preserved across all new models and interaction flows.
- FlashList/Reanimated constraints respected in implementation tasks.
- Accessibility behavior included in acceptance and test cases.
- State ownership remains clear (favorites/search recency/match details slices).
- News details uses:
  - sanitized rich-content mapping with unsupported-media fallback
  - native share adapter via `shareArticle`
  - related-story navigation via `openRelatedArticle`

---

## 5. Validation Commands (Runbook)

Run from repository root:

- `npm run lint`
- `npm run type-check`
- `npm test`

Expected outcome: all commands pass with zero errors.

## 6. Phase 2 Exit Criteria Status

- [X] No unresolved clarification markers remain in planning artifacts.
- [X] Every functional requirement maps to at least one model/contract element.
- [X] Every user story has independent validation criteria.
- [X] Team agrees on fallback behavior for partial/missing content states.
- [X] Full repository validation pass completed (`lint`, `type-check`, `test` all passing).
