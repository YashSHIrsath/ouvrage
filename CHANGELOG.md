# CHANGELOG

All notable changes to the public website are documented here.
Each stage records every issue resolved, files changed, and final status.

---

## Phase 2 — Stage 1: Critical Bugs + Accessibility

**Branch:** `phase2-stage1`
**Goal:** Fix all crashes, broken layouts, accessibility blockers, and missing SEO before any feature work.

| Issue | Title | Status |
|-------|-------|--------|
| H-01 | Fix ProjectsPreview 4-item 3-column grid | Complete |
| P-01 | Refactor ProjectsSection for variable project count | Complete |
| G-01 | Create 404 NotFoundPage + route | Complete |
| G-02 | Add SEO title + meta description to all 7 pages + 404 | Complete |
| G-03 | Add global `:focus-visible` styles | Complete |
| C-01 | Contact form validation with React Hook Form + Zod | Complete |
| C-02 | Add `<label>` elements to all contact form fields | Complete |
| S-05 | Convert ServicesSection accordion rows from `<div>` to `<button>` | Complete |
| H-05 | HeroSection badge optional chaining (crash guard) | Complete |

---

### H-01: Fix ProjectsPreview 4-item 3-column Grid

**Status:** Complete
**Files changed:**
- `frontend/src/features/home/components/ProjectsPreview/ProjectsPreview.module.css`

Changed desktop `grid-template-columns: repeat(3, 1fr)` to `repeat(4, 1fr)`. Four project cards now fill the grid cleanly without an orphaned card on a second row.

---

### P-01: Refactor ProjectsSection for Variable Project Count

**Status:** Complete
**Files changed:**
- `frontend/src/features/home/components/ProjectsSection/ProjectsSection.tsx`

Replaced direct index access (`PROJECTS[0]`, `PROJECTS[3]`) with safe variable extraction and conditional rendering. Component now renders gracefully with 0–4+ projects: 0 = null, 1 = large card only, 2–3 = large + stacked pair, 4 = full layout including wide strip.

---

### G-01: Create 404 NotFoundPage + Route

**Status:** Complete
**Files changed:**
- `frontend/src/pages/NotFoundPage.tsx` (new)
- `frontend/src/routes/index.tsx`

Created NotFoundPage using PageHero + CtaBanner. Added `{ path: '*', element: <NotFoundPage /> }` as the last child of PublicLayout in the router so it inherits the full site shell.

---

### G-02: Add SEO Meta Tags to All Pages

**Status:** Complete
**Files changed:**
- `frontend/src/pages/HomePage.tsx`
- `frontend/src/pages/AboutPage.tsx`
- `frontend/src/pages/ServicesPage.tsx`
- `frontend/src/pages/ProjectsPage.tsx`
- `frontend/src/pages/TestimonialsPage.tsx`
- `frontend/src/pages/FaqPage.tsx`
- `frontend/src/pages/ContactPage.tsx`
- `frontend/src/pages/NotFoundPage.tsx`

Added `<title>` and `<meta name="description">` to all 8 pages using React 19's native head hoisting — no external library required.

---

### G-03: Add Global `:focus-visible` Styles

**Status:** Complete
**Files changed:**
- `frontend/src/index.css`

Added `:focus:not(:focus-visible) { outline: none }` + `:focus-visible { outline: 2px solid var(--site-primary); outline-offset: 3px }`. Keyboard navigation now shows a branded orange ring on every interactive element. Mouse/touch interactions are unaffected.

---

### C-01: Contact Form Validation (React Hook Form + Zod)

**Status:** Complete
**Files changed:**
- `frontend/src/features/home/components/CtaSection/CtaSection.tsx`
- `frontend/src/features/home/components/CtaSection/CtaSection.module.css`

Added Zod schema validating name (min 2), email (format), message (min 10). `zodResolver` wires schema to RHF. Button disabled + shows "Sending..." during async submission. `aria-invalid` and `aria-describedby` pair each error to its field via `role="alert"`.

---

### C-02: Add `<label>` Elements to Contact Form Fields

**Status:** Complete
**Files changed:**
- `frontend/src/features/home/components/CtaSection/CtaSection.tsx`
- `frontend/src/features/home/components/CtaSection/CtaSection.module.css`

Added visible `<label htmlFor>` + matching `id` on every field. `.fieldGroup` wrapper groups label, input, and error message. `.fieldLabel`, `.required`, `.fieldError`, `.submitBtn:disabled` added to CSS. Implemented together with C-01.

---

### S-05: ServicesSection Accordion `<div>` → `<button>`

**Status:** Complete
**Files changed:**
- `frontend/src/features/home/components/ServicesSection/ServicesSection.tsx`
- `frontend/src/features/home/components/ServicesSection/ServicesSection.module.css`

Changed `.rowHeader` from `<div onClick>` to `<button type="button">` with `aria-expanded` and `aria-controls`. Added button reset CSS to `.rowHeader`. Removed `cursor: pointer` from `.row` (now belongs to `.rowHeader`). Added `role="region" aria-label` to expandable body divs.

---

### H-05: HeroSection Badge Optional Chaining

**Status:** Complete
**Files changed:**
- `frontend/src/features/home/components/HeroSection/HeroSection.tsx`

Extracted `const featured = PROJECTS[0] ?? null`. Wrapped the badge JSX in `{featured && (...)}`. Badge is hidden when no project data exists rather than crashing with a TypeError.

---
