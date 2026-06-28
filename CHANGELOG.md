# CHANGELOG

All notable changes to the public website are documented here.
Each stage records every issue resolved, files changed, and final status.

---

## Phase 3 — Stage 3: Admin Services UI Refinements

**Goal:** Refine the layout of the Services CMS module by implementing collapsible panel widths, search filters, status counters, top-sticky save bars, wider responsive grids, and drawer overlays.

| Area | Change | Status |
|------|--------|--------|
| Frontend | Persistent Collapse Panel: Managed via Zustand `servicePanelStore.ts` persisting expanded (340px) vs collapsed (90px) layouts | Complete |
| Frontend | Search & Stats: Added search text filters and active/inactive count badges above the services list | Complete |
| Frontend | Collapsed layout: Compressed list item card to show grips and thumbnails only, with an Ant Design Tooltip title | Complete |
| Frontend | Sticky Action Header: Form editor header styled sticky (`position: sticky; top: 0`) showing titles, dirty state badges, and save/discard buttons | Complete |
| Frontend | Wider Form Grid: Form inputs arranged in 3 columns (Title \| Subtitle \| Status) and 2 columns (Icon \| Image Upload) | Complete |
| Frontend | Responsive layout: Tablet forces narrow panel width, and mobile renders full list as a side drawer overlay | Complete |
| Frontend | Topbar: Registered breadcrumb label `'Website / Services'` in routing map | Complete |

---

## Phase 3 — Stage 2: Website CMS Integration (Services Blueprint)

**Goal:** Implement database persistence, API endpoints, TanStack Query integration, drag-and-drop reordering, and preset image cropping for the Services CMS module.

| Area | Change | Status |
|------|--------|--------|
| Backend | Migration: Create `services` table with static unique `slug` and custom indexes | Complete |
| Backend | Eloquent Model: `Service` model with status/sorting scopes and custom image URL accessors | Complete |
| Backend | Validation: `ServiceRequest` for store/update validation and 5MB image limits | Complete |
| Backend | Controller: `ServiceController` implementing RESTful CRUD, separate original/cropped folder uploads, optimized reordering, and future-proof tracking TODOs | Complete |
| Backend | Routes: REST API routes registered in `routes/api.php` | Complete |
| Frontend | API Client & Hooks: `servicesApi.ts` client and `useServices` TanStack Query hooks | Complete |
| Frontend | UI Component: `SortableServiceItem` card using `@dnd-kit` for optimistic reordering | Complete |
| Frontend | UI Component: Reusable `ImageCropperModal` using `react-easy-crop` and custom preset overrides | Complete |
| Frontend | Page: Wired split master-detail `ServicesPage.tsx` with CRUD actions and optimistic reordering | Complete |
| Frontend | Unsaved Changes: Beforeunload tab close warnings and React Router `useBlocker` transition confirmation guards | Complete |

---

## Phase 3 — Stage 1: Admin Authentication

**Branch:** `phase3-stage1`
**Goal:** Implement session-based admin authentication. Laravel Sanctum SPA cookies, single admin account, no registration, 5-attempt lockout.

| Area | Change | Status |
|------|--------|--------|
| Backend | Install Laravel Breeze API stack (Sanctum + stateful API middleware) | Complete |
| Backend | Migration: add `role`, `status`, `theme_mode`, `last_login_at` to `users` table | Complete |
| Backend | `User` model: `HasApiTokens`, new fillable fields, casts, `isAdmin()`, `scopeActive()`, `scopeAdmin()` | Complete |
| Backend | `LoginRequest`: credential check + `status === 1` + `role === admin` guard + 5-attempt / 10-min throttle | Complete |
| Backend | `AuthController`: `login()`, `logout()`, `me()` — extends `BaseApiController` | Complete |
| Backend | `EnsureAdmin` middleware: checks auth, role, and status = 1 | Complete |
| Backend | `CreateAdmin` artisan command: `php artisan app:create-admin` | Complete |
| Backend | `routes/api.php`: `POST v1/auth/login`, `POST v1/auth/logout`, `GET v1/auth/me` | Complete |
| Backend | `bootstrap/app.php`: `admin` middleware alias registered | Complete |
| Backend | `.env`: `SESSION_DOMAIN=localhost`, `SANCTUM_STATEFUL_DOMAINS` configured | Complete |
| Frontend | `features/auth/types/index.ts`: `AdminUser`, `LoginCredentials` | Complete |
| Frontend | `features/auth/api/authService.ts`: `login()`, `logout()`, `me()` with CSRF cookie prefetch | Complete |
| Frontend | `stores/authStore.ts`: Zustand store — user, isInitializing, no persistence | Complete |
| Frontend | `features/auth/hooks/useAuth.ts`: `initAuth`, `login`, `logout` with navigation side-effects | Complete |
| Frontend | `LoginForm` component: react-hook-form + existing TextInput/PasswordInput/Button | Complete |
| Frontend | `pages/portal/LoginPage.tsx`: standalone login page with redirect if already authed | Complete |
| Frontend | `routes/AuthInit.tsx`: root layout route — calls `initAuth()` once on mount | Complete |
| Frontend | `routes/RequireAuth.tsx`: guards `/admin/*` — redirects to `/portal/login` if unauthenticated | Complete |
| Frontend | `routes/index.tsx`: `/portal/login` + `RequireAuth`-wrapped `/admin` routes added | Complete |

---

## Phase 2 — Stage 2: Page Flow, CMS Readiness, and Information Hierarchy

**Branch:** `phase2-stage1` (continuing)
**Goal:** Add missing sections to all pages, make every section data-driven, create reusable shared components, and prepare the frontend for CMS integration.

| Area | Change | Status |
|------|--------|--------|
| Shared | `SiteSectionHeader` component | Complete |
| Shared | `StatsSection` component (variable column count via `auto-fit`) | Complete |
| Shared | `CtaBanner` configurable props (optional secondary button) | Complete |
| About | Extract `VALUES` to `features/about/data/values.ts` | Complete |
| About | TeamSection: remove "View Profile" + `ArrowUpRight`, add `featured` field | Complete |
| About | Fix `AboutPreviewSection` bottom padding (`6rem 11rem` → `6rem`) | Complete |
| About | Add `StatsSection` between Values and Team with `ABOUT_STATS` | Complete |
| Services | Fix `ProcessSection` hardcoded color → `--site-surface`, add to `ServicesPage` + `CtaBanner` | Complete |
| Projects | Add `ProjectFilter` pill UI + `CtaBanner` to `ProjectsPage` | Complete |
| Testimonials | `TESTIMONIAL_STATS` data, `ClientLogosStrip` component, add to `TestimonialsPage` + `CtaBanner` | Complete |
| FAQ | Add `CtaBanner` ("Still have questions?", single "Contact Us" button) | Complete |
| Contact | `OFFICES` data, `OfficesSection` component, add to `ContactPage` | Complete |

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
