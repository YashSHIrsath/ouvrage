# AI_HANDOFF.md

Complete project handoff document for another AI developer continuing this codebase.
Written as of 2026-06-28. No codebase access required to understand this document.

---

# 1. Project Overview

## What This Website Is

BuildCo is a premium construction company website for a fictional firm ("BuildCo Group") that offers building construction, land development, architecture, project management, and engineering consultation. The company positions itself as a high-end integrated delivery firm operating in Dubai, London, and Sydney since 1996.

The website has two distinct parts:

**Public website** — A fully dark, Figma-matched marketing site with 7 public pages. The aesthetic is intentionally industrial and architectural: sharp 0px radii, heavy condensed display typography, orange brand accent, dark backgrounds. It is permanently dark — not user-switchable.

**Admin panel** — A CMS for the company's administrators to manage all website content (services, projects, testimonials, FAQ, team, contact messages, site settings, and theme). The **Services** module is fully implemented as a database-backed CMS reference module with optimistic drag reordering, preset canvas cropping, and route navigation guards.

## Current Development Stage

**Phase 3 Stage 2 complete** — The Services module has been fully implemented with backend database persistence (Laravel 12, Eloquent, migrations, API validation, routes) and React frontend integration (TanStack Query hooks, drag-and-drop list sorting, aspect-ratio canvas cropper modal, beforeunload and route-change blockers for unsaved changes). It serves as the blueprint for all future CMS modules.

## Overall Architecture

```
Construction Website/
├── frontend/          ← React 19 + Vite + TypeScript
│   └── src/
│       ├── app/       ← Providers (ThemeProvider, QueryProvider, etc.)
│       ├── pages/     ← Route-level page components
│       ├── layouts/   ← PublicLayout, AdminLayout
│       ├── components/← Shared reusable components (ui, forms, sections, navigation, typography)
│       ├── features/  ← Feature modules (home, about, faq)
│       ├── routes/    ← React Router configuration
│       ├── styles/    ← Global CSS: fonts.css, site-theme.css
│       └── assets/    ← Self-hosted fonts (woff2) and locally downloaded images
│
├── backend/           ← Laravel 12 + MySQL
│   ├── app/
│   │   ├── Http/Controllers/Api/BaseApiController.php ← Base JSON response helpers
│   │   └── Models/User.php
│   └── routes/api.php ← Route stubs for v1/public/* and v1/admin/*
│
└── DOCS/              ← 13 documentation files (source of truth for all decisions)
```

**Key architectural decisions:**

1. The public site uses `--site-*` CSS custom properties (always dark). The admin panel uses `--color-*` vars from Ant Design's ThemeProvider via a CssVarSyncer. These two systems are completely separate and must never be mixed.

2. All data is currently served from local TypeScript files in `features/*/data/`. These are designed to be replaced by API calls (TanStack Query) once the backend is built. The data shapes defined in these files match the intended database schema.

3. The public site header is `position: fixed`. Every inner page hero must use `padding-top: calc(var(--site-header-h-*) + Xrem)` to clear it. The `PageHero` component handles this automatically.

4. CSS Modules are used for all component styling. No Tailwind. No inline styles. No hardcoded hex values in component CSS — only `var(--site-*)` tokens.

---

# 2. Routes and Pages

## Public Routes (wrapped by `PublicLayout`)

`PublicLayout` renders: `<Header />` → `<main><Outlet /></main>` → `<Footer />`

---

### `/` — Home Page

**File:** `frontend/src/pages/HomePage.tsx`

**Sections rendered:**
1. `HeroSection` — full-viewport hero
2. `MarqueeSection` — client ticker strip
3. `ServicesPreview` — 3-card service grid with link to /services
4. `ProjectsPreview` — 4-card project photo grid with link to /projects
5. `TestimonialPreview` — single featured quote with link to /testimonials
6. `CtaBanner` — "Get a Quote" + "View Our Work" CTA strip (no form)

**Purpose:** Landing page. Introduces the company, teases three core content areas (services, projects, client voice), and funnels visitors to the contact page. Does NOT contain the full versions of any section — those live on dedicated pages.

**Completion:** UI 90% — missing API connections, scroll-triggered animations, and SEO meta tags.

---

### `/about` — About Page

**File:** `frontend/src/pages/AboutPage.tsx`

**Sections rendered:**
1. `PageHero` — label "01 / About", headline "WHO / WE ARE" + subtitle
2. `AboutPreviewSection` — company origin story (1996, global expansion), text + inset image
3. `MissionValuesSection` — mission statement strip + 4-value grid (Precision, Integrity, Scale, Partnership)
4. `TeamSection` — 4-column photo grid with hover overlay (grayscale → color, orange overlay)

**Purpose:** Full company narrative. Tells the brand story, states values, and introduces leadership team.

**Completion:** UI 80% — missing a stats strip (340+ projects, 28 years, $4.2B assets, 94% on-time). The DOCS/PAGE_ARCHITECTURE.md also calls for Mission, Vision, and Values subsections separately — currently Mission is inside MissionValuesSection as one combined component. No API connections. Missing individual team member profile pages.

---

### `/services` — Services Page

**File:** `frontend/src/pages/ServicesPage.tsx`

**Sections rendered:**
1. `PageHero` — label "02 / Services", headline "WHAT / WE DO" + subtitle
2. `ServicesSection` — full 5-item accordion list with expand/collapse

**Purpose:** Complete list of all company services with expandable detail per service. Each row shows service number, title, subtitle, and a +/− toggle. Expanded state shows description and tag badges.

**Completion:** UI 85% — the `ServicesSection` has "01 / Services" hardcoded as its internal SectionLabel, which appears directly below the PageHero's "02 / Services" label. This redundancy is minor but could be cleaned up by making ServicesSection's header conditional. No API connections. No service detail pages (individual /services/building-construction).

---

### `/projects` — Projects Page

**File:** `frontend/src/pages/ProjectsPage.tsx`

**Sections rendered:**
1. `PageHero` — label "03 / Projects", headline "OUR / WORK" + subtitle
2. `ProjectsSection` — full featured layout: large card + 2 stacked + 1 wide landscape strip

**Purpose:** Portfolio showcase of completed projects. Currently shows all 4 projects in a curated editorial grid layout.

**Completion:** UI 75% — missing: project filtering/categories (DOCS calls for this), pagination for larger project sets, individual project detail pages (/projects/meridian-tower), and API connections. The current layout is hardcoded for exactly 4 projects by design (indexes 0, 1, 2, 3 used explicitly in ProjectsSection.tsx:lines 28, 56, 80).

---

### `/testimonials` — Testimonials Page

**File:** `frontend/src/pages/TestimonialsPage.tsx`

**Sections rendered:**
1. `PageHero` — label "04 / Testimonials", headline "CLIENT / VOICE" + subtitle
2. `TestimonialsSection` — carousel with prev/next chevrons, dot indicators, counter (1/3)

**Purpose:** Social proof page with all 3 client testimonials in a rotating carousel.

**Completion:** UI 85% — only 3 testimonials in data file. Missing: a full grid/list display option for many testimonials, API connections. The carousel handles only 3 items and is not paginated.

---

### `/faq` — FAQ Page

**File:** `frontend/src/pages/FaqPage.tsx`

**Sections rendered:**
1. `PageHero` — label "05 / FAQ", headline "COMMON / QUESTIONS" + subtitle
2. `FaqSection` — 6-item accordion using CSS grid expand trick

**Purpose:** Frequently asked questions about BuildCo's services, process, coverage, and delivery model.

**Completion:** UI 85% — 6 hardcoded questions in `features/faq/data/faq.ts`. DOCS calls for FAQ categories — not implemented. No API connections.

---

### `/contact` — Contact Page

