# Magic Moon → React Native (Expo) Migration Plan

## Objective
Migrate the current Astro web app to a React Native app built with Expo for **Android** and **iOS**, while preserving:
- Existing workflows (day view, month view, navigation flow).
- Existing behaviors (phase calculations, date/event time formatting, month transitions, highlights).
- Visual style as close as possible (moon rendering, space background motion, typography hierarchy, spacing).

This plan is intentionally split into small phases so each phase can be delivered in a compact, low-risk commit.

---

## Execution Status
- ✅ Phase 0 completed (Expo scaffold in `apps/mobile`).
- ✅ Phase 1 completed (domain modules + unit tests scaffolded).
- ✅ Phase 2 completed (expo-router route mapping + safe param parsing).
- ✅ Phase 3 completed (`MoonPhase` component and demo route).
- ✅ Phase 4 completed (day screen parity implementation).
- ✅ Phase 5 completed (month screen parity implementation).
- ✅ Phase 6 completed (animated starfield and global dark styling).
- ✅ Phase 7 completed (verification commands run, migration artifacts committed).

---

## Ground Rules
1. **Behavior parity first, platform adaptation second.**
2. **No feature changes** during migration (only equivalence).
3. **Small PRs/commits** by phase with clear acceptance criteria.
4. **Single source of truth for moon data** retained from existing `moonData.json`.
5. **Cross-platform verification** required in Android + iOS simulators/emulators for every UI phase.

---

## Current App Inventory (to preserve)
- **Routes / flows**
  - `/` redirects to today day page.
  - `/day/:year-:month-:day` shows selected day moon details + phase limits shortcuts.
  - `/month/:year-:month` shows month calendar with daily moon tiles and next/previous month navigation.
- **Core modules**
  - `src/services/moonApi.ts`: year and month data selection from static JSON.
  - `src/utils/types.utils.ts`: moon data typing.
  - `src/utils/i18n.utils.ts`: i18n map (es/en).
  - `src/components/Moon.astro`: visual moon rendering + phase shadow logic.
- **Visual identity**
  - Animated space background.
  - Moon texture map + subtle glow.
  - Dark theme and text hierarchy.

---

## Target Expo Architecture
- `apps/mobile` (or root Expo app, depending on repository preference).
- React Native + Expo + TypeScript.
- Navigation with `expo-router` (recommended for route parity) or React Navigation stack/tab equivalent.
- Domain modules can be copied/adapted directly into the Expo app (no requirement to keep web/mobile shared files, since the NextJS app will be deprecated later):
  - `src/domain/moonApi.ts`
  - `src/domain/types.ts`
  - `src/domain/i18n.ts`
- Presentational components:
  - `MoonPhase` (RN/SVG implementation of current algorithm).
  - `StarfieldBackground`.
  - `DayScreen`, `MonthScreen`.

---

## Phase Plan

### Phase 0 — Bootstrap & repo scaffolding
**Goal:** Introduce Expo app skeleton without touching existing Astro behavior.

**Tasks**
- Initialize Expo TypeScript app.
- Add lint/format/test baseline matching repository standards.
- Define folder structure for domain, components, and screens.
- Ensure Android and iOS run locally.

**Deliverable / commit scope**
- New Expo scaffold + scripts + minimal “hello app”.

**Acceptance criteria**
- `npm run <mobile-start>` launches Expo.
- App builds and opens in both Android and iOS.
- No changes to Astro app behavior.

---

### Phase 1 — Domain parity (data/types/i18n)
**Goal:** Port logic modules exactly as-is into the mobile codebase so data behavior matches web app.

**Tasks**
- Copy `types.utils.ts` logic into mobile `types.ts`.
- Copy `i18n.utils.ts` logic into mobile `i18n.ts`.
- Copy `moonApi.ts` logic + include `moonData.json` as app asset/module.
- Add unit tests for key selectors (`getYearsFromMoonData`, `getMoonData`).

**Deliverable / commit scope**
- Pure domain modules + tests, no final UI yet.

**Acceptance criteria**
- Same output for sample month/day lookups as current web app.
- Tests pass in CI/local.

---

### Phase 2 — Navigation and route mapping
**Goal:** Reproduce current route semantics in native navigation.

