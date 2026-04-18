# Data Model: Phase 2 — Enhanced UI & Component Logic

**Date Generated**: 2026-04-18  
**Scope**: Competitions, Favorites, Search, Match Center, News Details  
**Status**: Ready for task generation

---

## 1) Competition

**Purpose**: Represents an item in the leagues/competitions directory.

### Fields
- `id: string` — Unique competition identifier
- `name: string` — Display name
- `category: 'top' | 'domestic' | 'international' | 'cups'`
- `letterKey: string` — Normalized initial used for quick-jump sectioning
- `logoUri?: string`
- `country?: string`

### Validation Rules
- `name` must be non-empty
- `category` must match an allowed segment
- `letterKey` must be uppercase A–Z or `#` fallback

---

## 2) FavoriteItem

**Purpose**: User-saved entity in the Favorites hub.

### Fields
- `id: string`
- `type: 'team' | 'player' | 'league'`
- `displayName: string`
- `subtitle?: string`
- `imageUri?: string`
- `order: number`
- `updatedAt: string` (ISO timestamp)

### Validation Rules
- `type` drives segment ownership
- `order` must be unique within each `type`
- deleting one item re-normalizes order sequence in that segment

### State Transitions
- `added -> ordered -> removed`
- reorder updates only the active segment sequence

---

## 3) SearchQuery

**Purpose**: Represents a user query and filter context.

### Fields
- `id: string`
- `text: string`
- `filter: 'all' | 'clubs' | 'players' | 'news' | 'leagues'`
- `createdAt: string` (ISO timestamp)

### Validation Rules
- `text.trim().length > 0` for persisted recent queries
- filter defaults to `all` when not provided
- duplicate recents are de-duplicated by normalized `text + filter`

---

## 4) SearchResultItem

**Purpose**: Result entity across global search content types.

### Fields
- `id: string`
- `type: 'club' | 'player' | 'league' | 'news'`
- `title: string`
- `description?: string`
- `thumbnailUri?: string`
- `destinationRoute: string`
- `destinationParams?: Record<string, string>`

### Validation Rules
- `type` must align with active filter unless filter is `all`
- each item must include routable destination data

---

## 5) MatchDetail

**Purpose**: Primary fixture context consumed by all Match Center sections.

### Fields
- `matchId: string`
- `homeTeam: string`
- `awayTeam: string`
- `status: 'scheduled' | 'live' | 'ht' | 'ft' | 'postponed'`
- `score?: { home: number; away: number }`
- `info?: MatchInfoSection`
- `lineups?: MatchLineupsSection`
- `stats?: MatchStatsSection`
- `h2h?: MatchH2HSection`

### Validation Rules
- fixture identity (`matchId`) must remain stable while switching tabs
- missing section payloads are allowed and map to non-blocking fallback states

---

## 6) NewsArticle

**Purpose**: Rich content article with share and related-story support.

### Fields
- `id: string`
- `title: string`
- `author?: string`
- `publishedAt: string`
- `contentBlocks: NewsContentBlock[]`
- `shareUrl: string`
- `relatedArticleIds: string[]`

### Validation Rules
- content blocks must be typed (`paragraph`, `heading`, `image`, `embed`, etc.)
- unsupported embed blocks degrade to safe placeholder rendering
- `shareUrl` must be valid before enabling share action

---

## 7) Supporting Sub-Entities

- `MatchInfoSection` (stadium, referee, attendance)
- `MatchLineupsSection` (formation, starters, substitutes)
- `MatchStatsSection` (possession, shots, corners, cards)
- `MatchH2HSection` (historical fixture entries)
- `NewsContentBlock` (typed rich-content block model)

---

## Relationship Summary

- `Competition` belongs to one category and one alphabetical group.
- `FavoriteItem` belongs to one favorites segment (`type`).
- `SearchQuery` can produce multiple `SearchResultItem` across types.
- `MatchDetail` owns sectioned sub-entities (`info`, `lineups`, `stats`, `h2h`).
- `NewsArticle` contains multiple `NewsContentBlock` entities and references related articles.

---

## Traceability to Requirements

- FR-001/FR-002 → `Competition`
- FR-003–FR-006 → `FavoriteItem`
- FR-007–FR-009 → `SearchQuery`, `SearchResultItem`
- FR-010/FR-011 → `MatchDetail` + section sub-entities
- FR-012/FR-013 → `NewsArticle`, `NewsContentBlock` + optional/fallback fields