**File:** `frontend/src/pages/ContactPage.tsx`

**Sections rendered:**
1. `PageHero` — label "06 / Contact", headline "GET IN / TOUCH" + subtitle
2. `CtaSection` — two-column: left (headline + contact details) + right (project enquiry form)

**Purpose:** Primary conversion page. Full form with Name, Company, Email, Service selector (populated from SERVICES data), and Message. Has fake success state that triggers on submit — no actual API call is made.

**Completion:** UI 75% — the form submits to nothing (`e.preventDefault()` + `setSubmitted(true)`). Missing: real form submission to Laravel API, email notification, contact message storage, form validation (no React Hook Form used here), map embed. The CtaSection also renders "06 / Contact" as its SectionLabel directly below the PageHero header.

---

## Admin Routes (wrapped by `AdminLayout`)

`AdminLayout` uses Ant Design's `<Layout>` with an empty `<Sider>` (width 240px) and empty `<Header>`. The `<Content>` renders the Outlet.

---

### `/admin` — Dashboard

**File:** `frontend/src/pages/admin/DashboardPage.tsx`

**Content:** `<div>Dashboard</div>` — placeholder only.

**Completion:** 0%

---

### `/admin/settings` — Site Settings

**File:** `frontend/src/pages/admin/SiteSettingsPage.tsx`

**Content:** Not read — assumed placeholder based on pattern.

**Completion:** 0%

---

### `/admin/theme` — Theme Settings

**File:** `frontend/src/pages/admin/ThemeSettingsPage.tsx`

**Content:** Not read — assumed placeholder based on pattern.

**Completion:** 0%

---

# 3. Home Page Breakdown

## HeroSection

**File:** `frontend/src/features/home/components/HeroSection/`

**Purpose:** Primary brand statement. Full-viewport first impression. Establishes the dark aesthetic, typography scale, and orange brand identity.

**Layout:** Two-panel on desktop. Left panel (44% width) contains the text content. Right panel (58%, `position: absolute`) contains the hero image with gradient overlays. On mobile, only the left panel is shown (right panel: `display: none`). The section uses `min-height: 100svh` and `display: flex; flex-direction: column` so the stats bar sticks to the bottom.

**Structure:**
- `div.gridBg` — 80px crosshatch grid overlay (CSS background-image, `var(--site-grid-line)`)
- `div.body` — flex row container
  - `div.left` — content panel: eyebrow text ("Est. 1996 · Dubai · London · Sydney") + H1 headline ("BUILDING / THE (hollow) / FUTURE") + subtitle + two CTA links + animated scroll cue
  - `div.right` — image panel: `<img src={heroImg}>` + 3 overlay divs (left gradient fade, dark overlay, orange right stripe) + floating project badge
- `div.statsBar` — full-width dark glass bar at bottom, contains `SiteContainer` > stats grid (2-col mobile, 4-col desktop)

**Components used:** `SiteContainer` (for stats bar only — the main content uses direct padding via CSS vars, not SiteContainer)

**Data source:** `features/home/data/stats.ts` (4 stats), `features/home/data/projects.ts` (project badge uses PROJECTS[0].title and PROJECTS[0].location)

**Images:** `@/assets/images/hero-bg.jpg` (self-hosted)

**Key CSS:** `.headlineHollow` uses `-webkit-text-stroke: 1.5px var(--site-stroke); color: transparent` for the hollow text effect on "THE". `.scrollDot` uses `@keyframes heroBounce` for the bouncing scroll indicator.

**Completion:** 100% (UI only, no API)

---

## MarqueeSection

**File:** `frontend/src/features/home/components/MarqueeSection/`

**Purpose:** Visual separator / social proof. Scrolling ticker of 10 client names on orange background. Draws the eye, reinforces credibility, creates a visual break between Hero and Services.

**Layout:** Single full-width horizontal strip. No SiteContainer — intentionally full bleed. The `.inner` div contains client names doubled (20 items) and animates at -50% translation to create seamless loop.

**Structure:**
- `div.track` — `background: var(--site-primary)`, `overflow: hidden`
  - `div.inner` — `animation: marqueeScroll 30s linear infinite` (paused on hover)
    - 20× `span.item` — client name + ◆ separator

**Components used:** None (no shared components)

**Data source:** `features/home/data/clients.ts` — 10 client name strings, doubled in component to fill marquee

**Key behavior:** `const doubled = [...CLIENTS, ...CLIENTS]` creates 20 items. The CSS animation translates by exactly -50% which returns to the start position when the second copy begins, creating a seamless loop.

**Completion:** 100%

---

## ServicesPreview

**File:** `frontend/src/features/home/components/ServicesPreview/`

**Purpose:** Teaser of the company's service offerings. Shows the first 3 of 5 services. Drives traffic to /services for the full accordion.

**Layout:** Single-column on mobile (full-width cards stacked with `border-bottom`). Three-column grid on desktop (1024px+) with `border-right` separators between columns. The top border is on the `.grid` container, bottom border on each `.card` (mobile) or on the grid container (desktop).

**Structure:**
- `section.section` — `border-top: 1px solid var(--site-border)`
  - `SiteContainer`
    - `div.header` — flex row on desktop: left = SectionLabel "02 / Services", right = h2 "WHAT WE BUILD" + "All Services →" link
    - `div.grid` — 3-column grid on desktop
      - 3× `div.card` — cardNum (DM Mono, orange) + cardTitle (Barlow Condensed 900) + cardSub (DM Mono, muted) + `div.cardTags` (max 3 tags shown, orange border)

**Components used:** `SiteContainer`, `SectionLabel`

**Data source:** `features/home/data/services.ts` — uses `.slice(0, 3)` for first 3 services

**Completion:** 100% (UI only)

---

## ProjectsPreview

**File:** `frontend/src/features/home/components/ProjectsPreview/`

**Purpose:** Visual portfolio teaser showing all 4 projects as image cards. On mobile, only first 2 cards are visible (cards 3+ hidden via `display: none` on `.card:nth-child(n+3)` at <1024px). On desktop, all 4 in a 4-column grid.

**Layout:** 1-column mobile (shows only 2), 4-column desktop grid. Each card has `aspect-ratio: 3/4` on desktop, `4/3` on mobile. Image zoom on hover (CSS `transform: scale(1.04)` transition). Gradient overlay darkens the bottom half for text legibility.

**Structure:**
- `section.section` — `border-top: 1px solid var(--site-border)`
  - `SiteContainer`
    - `div.header` — SectionLabel "03 / Projects" + h2 "SELECTED WORK" + "All Projects →" link
    - `div.grid` — photo card grid
      - 4× `Link` to="/projects" `.card` — `div.imgWrap > img.img` + `div.overlay` + `div.meta` (metaType label + cardTitle + cardLocation)

**Components used:** `SiteContainer`, `SectionLabel`

**Data source:** `features/home/data/projects.ts` — all 4 projects

**Completion:** 100% (UI only) — note: all 4 cards link to /projects (no individual project pages yet)

---

## TestimonialPreview

**File:** `frontend/src/features/home/components/TestimonialPreview/`

**Purpose:** Social proof highlight. Shows the first testimonial with full quote text, author avatar (initials), name, role, and a link to the full testimonials page.

**Layout:** Single-column on mobile. On desktop (1024px+), two-column grid: left column (220px) contains a decorative oversized `"` in primary color at 12% opacity, right column contains the quote and author.

**Structure:**
- `section.section` — `background: var(--site-surface)`, `border-top`
  - `SiteContainer`
    - SectionLabel "04 / Client Voice"
    - `div.layout` — grid (1-col mobile, 220px + 1fr desktop)
      - `div.mark` — decorative `"` (hidden on mobile)
      - `div` — `blockquote.quote` + `div.author` (avatar + name/role) + "Read All Testimonials →" link