**Tasks**
- Implement equivalent navigation:
  - Root landing resolves to “today day screen”.
  - Day route params: year/month/day.
  - Month route params: year/month.
- Add helpers for date parsing/validation and fallback defaults.
- Ensure deep links can open day/month screens.

**Deliverable / commit scope**
- Navigation skeleton + placeholder screens wired with params.

**Acceptance criteria**
- Opening app lands on today day flow.
- Can navigate Day ↔ Month with matching params.
- Invalid params fail gracefully to current date.

---

### Phase 3 — Moon visual component parity
**Goal:** Rebuild `Moon.astro` behavior in React Native.

**Tasks**
- Implement moon texture + mask/shadow via `react-native-svg`.
- Port the exact waxing/waning + terminator path algorithm.
- Add optional glow and texture animation (matching current behavior).
- Create visual regression checklist for representative phases:
  - New, first quarter, full, last quarter, waxing crescent, waning gibbous.

**Deliverable / commit scope**
- `MoonPhase` component + story/demo screen.

**Acceptance criteria**
- Moon shape orientation and lighting match the web for same inputs.
- Animation and glow are visually close on Android/iOS.

---

### Phase 4 — Day screen parity
**Goal:** Implement full day view identical in behavior/content.

**Tasks**
- Build day header (`Magic Moon`, “Ver mes” action).
- Show large moon, formatted date/time, phase text + percentage.
- Build 4-item phase limit grid with day shortcut behavior.
- Preserve date/time offset behavior from current implementation.

**Deliverable / commit scope**
- Fully functional day screen consuming shared domain modules.

**Acceptance criteria**
- For same date, displayed phase + percentage + labels match web app.
- Grid links navigate correctly to other days in same month.

---

### Phase 5 — Month screen parity
**Goal:** Implement monthly calendar with equivalent layout logic and navigation.

**Tasks**
- Render weekday headers with i18n abbreviations.
- Render day cells with first-day offset behavior.
- Preserve ring/highlight behavior for phase limits.
- Implement previous/next month navigation logic including year wrap rules.

**Deliverable / commit scope**
- Fully functional month screen.

**Acceptance criteria**
- Month title/labels/nav behavior match web app logic.
- Cell ordering and first-week alignment match source app.

---

### Phase 6 — Global styling & background parity
**Goal:** Match the app’s aesthetic and motion.

**Tasks**
- Add animated star/space background analog.
- Tune spacing, font sizes, opacity, and component sizing.
- Ensure safe-area behavior and device-size responsiveness.

**Deliverable / commit scope**
- Polished visual layer applied to both screens.

**Acceptance criteria**
- Android and iOS screenshots are visually close to Astro app.
- No layout breakage across small and large devices.

---

### Phase 7 — QA, performance, and release readiness
**Goal:** Harden the migrated app for production usage.

**Tasks**
- Cross-platform QA matrix (Android/iOS, multiple dates/month edges).
- Performance checks (initial load, screen transition smoothness).
- Offline behavior verification for bundled moon data.
- Add app icons/splash and store metadata baseline.

**Deliverable / commit scope**
- QA fixes + release checklist.

**Acceptance criteria**
- No parity blockers remaining.
- Build artifacts generated successfully for both platforms.

---

## Recommended Commit/PR Slicing
- One phase per PR/commit wherever possible.
- If a phase is large (Phase 3/4/5), split into sub-commits:
  - `feat(mobile): phase-3a moon svg static`
  - `feat(mobile): phase-3b moon animation/glow`
  - `feat(mobile): phase-3c visual parity fixes`

---

## Risks & Mitigations
- **SVG parity differences (web vs RN):** mitigate with fixed test inputs + screenshot comparisons.
- **Font/render differences by platform:** define acceptable tolerance and tune style tokens.
- **Date/time locale differences:** centralize formatting utility and test with fixture dates.
- **Large JSON bundle size:** keep existing pruning strategy (no SVG blobs) and monitor app size.

---

## Definition of Done (overall migration)
1. Android + iOS apps reproduce day/month workflows with the same behavior.
2. Moon phase rendering is visually equivalent for all key phase states.
3. Existing data semantics and i18n labels are preserved.
4. QA checklist completed with no critical parity gaps.