**Components used:** `SiteContainer`, `SectionLabel`

**Data source:** `features/home/data/testimonials.ts` — uses TESTIMONIALS[0] only

**Completion:** 100% (UI only)

---

## CtaBanner

**File:** `frontend/src/features/home/components/CtaBanner/`

**Purpose:** Final home page conversion section. No form — just a strong headline and two action buttons. "Get a Quote" routes to /contact; "View Our Work" routes to /projects.

**Layout:** Two-column on desktop (50/50 split). Single column on mobile. Has a decorative 4px orange left bar (`position: absolute`) and crosshatch grid background. The left column shows the section label and a large stacked headline. The right column shows body text and two buttons (primary filled + secondary bordered).

**Structure:**
- `section.section` — `border-top`, `position: relative`, `overflow: hidden`
  - `div.gridBg` — 80px crosshatch overlay
  - `div.accentBar` — 4px orange absolute left bar (height 100%)
  - `SiteContainer.container` — `position: relative; z-index: 1`
    - `div.layout` — grid
      - Left: SectionLabel "05 / Start Here" + h2 "READY TO BUILD / BUILD / SOMETHING (orange) / REMARKABLE?"
      - Right: `p.body` + `div.actions` (primary Link to="/contact" + secondary Link to="/projects")

**Components used:** `SiteContainer`, `SectionLabel`

**Data source:** None (static copy)

**Completion:** 100%

---

# 4. All Feature Components

## Home Feature Components

Located in: `frontend/src/features/home/components/`
Barrel export: `frontend/src/features/home/components/index.ts`

---

### HeroSection

**File:** `frontend/src/features/home/components/HeroSection/`
**Purpose:** Full-viewport hero section with split layout, hero image, floating badge, stats bar
**Props:** None (self-contained)
**Children:** Uses SiteContainer (for stats bar)
**Used on:** `/` (HomePage)
**Status:** Complete — UI only

---

### MarqueeSection

**File:** `frontend/src/features/home/components/MarqueeSection/`
**Purpose:** Infinite scrolling orange ticker of client names
**Props:** None (reads from CLIENTS data)
**Children:** None
**Used on:** `/` (HomePage)
**Status:** Complete — UI only

---

### AboutPreviewSection

**File:** `frontend/src/features/home/components/AboutPreviewSection/`
**Purpose:** Company story section with two-column layout (display headline left, body copy + inset image right)
**Props:** None (static copy)
**Children:** SiteContainer, SectionLabel
**Used on:** `/about` (AboutPage)
**Status:** Complete — UI only. Note: SectionLabel is hardcoded "00 / About" which shows below PageHero on /about.

---

### ServicesSection

**File:** `frontend/src/features/home/components/ServicesSection/`
**Purpose:** Full 5-item accordion list of all company services. Each row expands to show description and tags. Uses CSS `grid-template-rows: 0fr → 1fr` trick for smooth expand animation without JS height calculation.
**Props:** None (reads from SERVICES data)
**Children:** SiteContainer, SectionLabel
**Used on:** `/services` (ServicesPage)
**Status:** Complete — UI only. Has `useState<number | null>(null)` for activeIndex — only one item open at a time.

---

### ServicesPreview

**File:** `frontend/src/features/home/components/ServicesPreview/`
**Purpose:** Lightweight 3-card preview of services for the home page
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/` (HomePage)
**Status:** Complete — UI only

---

### ProjectsSection

**File:** `frontend/src/features/home/components/ProjectsSection/`
**Purpose:** Editorial-style project showcase. Layout: large portrait card + 2 stacked cards (PROJECTS[0..2]) + 1 wide landscape strip (PROJECTS[3]). Images use CSS overflow/transition for zoom-on-hover.
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/projects` (ProjectsPage)
**Status:** Complete — UI only. IMPORTANT: Layout is hardcoded for exactly 4 projects (uses array indexes directly). Will break with fewer than 4 projects. Needs refactoring for dynamic counts before API connection.

---

### ProjectsPreview

**File:** `frontend/src/features/home/components/ProjectsPreview/`
**Purpose:** Photo-grid preview of all 4 projects for the home page
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/` (HomePage)
**Status:** Complete — UI only

---

### ProcessSection

**File:** `frontend/src/features/home/components/ProcessSection/`
**Purpose:** "How We Deliver" — 5-step process grid with connector line, plus blueprint image at bottom with overlay quote. Step 1 box has orange background; others have var(--site-surface). Uses a horizontal absolute connector line that runs through the top of all step boxes.
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** NOT currently used on any page. Was removed from the home page redesign. Needs a dedicated /process route or inclusion on the /about or /services page.
**Status:** Component is complete (UI) but has no page home. Orphaned.

---

### TestimonialsSection

**File:** `frontend/src/features/home/components/TestimonialsSection/`
**Purpose:** Full carousel testimonials section with prev/next chevrons, dot indicators, and "X / Y" counter. Uses `useState(0)` for active index with modulo wrapping.
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/testimonials` (TestimonialsPage)
**Status:** Complete — UI only. Only 3 testimonials in data.

---

### TestimonialPreview

**File:** `frontend/src/features/home/components/TestimonialPreview/`
**Purpose:** Single-quote teaser for the home page
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/` (HomePage)
**Status:** Complete — UI only

---

### TeamSection

**File:** `frontend/src/features/home/components/TeamSection/`
**Purpose:** 4-column team member grid. Each card: grayscale photo that colorizes on hover, gradient overlay, name/role label (fades out on hover), orange overlay panel with experience, name, role, and "View Profile" arrow (fades in on hover). All hover behavior is pure CSS.
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/about` (AboutPage)
**Status:** Complete — UI only. "View Profile" links are not wired to any route (individual team member pages don't exist).

---

### CtaSection

**File:** `frontend/src/features/home/components/CtaSection/`
**Purpose:** Full contact section with background image + dark overlay + grid bg + two-column layout (headline/contact details + project enquiry form). Form has Name, Company, Email, Service dropdown (from SERVICES data), and Message. Has success state toggle.
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/contact` (ContactPage)
**Status:** UI complete. Form submission is fake (`e.preventDefault()` + `setSubmitted(true)`) — no API call, no validation, no React Hook Form. Needs full wiring in Phase 2.

---

### CtaBanner

**File:** `frontend/src/features/home/components/CtaBanner/`
**Purpose:** Lightweight CTA strip without a form, for the home page
**Props:** None
**Children:** SiteContainer, SectionLabel
**Used on:** `/` (HomePage)
**Status:** Complete

---

## About Feature Components

Located in: `frontend/src/features/about/components/`

---

### MissionValuesSection

**File:** `frontend/src/features/about/components/MissionValuesSection/`
**Purpose:** Mission statement strip + 4 core values grid. Mission strip has a left orange 4px bar (`position: absolute`). Values grid is 1-col mobile / 2-col tablet / 4-col desktop using CSS Grid with `border` on all sides (left + top on grid container, right + bottom on each card).
**Props:** None (values are hardcoded in the component as a const array — not from a data file)
**Children:** SiteContainer, SectionLabel
**Used on:** `/about` (AboutPage)
**Status:** Complete — UI only

---

## FAQ Feature Components

Located in: `frontend/src/features/faq/components/`

---

### FaqSection

**File:** `frontend/src/features/faq/components/FaqSection/`
**Purpose:** Accordion FAQ list. 6 questions with smooth expand/collapse using CSS grid trick (`grid-template-rows: 0fr → 1fr`). First question open by default (`useState<number | null>(0)`). Only one question can be open at a time. Toggle icon is "+" / "−".
**Props:** None (reads from FAQ data file)
**Children:** SiteContainer, SectionLabel
**Used on:** `/faq` (FaqPage)
**Status:** Complete — UI only

---

# 5. Shared Components

## Typography

Located in: `frontend/src/components/typography/`

**Heading** (`Heading/Heading.tsx`) — Purpose and props not read in detail. Likely a wrapper for h1–h6 using theme tokens. Used in admin panel. Not used in public site (public site uses direct HTML elements with CSS module classes + `--font-display`).

**Text** (`Text/Text.tsx`) — Body text wrapper. Admin panel only.

**Label** (`Label/Label.tsx`) — Small label text. Admin panel only.

**Caption** (`Caption/Caption.tsx`) — Caption/footnote text. Admin panel only.

Note: The public site does NOT use these typography components. All public typography is written directly in CSS modules using `var(--font-display)`, `var(--font-mono)`, `var(--font-body)` with inline-applied classes. The typography components are intended for the admin panel's Ant Design–based UI.

---

## UI Components

Located in: `frontend/src/components/ui/`

**Button** (`Button/Button.tsx`)
- Purpose: Wraps Ant Design Button with a custom variant/size API
- Props: `variant` (primary|default|dashed|text|link|danger), `size` (sm|md|lg), `loading`, `disabled`, `icon`, `block`, `onClick`, `htmlType`, `className`
- Note: This component is for the admin panel. The public site uses raw `<button>` and `<Link>` elements styled with CSS modules (never the shared Button component) to avoid Ant Design CSS-in-JS bleeding into the public site's aesthetic.
- Used on: Admin panel only

**Card** (`Card/Card.tsx`) — Ant Design Card wrapper. Admin panel only.

**EmptyState** (`EmptyState/EmptyState.tsx`) — Empty state display for admin tables/lists.

**Loader** (`Loader/Loader.tsx`) — Loading spinner. Admin panel only.

---

## Forms

Located in: `frontend/src/components/forms/`

All form components wrap Ant Design inputs and use the admin theme system.

**TextInput** (`TextInput/TextInput.tsx`) — Ant Design Input wrapper
**TextAreaInput** (`TextAreaInput/TextAreaInput.tsx`) — Ant Design Input.TextArea wrapper
**PasswordInput** (`PasswordInput/PasswordInput.tsx`) — Ant Design Input.Password wrapper
**SelectInput** (`SelectInput/SelectInput.tsx`) — Ant Design Select wrapper
**SwitchInput** (`SwitchInput/SwitchInput.tsx`) — Ant Design Switch wrapper

These are designed for use with React Hook Form + Zod validation in admin forms. They are NOT used in the public CtaSection contact form (which uses raw `<input>`, `<textarea>`, `<select>` elements styled with CSS modules).

---

## Sections (Shared Layout Wrappers)

Located in: `frontend/src/components/sections/`
Barrel export: `frontend/src/components/sections/index.ts`

**AppShell** (`AppShell/AppShell.tsx`)
- Purpose: Content width constraint for the admin panel
- Max-width: 1200px (vs SiteContainer's 1380px)
- Used on: Admin pages only

**SectionContainer** (`SectionContainer/SectionContainer.tsx`)
- Purpose: Generic section wrapper. Purpose not fully inspected — likely predates SiteContainer.
- Used on: Unclear; may be admin-only or legacy

**SectionHeader** (`SectionHeader/SectionHeader.tsx`)
- Purpose: Reusable admin panel section header with title and optional action buttons
- Used on: Admin pages only

**SiteContainer** (`SiteContainer/SiteContainer.tsx`)
- Purpose: The primary width constraint for all public website sections
- Props: `children: ReactNode`, `className?: string`
- CSS: `max-width: var(--site-max-width)` (1380px), `margin-inline: auto`, `padding-inline: var(--site-px)` (1.5rem mobile → 3.5rem desktop at 1024px)
- Used on: Every public section component, Header, Footer

**SectionLabel** (`SectionLabel/SectionLabel.tsx`)
- Purpose: The recurring "XX / Section Name" design motif. Shows a small DM Mono label in primary color followed by a 4rem horizontal line.
- Props: `children: ReactNode`, `className?: string`
- CSS: DM Mono, 10px, letter-spacing 0.3em, uppercase, `var(--site-primary)` color. The `.line` is `width: 4rem; height: 1px; background: var(--site-primary)`.
- Used on: Every public section (ServicesSection, ProjectsSection, TestimonialsSection, AboutPreviewSection, TeamSection, CtaSection, FaqSection, MissionValuesSection, all preview components, PageHero)

**PageHero** (`PageHero/PageHero.tsx`)
- Purpose: Inner page hero for all non-home public pages. Handles the fixed header offset, shows the SectionLabel, a decorative orange 3rem×2px accent line, a large display headline (with optional second line in orange), and an optional subtitle paragraph.
- Props: `label: string`, `headline: string`, `headlineSub?: string`, `subtitle?: string`
- CSS: `padding-top: calc(var(--site-header-h-mob) + 5rem)` mobile / `calc(var(--site-header-h) + 7rem)` desktop. Grid background overlay (same 80px crosshatch as HeroSection). `font-size: clamp(3.75rem, 9vw, 9rem)` for headline.
- Important: Uses direct imports for SiteContainer and SectionLabel (`'../SiteContainer/SiteContainer'`, `'../SectionLabel/SectionLabel'`) to avoid circular import with the barrel index.
- Used on: `/about`, `/services`, `/projects`, `/testimonials`, `/faq`, `/contact`

---

## Navigation

Located in: `frontend/src/components/navigation/`

**Header** (`Header/Header.tsx`)
- Purpose: The fixed, transparent-to-opaque site header. Contains logo, desktop nav, mobile menu trigger, and "Get a Quote" CTA button.
- Props: None (self-contained with internal state)
- State: `mobileOpen: boolean` (Drawer open/close), `scrolled: boolean` (transitions header style after 80px scroll)
- CSS: `position: fixed; top: 0; left: 0; right: 0; z-index: 100`. When `.scrolled`: `background: var(--site-overlay-96); backdrop-filter: blur(10px); border-bottom-color: var(--site-border)`.
- Logo: Two orange bars (6px wide tall + 6px wide short) + "BuildCo" text in Barlow Condensed 900. No external icon.
- Desktop CTA: Raw `<button>` with `onClick={() => navigate('/contact')}` — NOT the shared Button component.
- Important: SiteContainer receives `className={styles.headerShell}` which applies `flex: 1; width: 100%` to ensure the inner `justify-content: space-between` div fills the header correctly.
- Used on: All public pages (via PublicLayout)

**Footer** (`Footer/Footer.tsx`)
- Purpose: 4-column footer grid — Brand (logo + description + socials), Navigation (all 7 nav links), Services (4 service names linking to /services), Contact (address, phone, email). Bottom bar with copyright + legal links.
- Props: None
- Children: SiteContainer
- Social icons: Uses Lucide icons as placeholders (Globe, Camera, Briefcase, Share2) because actual brand icons (Facebook, Instagram, LinkedIn, X) are not available in Lucide v1.21.0. Replace with react-icons or download SVGs in production.
- Used on: All public pages (via PublicLayout)

**NavItem** (`NavItem/NavItem.tsx`)
- Purpose: Single navigation link using React Router's `<NavLink>`. Applies `.active` class when route matches. Supports `mobile` prop for different mobile drawer styling.
- Props: `href: string`, `label: string`, `mobile?: boolean`, `onClick?: () => void`
- CSS (desktop): DM Mono 11px, letter-spacing 0.28em, uppercase, muted color → full white on hover/active
- CSS (mobile): Barlow Condensed 900, 1.75rem, uppercase — primary orange on hover/active
- Used on: Header (desktop nav), MobileMenu (mobile nav)

**MobileMenu** (`MobileMenu/MobileMenu.tsx`)
- Purpose: Ant Design Drawer (right, 300px width) for mobile navigation. Contains logo, all nav links via NavItem with `mobile` prop, and a "Get a Quote" CTA button.
- Props: `open: boolean`, `onClose: () => void`
- Important: Ant Design Drawer background requires `classNames={{ content: styles.drawerContent }}` with `background: var(--site-surface) !important` because Ant Design v5 CSS-in-JS has higher specificity than plain CSS.
- Used on: Header (via mobileOpen state), renders outside main flow via React createPortal (Ant Design handles this internally)

**navLinks.ts** (`navigation/navLinks.ts`)
- Purpose: Single source of truth for all public navigation links
- Content: `[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Projects', href: '/projects' }, { label: 'Testimonials', href: '/testimonials' }, { label: 'FAQ', href: '/faq' }, { label: 'Contact', href: '/contact' }]`
- Used by: Header and MobileMenu

---

# 6. Data Files

All data files are local TypeScript modules with typed interfaces and const arrays. They serve as the data layer until the Laravel API is built. When API integration occurs, import these types into feature hooks that call TanStack Query.

---

## `features/home/data/stats.ts`

```typescript
interface Stat { value: string; label: string }
STATS: Stat[] = [
  { value: '340+', label: 'Projects Delivered' },
  { value: '28',   label: 'Years of Excellence' },
  { value: '$4.2B', label: 'Assets Constructed' },
  { value: '94%',  label: 'On-Time Completion' },
]
```

**Used by:** HeroSection (stats bar, 2-col mobile / 4-col desktop grid)
**Future:** These become editable fields in the Home Page management section of the admin panel.

---

## `features/home/data/services.ts`

```typescript
interface Service { num: string; title: string; subtitle: string; description: string; tags: string[] }
SERVICES: Service[] = [ 5 items ]
```

Items: Building Construction, Land Development, Architecture, Project Management, Engineering Consultation.

**Used by:**
- ServicesSection (full accordion — all 5)
- ServicesPreview (first 3 only via `.slice(0, 3)`)
- CtaSection (service dropdown `<select>` options)

**Future:** This becomes a `services` database table. The `num` field should become `order_index` (integer). Add `slug` field for URL routing. Add `status` (1=active, 0=inactive, 9=deleted per project rules). Add optional `icon` and `image` fields.

---

## `features/home/data/projects.ts`

```typescript
interface Project { id: string; title: string; location: string; year: string; type: string; area: string; image: string }
PROJECTS: Project[] = [ 4 items ]
```

Items: Meridian Tower (Dubai, 2024), Harlow Quarter (London, 2023), Vantage Residences (Sydney, 2023), Sorell Industrial Park (Amsterdam, 2022).

Images: Imported as ES modules from `@/assets/images/project-0{1..4}.jpg`.

**Used by:**
- HeroSection (PROJECTS[0] for floating badge — title and location)
- ProjectsSection (all 4, with hardcoded index access: [0], [1..3].slice, [3])
- ProjectsPreview (all 4 in photo grid)

**Future:** `projects` table. Add `featured: boolean` field. Add `slug` for /projects/[slug] detail pages. Add `gallery: string[]` for multiple images. The `id` field is currently a string like "001" — should become auto-increment integer in DB. The `image` field becomes a file path stored on server. Note: ProjectsSection.tsx hardcodes array index access ([0], [3]) — refactor when switching to dynamic data.

---

## `features/home/data/testimonials.ts`

```typescript
interface Testimonial { quote: string; name: string; role: string; initials: string }
TESTIMONIALS: Testimonial[] = [ 3 items ]
```

Items: Marcus Holt (CEO, Vektor Capital), Dr. Sarah Brennan (Director, Northfield University), James Okubo (Managing Partner, Ashfield Property Group).

**Used by:**
- TestimonialsSection (all 3, carousel)
- TestimonialPreview (TESTIMONIALS[0] only)

**Future:** `testimonials` table. Add `featured: boolean` to flag which one shows in TestimonialPreview. Add `status` field. The `initials` field is currently manually set — can be computed from name in the frontend.

---

## `features/home/data/process.ts`

```typescript
interface ProcessStep { num: string; phase: string; time: string; description: string }
PROCESS_STEPS: ProcessStep[] = [ 5 items ]
```

Items: Discovery (Weeks 1–3), Design (Weeks 4–16), Pre-Construction (Weeks 17–24), Construction (Phase-Dependent), Delivery (Final Phase).

**Used by:** ProcessSection only. ProcessSection is currently orphaned — it was removed from the home page and has no dedicated route.

**Future:** Either add a /process route or incorporate into the /about or /services page. Could also be a section on the Services page.

---

## `features/home/data/team.ts`

```typescript
interface TeamMember { name: string; role: string; experience: string; image: string }
TEAM: TeamMember[] = [ 4 items ]
```

Items: Adrian Cole (Founder & CEO, 32 yrs), Miriam Osei (Chief Architect, 19 yrs), Tomas Brandt (Head of Engineering, 24 yrs), Lena Park (Project Director, 17 yrs).

Images: Imported from `@/assets/images/team/team-0{1..4}.jpg`.

**Used by:** TeamSection only (on /about page)

**Future:** `team_members` table. Add `slug`, `bio` (text), `social_links` (JSON), `order_index`, `status`. "View Profile" buttons in TeamSection currently go nowhere.

---

## `features/home/data/clients.ts`

```typescript
CLIENTS: string[] = [ 10 client name strings ]
```

**Used by:** MarqueeSection (doubled for seamless loop)

**Future:** Could become a `clients` table with optional logo image. Currently just strings.

---

## `features/faq/data/faq.ts`

```typescript
interface FaqItem { question: string; answer: string }
FAQ: FaqItem[] = [ 6 items ]
```

Questions cover: project types, integrated delivery model, timelines, office locations, cost management, design-and-build contracts.

**Used by:** FaqSection only (on /faq page)

**Future:** `faqs` table. Add `category` for FAQ grouping (DOCS calls for categories). Add `order_index`, `status`.

---

# 7. Theme System

The project has TWO completely separate theme systems that must never be mixed.

---

## System 1: Public Website Theme (`--site-*` variables)

**File:** `frontend/src/styles/site-theme.css`
**Import:** `@import './styles/site-theme.css'` at top of `src/index.css`

This is a fixed dark theme. It never changes based on user preference or admin settings. All CSS values are hardcoded.

```css
:root {
  /* Backgrounds */
  --site-bg:        #0A0A08;    /* Near-black warm background */
  --site-surface:   #131310;    /* Slightly lighter surface (cards, sections) */
  --site-surface-2: #1C1C19;    /* Even lighter surface */

  /* Text */
  --site-text:       #F0EBE3;   /* Warm off-white */
  --site-text-muted: #7A756E;   /* Muted warm grey */

  /* Brand */
  --site-primary: #E8620A;      /* Burnt orange — primary accent */
  --site-accent:  #C4912A;      /* Gold accent (less used) */

  /* Borders */
  --site-border: rgba(240, 235, 227, 0.08);   /* Very subtle warm border */

  /* Shape */
  --site-radius: 0px;           /* Sharp edges everywhere */

  /* Overlays (background color at varying opacity) */
  --site-overlay-96 through --site-overlay-20

  /* Special */
  --site-stroke: rgba(240, 235, 227, 0.28);   /* For -webkit-text-stroke hollow text */
  --site-grid-line: rgba(240, 235, 227, 0.025); /* Subtle crosshatch grid bg */

  /* Typography */
  --font-display: 'Barlow Condensed', sans-serif;
  --font-mono:    'DM Mono', monospace;
  --font-body:    'Inter', sans-serif;

  /* Layout */
  --site-max-width:    1380px;
  --site-px:           1.5rem;  /* Mobile horizontal padding */
  --site-px-lg:        3.5rem;  /* Desktop horizontal padding (1024px+) */
  --site-header-h:     72px;    /* Desktop fixed header height */
  --site-header-h-mob: 64px;    /* Mobile fixed header height */
}
```

**Rule:** Every public section CSS module must use ONLY `var(--site-*)` tokens. No hex values. No `var(--color-*)` tokens.

---

## System 2: Admin Panel Theme (Ant Design ThemeProvider)

The admin panel uses Ant Design's built-in theme customization system. A `ThemeProvider` component (in `src/app/` or `src/themes/`) wraps the admin section and injects a theme object into Ant Design's `ConfigProvider`. A `CssVarSyncer` utility reads the Ant Design token values and writes them as `--color-*` CSS custom properties on `:root`, making them available to admin CSS modules.

**Admin CSS variables follow this pattern:** `--color-primary`, `--color-bg`, `--color-surface`, `--color-text`, `--color-border`, etc.

**Supported admin modes:** Light, Dark, Custom (user-configurable via /admin/theme page — currently not implemented).

**Rule:** Admin components must use ONLY `var(--color-*)` tokens. Never use `var(--site-*)` in admin components.

---

# 8. Design System

## Typography

Three self-hosted fonts, all downloaded as `.woff2` files, declared with `@font-face` in `src/styles/fonts.css`.

**Barlow Condensed** (`--font-display`)
- Weights: 400, 700, 900
- Files: `assets/fonts/barlow-condensed/barlow-condensed-{400,700,900}.woff2`
- Usage: All display headings (H1, H2, H3), logo text, section names, large UI text
- Characteristic: Very condensed, uppercase, tight letter-spacing (often `-0.02em`), massive font sizes (`clamp(72px, 14vw, 158px)` for hero H1)

**DM Mono** (`--font-mono`)
- Weights: 400, 500
- Files: `assets/fonts/dm-mono/dm-mono-{400,500}.woff2`
- Usage: Labels, metadata, tags, navigation items, button text, section labels, timestamps
- Characteristic: Monospace, usually 10–13px, heavy letter-spacing (0.2–0.32em), uppercase

**Inter** (`--font-body`)
- Weights: 300, 400, 500
- Files: `assets/fonts/inter/inter-{300,400,500}.woff2`
- Usage: Body paragraphs, descriptions, subtitle text, form fields
- Characteristic: Usually 14–17px, line-height 1.7–1.75, weight 300 for most copy

---

## Colors

All values from `src/styles/site-theme.css`. See Section 7 for full list.

Key values:
- Background: `#0A0A08` (very dark warm near-black)
- Primary orange: `#E8620A` (burnt sienna)
- Text: `#F0EBE3` (warm off-white)
- All borders: `rgba(240, 235, 227, 0.08)` (extremely subtle)
- 0px border radius everywhere

---

## Grid System

No CSS Grid framework. All layouts use hand-written CSS Grid and Flexbox in component CSS modules.

**Single breakpoint:** `1024px` — this is the only breakpoint used throughout the entire public site. Below 1024px is "mobile". Above is "desktop".

**Content width:** `var(--site-max-width)` = 1380px via SiteContainer

**Section background grid:** Used in HeroSection, PageHero, CtaBanner, CtaSection:
```css
background-image:
  linear-gradient(var(--site-grid-line) 1px, transparent 1px),
  linear-gradient(90deg, var(--site-grid-line) 1px, transparent 1px);
background-size: 80px 80px;
```

---

## Spacing System

`src/index.css` defines global spacing tokens:
```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-6: 24px;  --space-8: 32px;  --space-12: 48px; --space-16: 64px;
```

However, public section CSS modules use direct rem values, not these tokens. Section vertical padding is typically `6rem` mobile / `9rem–11rem` desktop. These are written literally in each component's CSS, not via the spacing tokens.

---

## Animations

All animations are pure CSS — no Framer Motion on the public site (despite it being in package.json, it's not used yet).

| Animation | Component | CSS |
|-----------|-----------|-----|
| Scroll cue bounce | HeroSection | `@keyframes heroBounce` (translateY 0 → 5px) |
| Marquee scroll | MarqueeSection | `@keyframes marqueeScroll` (translateX 0 → -50%) |
| Project card image zoom | ProjectsSection, ProjectsPreview | `transform: scale(1.04–1.055); transition: 0.6s ease` |
| Service/FAQ accordion | ServicesSection, FaqSection | `grid-template-rows: 0fr → 1fr; transition: 0.35s ease` |
| Team card hover | TeamSection | CSS opacity transitions on `.info` and `.overlay` |
| Testimonial dots | TestimonialsSection | `width: 4px → 2rem` animated width on active dot |
| Header transparency | Header | `background`, `backdrop-filter`, `border-color` transition 0.3s ease |

---

## Images

All images are self-hosted. Never hotlink.

**Current assets:**
```
assets/images/
  hero-bg.jpg         ← HeroSection right panel
  about-team.jpg      ← AboutPreviewSection inset image
  project-01.jpg      ← Meridian Tower
  project-02.jpg      ← Harlow Quarter
  project-03.jpg      ← Vantage Residences
  project-04.jpg      ← Sorell Industrial Park
  process-blueprint.jpg ← ProcessSection blueprint strip
  cta-bg.jpg          ← CtaSection background image
  team/
    team-01.jpg       ← Adrian Cole
    team-02.jpg       ← Miriam Osei
    team-03.jpg       ← Tomas Brandt
    team-04.jpg       ← Lena Park
```

Images are imported as ES module references (`import heroImg from '@/assets/images/hero-bg.jpg'`) which Vite resolves to hashed production URLs. Never use string paths directly in `<img src="...">`.

---

# 9. Current Project Status

## Frontend UI

| Area | Status | Notes |
|------|--------|-------|
| Design system & tokens | 100% | fonts.css, site-theme.css, index.css fully configured |
| Shared components (navigation) | 95% | Header, Footer, NavItem, MobileMenu complete; Footer social icons are placeholders |
| Shared components (sections) | 100% | SiteContainer, SectionLabel, PageHero all working |
| Shared components (UI/forms) | 80% | All components built; none used on public site yet; admin usage untested |
| Home page | 90% | All 6 sections complete; no scroll animations; no API |
| About page | 80% | Missing standalone stats section; no API |
| Services page | 85% | Full accordion working; label duplication minor issue |
| Projects page | 75% | Layout works for exactly 4 projects; no filtering; no detail pages |
| Testimonials page | 85% | Carousel works; only 3 items |
| FAQ page | 85% | Accordion works; 6 static questions; no categories |
| Contact page | 70% | Form renders; no validation; no API submission |
| Admin panel | 2% | Layout shell scaffolded (empty Sider + Header); 3 page stubs |
| ProcessSection | 100% UI | Component complete but has no page/route |

**Overall frontend UI: ~78%**

## Backend

| Area | Status | Notes |
|------|--------|-------|
| Laravel scaffolding | 100% | Laravel 12 project exists, vendor installed |
| Route structure | 10% | api.php has commented stubs for v1/public/* and v1/admin/* |
| BaseApiController | 100% | success(), created(), error(), paginated() helpers ready |
| Database migrations | 0% | No migrations created |
| Models | 5% | Only User.php exists (Laravel default) |
| Controllers | 0% | No feature controllers |
| Services layer | 0% | No business logic |
| Authentication (Sanctum) | 0% | Not configured |
| File uploads | 0% | Not configured |

**Overall backend: ~5%**

## Admin Panel

| Area | Status |
|------|--------|
| Layout (Ant Design Sider + Header) | 10% (empty shell) |
| Authentication | 0% |
| Dashboard | 0% |
| Site Settings | 0% |
| Theme Settings | 0% |
| Services management | 0% |
| Projects management | 0% |
| Testimonials management | 0% |
| Team management | 0% |
| FAQ management | 0% |
| Contact messages | 0% |

**Overall admin panel: ~2%**

## Overall Project

| Layer | Completion |
|-------|------------|
| Frontend UI (public pages) | ~78% |
| Backend API | ~5% |
| Admin Panel | ~2% |
| CMS (full content management) | 0% |
| Authentication | 0% |
| API integration (frontend ↔ backend) | 0% |
| **Overall** | **~25%** |

---

# 10. Missing Features

## Frontend — Functional Gaps

1. **Contact form validation** — CtaSection form has no validation (no React Hook Form, no Zod schema). Any input submits successfully. Needs full validation before API connection.
2. **Contact form API submission** — Form calls `e.preventDefault()` and shows a fake success state. Needs real POST to Laravel API.
3. **Scroll-triggered animations** — No section entrance animations. DOCS specifies fade-in and slide-up on scroll. No IntersectionObserver logic exists anywhere.
4. **Individual project detail pages** — `/projects/[slug]` does not exist. "View Project" / card links all go to `/projects`. ProjectsSection arrow buttons do nothing.
5. **Individual team member profile pages** — "View Profile" overlays in TeamSection link to nothing.
6. **Project filtering** — ProjectsPage has no category filter. DOCS/PAGE_ARCHITECTURE.md calls for filters and pagination.
7. **FAQ categories** — FaqSection has no category grouping. DOCS specifies categories.
8. **404 page** — No `*` route exists. React Router will render nothing for unmatched paths.
9. **SEO meta tags** — No `<title>` or `<meta name="description">` per page. React 19 supports `<title>` inside components natively; add per-page.
10. **ProcessSection page** — The component exists and is complete but has no route or page that renders it. Needs a home (e.g., include on /about or /services, or add /process route).
11. **StatsSection standalone** — The stats (340+ projects, 28 years, etc.) are embedded in HeroSection's stats bar. DOCS/PAGE_ARCHITECTURE.md calls for a separate statistics section on the /about page. No standalone StatsSection component exists.

## Backend — Entire Layer Missing

12. **All Laravel migrations** — No tables exist. Need: services, projects, project_images, testimonials, team_members, faqs, faq_categories, site_settings, theme_settings, contact_submissions, users.
13. **All Eloquent models** — Only User.php exists.
14. **All API controllers** — No public or admin controllers for any content type.
15. **Authentication** — Laravel Sanctum is in composer.json but not configured. No login endpoint, no token management, no protected route middleware.
16. **Admin-protected routes** — No middleware applied to `/api/v1/admin/*` routes.
17. **File upload handling** — No storage configuration for project images, team photos, or logo uploads.
18. **Form requests (validation)** — No FormRequest classes for API input validation.
19. **Service layer** — No `app/Services/` classes for business logic.

## Admin Panel — Entire Interface Missing

20. **Admin navigation sidebar** — Currently an empty `<Sider>` div.
21. **Admin header** — Currently an empty `<Header>` div.
22. **Login page** — No `/admin/login` route. No authentication flow. No auth store (Zustand).
23. **Protected route wrapper** — No component that checks auth state and redirects to login.
24. **Dashboard widgets** — No stats widgets for total services/projects/testimonials/messages.
25. **Site settings form** — No form for company name, address, phone, email, social links.
26. **Theme settings panel** — No live theme switcher or color picker.
27. **Services CRUD** — No list, create, edit, delete screens.
28. **Projects CRUD** — No list, create, edit, delete screens. No image upload UI.
29. **Testimonials CRUD** — No management screens.
30. **Team members CRUD** — No management screens. No photo upload.
31. **FAQ management** — No CRUD. No category management.
32. **Contact messages inbox** — No read/unread list. No delete.

## Frontend API Integration — Entire Layer Missing

33. **API client setup** — Axios instance exists (per package.json) but no configured client with base URL, auth headers, interceptors.
34. **TanStack Query hooks per feature** — No `useServices()`, `useProjects()`, `useTestimonials()`, etc. hooks exist.
35. **Data file → API migration** — All 8 local data files need to be replaced by TanStack Query calls once the API exists.
36. **Loading states** — No skeleton loaders or loading indicators for async data in any public component.
37. **Error states** — No error boundaries or empty states for failed API requests.

## Cosmetic / Polish

38. **Footer social icons** — Uses placeholder Lucide icons instead of actual brand SVGs (Facebook, Instagram, LinkedIn, X/Twitter).
39. **Footer legal links** — Privacy Policy and Terms of Service links go to `#`.
40. **Footer service list** — Hardcoded strings ("General Construction", "Renovation & Remodeling", etc.) that don't match the actual services in `services.ts`.
41. **CTA section on contact page** — Shows "06 / Contact" SectionLabel immediately below PageHero which already says "06 / Contact" — minor label duplication.
42. **AboutPreviewSection label** — Shows "00 / About" inside the section, which reads oddly after the PageHero already labels the page as "01 / About".

---

# 11. Recommended Next Development Steps

## Step 1: Backend — Database Migrations

Create all Laravel migrations in order. Do not skip this step — frontend API connection depends on it.

**Migration order (respect foreign keys):**

1. `create_users_table` — Already exists (Laravel default). May need to extend with `is_admin: boolean`.

2. `create_site_settings_table` — Single-row global config:
   - `company_name`, `tagline`, `email`, `phone`, `address`, `logo` (file path)
   - `social_facebook`, `social_instagram`, `social_linkedin`, `social_twitter`
   - `status tinyint default 1`

3. `create_theme_settings_table` — Single-row:
   - `mode` (enum: light, dark, custom)
   - `primary_color`, `secondary_color`, `background_color`, `surface_color`, `text_color`
   - `border_radius` (int, px value)
   - `font_family`

4. `create_services_table`:
   - `id`, `title`, `subtitle`, `description`, `tags` (JSON), `order_index`, `status tinyint`

5. `create_projects_table`:
   - `id`, `slug` (unique), `title`, `location`, `year`, `type`, `area`
   - `featured tinyint default 0`
   - `order_index`, `status tinyint`

6. `create_project_images_table`:
   - `id`, `project_id` (FK → projects.id), `path`, `is_primary tinyint`, `order_index`

7. `create_testimonials_table`:
   - `id`, `quote`, `client_name`, `client_role`, `client_company`
   - `initials` (auto-computable but store for performance)
   - `featured tinyint default 0`, `order_index`, `status tinyint`

8. `create_team_members_table`:
   - `id`, `name`, `role`, `bio` (text), `experience` (e.g. "24 yrs")
   - `photo` (file path), `order_index`, `status tinyint`
   - `social_linkedin`, `social_email`

9. `create_faq_categories_table`:
   - `id`, `name`, `order_index`, `status tinyint`

10. `create_faqs_table`:
    - `id`, `category_id` (FK → faq_categories.id, nullable), `question`, `answer`
    - `order_index`, `status tinyint`

11. `create_contact_submissions_table`:
    - `id`, `name`, `company` (nullable), `email`, `service` (nullable), `message`
    - `is_read tinyint default 0`, `status tinyint default 1`
    - `created_at`, `updated_at`

**Status values rule (from DOCS/DESIGN_SYSTEM.md):**
- 1 = Active, 0 = Inactive, 9 = Deleted
- All queries must have `->where('status', '!=', 9)` or a scope `scopeActive`
- Never permanently delete records — set status to 9

---

## Step 2: Backend — Models

Create one Eloquent model per table. Add these to each model:

```php
protected $guarded = [];
protected $casts = ['tags' => 'array', 'featured' => 'boolean'];

public function scopeActive($q) { return $q->where('status', 1); }
public function scopeOrdered($q) { return $q->orderBy('order_index'); }
```

The `Project` model has a `hasMany(ProjectImage::class)` relationship. Always eager load with `->with('images')` to avoid N+1.

---

## Step 3: Backend — Public API Controllers

Create in `app/Http/Controllers/Api/Public/`. All extend `BaseApiController`. All routes are unauthenticated (no Sanctum middleware).

**Routes to add to `routes/api.php` inside the `public` prefix group:**

```php
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);
Route::get('/faq', [FaqController::class, 'index']);
Route::get('/site-settings', [SiteSettingsController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store']);
```

Each `index` method should:
1. Query only `status = 1` records via `scopeActive()`
2. Order by `order_index` via `scopeOrdered()`
3. Return `$this->success($records)`

The `contact` store method:
1. Validate: name (required), email (required, email), message (required, min:10)
2. Create `ContactSubmission` record
3. Return `$this->created(null, 'Your enquiry has been received.')`
4. Optionally: queue a notification email (Phase 3)

---

## Step 4: Backend — Authentication

1. Install/configure Laravel Sanctum (`php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`)
2. Create `POST /api/v1/auth/login` endpoint — validates credentials, returns Sanctum token
3. Create `POST /api/v1/auth/logout` endpoint — revokes current token
4. Create `GET /api/v1/auth/me` endpoint — returns current user
5. Apply `auth:sanctum` middleware to all admin routes
6. Ensure `User` model has `HasApiTokens` trait

---

## Step 5: Frontend — API Client + Hooks

Create `frontend/src/services/apiClient.ts`:
```typescript
import axios from 'axios'
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1',
  headers: { 'Accept': 'application/json' },
})
// Add request interceptor to inject auth token from authStore
```

Then create feature hooks:
- `frontend/src/features/home/hooks/useServices.ts` — TanStack Query `useQuery`
- `frontend/src/features/home/hooks/useProjects.ts`
- `frontend/src/features/home/hooks/useTestimonials.ts`
- `frontend/src/features/home/hooks/useTeam.ts`
- `frontend/src/features/faq/hooks/useFaq.ts`

Each hook replaces the imported constant from the data file. Update components one at a time, replacing `import { SERVICES } from '../../data/services'` with `const { data: services, isLoading } = useServices()` and handling loading/error states.

---

## Step 6: Frontend — Admin Authentication

1. Create `frontend/src/stores/authStore.ts` (Zustand):
   - State: `user | null`, `token: string | null`, `isAuthenticated: boolean`
   - Actions: `login(credentials)`, `logout()`, `setUser(user)`
   - Persist token to localStorage

2. Create `frontend/src/pages/admin/LoginPage.tsx`:
   - Simple form: email + password + submit
   - Use React Hook Form + Zod validation
   - On success: save token to authStore, navigate to /admin

3. Create `frontend/src/components/navigation/ProtectedRoute/ProtectedRoute.tsx`:
   - Reads `isAuthenticated` from authStore
   - Redirects to `/admin/login` if false

4. Update `frontend/src/routes/index.tsx`:
   - Wrap all `/admin/*` children with `<ProtectedRoute>`
   - Add `{ path: '/admin/login', element: <LoginPage /> }` outside the ProtectedRoute

---

## Step 7: Admin Panel — Layout and Navigation

Before building any admin feature pages, build the navigation shell:

1. `AdminLayout.tsx` — Wire up Ant Design Sider with menu items for each section (Dashboard, Services, Projects, Testimonials, Team, FAQ, Contact, Settings, Theme)
2. Admin Header — Show current user name + logout button
3. Add breadcrumbs below header (Ant Design Breadcrumb)

---

## Step 8: Admin Panel — Content Management Pages

Build in this priority order (most critical to least):

1. **Services CRUD** — List table + create/edit form (title, subtitle, description, tags, order)
2. **Projects CRUD** — List table + create/edit form + image upload (multiple, primary selection, drag-to-reorder)
3. **Testimonials CRUD** — List table + create/edit form + featured toggle
4. **Team CRUD** — List table + create/edit form + photo upload
5. **FAQ CRUD** — List table + category management + create/edit form + ordering
6. **Contact Messages** — Read-only inbox, mark as read, soft-delete (status → 9)
7. **Site Settings** — Single-record form (company info, contact details, social links)
8. **Theme Settings** — Mode switcher + color pickers + live preview + save

All admin CRUD pages must use the shared form components (`TextInput`, `TextAreaInput`, `SelectInput`, etc.) and Ant Design Table components. No page-specific form implementations.

---

## Step 9: Contact Form — Full Implementation

Once backend exists:
1. Add React Hook Form to CtaSection
2. Add Zod schema: name (required), email (required, valid email), message (required, min 10 chars)
3. Use `useMutation` (TanStack Query) to POST to `/api/v1/public/contact`
4. Show real loading state on submit button
5. Show success/error state based on API response
6. Consider adding honeypot field for bot protection

---

## Step 10: Polish and Missing Pages

Once core content management works:

1. **ProcessSection** — Give it a page. Best option: add as a section on `/services` page (after `ServicesSection`). Minimal change: import `ProcessSection` in `ServicesPage.tsx` and add below `ServicesSection`.

2. **StatsSection standalone** — Create `components/sections/StatsSection/` that renders the 4 stats from API (not the data file). Use on `/about` page after `MissionValuesSection`.

3. **404 page** — Create `src/pages/NotFoundPage.tsx` with PageHero + "PAGE NOT FOUND" + link home. Add `{ path: '*', element: <NotFoundPage /> }` to router.

4. **SEO** — Add `<title>` and `<meta name="description">` to each page component. React 19 supports this natively in `<head>` via render.

5. **Footer social icons** — Replace Lucide placeholder icons with actual brand SVGs. Options: download SVGs to `assets/icons/`, import as React components. Do NOT install react-icons without approval.

6. **Project detail pages** — Add `/projects/:slug` route. Create `ProjectDetailPage.tsx`. Requires `projects/{slug}` API endpoint.

7. **Scroll animations** — Add IntersectionObserver-based scroll detection. When sections enter viewport, add a `.visible` class that triggers CSS transitions (`opacity: 0 → 1`, `transform: translateY(20px) → 0`). Do this without Framer Motion (pure CSS + small hook) unless motion complexity requires it.

---

## Critical Constraints to Preserve

These decisions were made deliberately and must not be reversed without explicit approval:

1. **Public site is permanently dark.** Do not add a theme toggle to the public Header. The MobileMenu and Header previously had theme toggles — they were intentionally removed.

2. **0px border radius everywhere on the public site.** The `--site-radius: 0px` is intentional. No rounded corners on cards, buttons, inputs, or any public component.

3. **No Tailwind.** Explicitly prohibited by DOCS/TECH_STACK.md.

4. **No hardcoded hex values in component CSS.** All colors must use `var(--site-*)` tokens.

5. **Local data files are temporary.** `features/*/data/*.ts` files are placeholders to be replaced by API calls. Their TypeScript interfaces define the shape of the API response — preserve these shapes when designing API responses.

6. **Never permanently delete records.** All delete operations must set `status = 9`. Queries must exclude `status = 9` by default.

7. **Never install packages without explaining why, listing alternatives, and asking for approval.** This is a hard rule from CLAUDE.md and DOCS/FEATURE_TRACKER.md.

8. **Never use external image URLs.** All images must be self-hosted in `assets/images/`. Any new image needed must be downloaded locally first.

9. **CSS Modules only.** No styled-components, no CSS-in-JS libraries (other than Ant Design's internal system for the admin panel), no inline `style={{}}` props in public components.
