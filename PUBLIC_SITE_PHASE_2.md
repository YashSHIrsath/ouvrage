# PUBLIC_SITE_PHASE_2.md

Phase 2 audit of the public website. Every issue found across all 7 public pages, shared components, and the global shell. Written for direct implementation — no CMS, no admin, no APIs.

---

# PAGE AUDITS

---

## HOME PAGE (`/`)

**File:** `frontend/src/pages/HomePage.tsx`
**Sections:** HeroSection → MarqueeSection → ServicesPreview → ProjectsPreview → TestimonialPreview → CtaBanner

---

### Issue H-01: ProjectsPreview Desktop Grid Is Broken

**Priority:** Critical
**Effort:** 15 min

`ProjectsPreview` renders all 4 projects via `PROJECTS.map()`. The desktop CSS sets `grid-template-columns: repeat(3, 1fr)`. Four items in a 3-column grid produce 3 cards on row 1 and 1 orphaned card on row 2. The lone card on row 2 stretches to full column width and looks completely broken.

**File:** `frontend/src/features/home/components/ProjectsPreview/ProjectsPreview.module.css`

**Fix:** Change desktop grid to 4 columns:
```css
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```
Or change the component to only map 3 projects (`PROJECTS.slice(0, 3)`) and keep the 3-column grid. The 4-column layout with `aspect-ratio: 3/4` will be visually stronger.

---

### Issue H-02: Mobile ProjectsPreview Silently Hides Projects with No Indication

**Priority:** Medium
**Effort:** 30 min

Cards 3 and 4 are hidden on mobile via `.card:nth-child(n+3) { display: none }`. The user sees 2 projects with no indication that more exist. The "All Projects" link is in the header and may be missed.

**File:** `frontend/src/features/home/components/ProjectsPreview/ProjectsPreview.module.css`

**Fix:** Add a visible "View all 4 projects" count below the grid on mobile, or always show the link as a sticky bottom element on mobile. Alternatively show 2 cards in a 1-column stack on mobile with the link below.

---

### Issue H-03: No Scroll-Triggered Section Entrance Animations

**Priority:** Medium
**Effort:** 3–4 hours (all pages)

Every section is fully rendered and visible immediately. There are no entrance animations. For a premium construction site positioning itself as architectural and refined, this is a significant presentation gap. The DOCS animation rules specify: fade in, slide up, counter animations.

**Files:** All section components, new shared hook

**Fix:** Create `frontend/src/hooks/useInView.ts`:
```typescript
import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}
```
Apply to every section's root `<section>` element. Add CSS:
```css
.section { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.sectionVisible { opacity: 1; transform: none; }
```
Respect `prefers-reduced-motion` — see Issue G-09.

---

### Issue H-04: Testimonial Carousel Has No Transition Between Quotes

**Priority:** Medium
**Effort:** 45 min

When the user clicks prev/next in `TestimonialsSection`, the quote content changes instantly. No fade, no slide. The transition between testimonials is jarring for a premium brand.

**File:** `frontend/src/features/home/components/TestimonialsSection/TestimonialsSection.tsx`, `TestimonialsSection.module.css`

**Fix:** Add a CSS opacity transition. In the component, add a transition key or a brief opacity toggle state:
```tsx
const [fading, setFading] = useState(false)
const navigate = (newIndex: number) => {
  setFading(true)
  setTimeout(() => { setActive(newIndex); setFading(false) }, 200)
}
```
```css
.blockquote { transition: opacity 0.2s ease; }
.fading { opacity: 0; }
```

---

### Issue H-05: HeroSection Has No Keyboard Focus Styles

**Priority:** Medium
**Effort:** 20 min

`.ctaPrimary` and `.ctaSecondary` are `<Link>` elements styled as buttons. They have no `:focus-visible` ring. Tab navigation hits them but produces no visible focus indicator.

**File:** `frontend/src/features/home/components/HeroSection/HeroSection.module.css`

**Fix:**
```css
.ctaPrimary:focus-visible { outline: 2px solid var(--site-primary); outline-offset: 3px; }
.ctaSecondary:focus-visible { outline: 2px solid var(--site-stroke); outline-offset: 3px; }
```
Apply the same pattern to every interactive element site-wide (see Issue G-03).

---

### Issue H-06: CtaBanner SectionLabel "05 / Start Here" Is Semantically Wrong

**Priority:** Low
**Effort:** 5 min

"Start Here" is not a section category that belongs in the same visual language as "02 / Services" or "03 / Projects". The SectionLabel pattern ("XX / Name") implies a content category. On the home page this CTA is clearly a call to action, not a named section.

**File:** `frontend/src/features/home/components/CtaBanner/CtaBanner.tsx`

**Fix:** Either remove the SectionLabel entirely from CtaBanner (the headline stands on its own), or change the label to a simpler eyebrow: `<span className={styles.eyebrow}>Let's Work Together</span>`.

---

### Issue H-07: ServicesPreview Has No Hover State on Cards

**Priority:** Low
**Effort:** 30 min

ServicesPreview cards are static — no hover color change, no cursor affordance. A user could mistake them for non-interactive content even though they conceptually represent services they might want to explore.

**File:** `frontend/src/features/home/components/ServicesPreview/ServicesPreview.module.css`

**Fix:** Add a subtle hover state:
```css
.card { cursor: pointer; transition: background 0.2s ease; }
.card:hover { background: rgba(240, 235, 227, 0.02); }
.card:hover .cardTitle { color: var(--site-primary); transition: color 0.2s ease; }
```
Wrap each card in a `<Link to="/services">` if the intent is to make them clickable.

---

## ABOUT PAGE (`/about`)

**File:** `frontend/src/pages/AboutPage.tsx`
**Sections:** PageHero → AboutPreviewSection → MissionValuesSection → TeamSection

---

### Issue A-01: Duplicate Section Label "About"

**Priority:** Critical
**Effort:** 20 min

The PageHero renders `<SectionLabel>01 / About</SectionLabel>`. Immediately below it, `AboutPreviewSection` renders `<SectionLabel>00 / About</SectionLabel>`. The visitor sees two consecutive label/line motifs saying "About" within the first scroll position.

**Files:**
- `frontend/src/features/home/components/AboutPreviewSection/AboutPreviewSection.tsx`
- `frontend/src/features/home/components/AboutPreviewSection/AboutPreviewSection.module.css`

**Fix:** Make the SectionLabel in `AboutPreviewSection` optional by adding a `showLabel?: boolean` prop (default `true` for backward compatibility). When used on the About page, pass `showLabel={false}`. The company story content stands without the label when PageHero already establishes context.

```tsx
interface AboutPreviewSectionProps {
  showLabel?: boolean
}
export function AboutPreviewSection({ showLabel = true }: AboutPreviewSectionProps) {
  return (
    <section className={styles.section}>
      <SiteContainer>
        <div className={styles.grid}>
          <div className={styles.left}>
            {showLabel && <SectionLabel>00 / About</SectionLabel>}
```

---

### Issue A-02: Missing Stats Section

**Priority:** Medium
**Effort:** 1.5 hours

The About page has no statistics section (340+ projects, 28 years, $4.2B assets, 94% on-time). These figures are currently embedded only in the HeroSection stats bar on the home page. The About page is the natural place for them in a dedicated, readable format. DOCS/PAGE_ARCHITECTURE.md calls for Statistics on this page.

**Files to create:**
- `frontend/src/components/sections/StatsSection/StatsSection.tsx`
- `frontend/src/components/sections/StatsSection/StatsSection.module.css`

**Approach:** Create a full-bleed 4-column stat grid (matching the hero stats bar's visual language but more spacious). Place it after `MissionValuesSection` and before `TeamSection`. Each stat: large display number in primary orange + label in DM Mono. Add to `components/sections/index.ts` export and import in `AboutPage.tsx`. It should read from `features/home/data/stats.ts`.

---

### Issue A-03: TeamSection "View Profile" Links Are Dead

**Priority:** Medium
**Effort:** 2 hours (component fix) + separate effort for profile pages

`TeamSection` renders an orange hover overlay with "View Profile" + ArrowUpRight. The overlay has no `href`, no `<Link>`, no `<a>` tag. The cursor changes on hover (card is `cursor: pointer`) but clicking does nothing.

**File:** `frontend/src/features/home/components/TeamSection/TeamSection.tsx`

**Two options:**

Option A (simpler, no new pages): Remove "View Profile" entirely from the overlay. Replace with just name + role + experience. The overlay becomes informational, not interactive. Update the overlay `div` and remove `.overlayLink`.

Option B (correct): Create individual profile pages at `/about/team/[slug]` and wrap cards in `<Link>` elements. Requires adding a `slug` field to the team data file and creating a `TeamMemberPage` template.

Option A is recommended for Phase 2. Option B waits for API integration when team data will have slugs.

---

### Issue A-04: TeamSection Cards Are Not Keyboard-Accessible

**Priority:** Medium
**Effort:** 30 min

Team cards are `<div>` elements with CSS hover effects. They cannot be focused via keyboard. Tab navigation skips them entirely. Screen readers do not announce them as interactive.

**File:** `frontend/src/features/home/components/TeamSection/TeamSection.tsx`

**Fix (if implementing Option A from A-03):** No fix needed — cards become purely visual, not interactive.

**Fix (if interactive):** Change the outer `div.card` to a `<Link>` or `<button>` element to make it focusable. Add `:focus-visible` overlay trigger.

---

### Issue A-05: Vision Statement Missing from About Page

**Priority:** Low
**Effort:** 45 min (add to MissionValuesSection or new section)

DOCS/PAGE_ARCHITECTURE.md specifies: Company Story → Mission → Vision → Values. Currently `MissionValuesSection` combines Mission + Values in one component. There is no Vision statement. Either add a Vision to the existing Mission strip or create a second paragraph in the mission area.

**File:** `frontend/src/features/about/components/MissionValuesSection/MissionValuesSection.tsx`

**Fix:** Extend the mission area with a Vision statement:
```tsx
<div className={styles.vision}>
  <div className={styles.visionLabel}>Our Vision</div>
  <p className={styles.visionText}>
    To be the definitive benchmark for integrated construction delivery — 
    the firm that defines what the industry becomes next.
  </p>
</div>
```

---

### Issue A-06: AboutPreviewSection Large Bottom Padding Causes Visual Gap

**Priority:** Low
**Effort:** 10 min

`AboutPreviewSection.module.css` sets `padding-block: 6rem 11rem` on mobile and `padding-block: 11rem` on desktop. When this section is followed immediately by `MissionValuesSection`, the `11rem` bottom padding creates an unusual amount of white space between the sections. The `11rem` was originally designed when this was the last section before the footer.

**File:** `frontend/src/features/home/components/AboutPreviewSection/AboutPreviewSection.module.css`

**Fix:** Reduce the bottom padding when used in the About page context. Options:
- Accept a `className` prop override from the page (already supported via SiteContainer — add it to the section element too)
- Or reduce `11rem` to `7rem` globally since the section no longer ends pages

---

## SERVICES PAGE (`/services`)

**File:** `frontend/src/pages/ServicesPage.tsx`
**Sections:** PageHero → ServicesSection

---

### Issue S-01: Duplicate Header — PageHero + ServicesSection Both Show "WHAT WE DO"

**Priority:** Critical
**Effort:** 20 min

`PageHero` renders headline "WHAT / WE DO". Immediately below, `ServicesSection` renders its own `h2` with "WHAT / WE DO" inside `.header`. The page has two consecutive identical headings at different scales.

**File:** `frontend/src/features/home/components/ServicesSection/ServicesSection.tsx`

**Fix:** Add an optional `showHeader?: boolean` prop (default `true`). When used on the Services page via `ServicesPage.tsx`, pass `showHeader={false}`. The accordion list renders without repeating the heading. This is the same pattern as A-01.

---

### Issue S-02: Duplicate Section Label "01 / Services" After PageHero "02 / Services"

**Priority:** Critical
**Effort:** 5 min (handled with S-01 fix)

`PageHero` shows "02 / Services". `ServicesSection` shows "01 / Services" as its own SectionLabel. Two labels appear in sequence. When `showHeader={false}`, the entire `.header` div (which contains SectionLabel + headline + tagline) should be hidden.

**File:** `frontend/src/features/home/components/ServicesSection/ServicesSection.tsx`

**Fix:** Covered by S-01. When `showHeader={false}`, render nothing for the `.header` block.

---

### Issue S-03: ProcessSection Is Orphaned — Should Live on Services Page

**Priority:** Medium
**Effort:** 30 min

`ProcessSection` exists as a fully-built component (`features/home/components/ProcessSection/`) but renders on no public page. The most logical placement is after `ServicesSection` on the Services page: "What We Do → How We Deliver."

**File:** `frontend/src/pages/ServicesPage.tsx`

**Fix:**
```tsx
import { ServicesSection, ProcessSection } from '@/features/home/components'

export function ServicesPage() {
  return (
    <>
      <PageHero ... />
      <ServicesSection showHeader={false} />
      <ProcessSection />
    </>
  )
}
```
Also update `ProcessSection` SectionLabel from `"03 / Process"` to `"02 / Process"` since it now follows ServicesSection on the same page, or make the label a prop.

---

### Issue S-04: Services Page Ends Without a CTA

**Priority:** Medium
**Effort:** 15 min

After the user reads all services (and the process section once added), there is no invitation to take action. The page ends and the next visible element is the Footer. This is a missed conversion opportunity.

**File:** `frontend/src/pages/ServicesPage.tsx`

**Fix:** Add `<CtaBanner />` as the last section:
```tsx
import { ServicesSection, ProcessSection, CtaBanner } from '@/features/home/components'
```

---

### Issue S-05: ServicesSection Accordion Rows Are `<div>`, Not `<button>`

**Priority:** Medium
**Effort:** 1 hour

The entire clickable service row is a `<div onClick={toggle}>`. Div elements are not keyboard-focusable unless `tabIndex={0}` is added, and they don't announce as interactive to screen readers.

**File:** `frontend/src/features/home/components/ServicesSection/ServicesSection.tsx`

**Current:**
```tsx
<div className={...} onClick={() => toggle(i)}>
```

**Fix:** Change to a semantic structure where the toggle button is a `<button>`:
```tsx
<div className={...}>
  <button
    className={styles.rowHeader}
    onClick={() => toggle(i)}
    aria-expanded={isOpen}
    aria-controls={`service-body-${i}`}
  >
    {/* row content */}
  </button>
  <div id={`service-body-${i}`} className={...} role="region">
```
The entire row becomes the button trigger. Or wrap just the toggle icon as the button while making the full row `<article>`. The `<button>` approach is simpler.

---

## PROJECTS PAGE (`/projects`)

**File:** `frontend/src/pages/ProjectsPage.tsx`
**Sections:** PageHero → ProjectsSection

---

### Issue P-01: ProjectsSection Will Crash With Fewer Than 4 Projects

**Priority:** Critical
**Effort:** 2 hours (full refactor)

`ProjectsSection.tsx` accesses array indexes directly: `PROJECTS[0]`, `PROJECTS.slice(1, 3)`, `PROJECTS[3]`. With any count other than exactly 4:
- 3 projects: `PROJECTS[3]` is `undefined` → JS crash rendering the wide card
- 5+ projects: projects 5+ are never shown
- 0 or 1: crash on rendering the stacked pair

This will break the moment the backend returns a different number.

**File:** `frontend/src/features/home/components/ProjectsSection/ProjectsSection.tsx`

**Fix:** Refactor to be data-count-aware:
```tsx
export function ProjectsSection() {
  const featured = PROJECTS[0]
  const stacked  = PROJECTS.slice(1, 3)
  const wide     = PROJECTS[3] ?? null  // safe fallback

  if (!featured) return null  // handle empty gracefully

  return (
    <section>
      <div className={styles.topGrid}>
        <div className={styles.cardLarge}>...</div>
        {stacked.length > 0 && (
          <div className={styles.stackedPair}>
            {stacked.map(proj => ...)}
          </div>
        )}
      </div>
      {wide && (
        <div className={styles.cardWide}>...</div>
      )}
    </section>
  )
}
```

---

### Issue P-02: Project Cards Have No Click Behavior

**Priority:** Critical
**Effort:** 1 hour (add dead links now) or 4 hours (create project detail pages)

`cardLarge`, `cardSmall`, `cardWide` are all `<div>` elements with `cursor: pointer` in the CSS and visual hover states (title color change, arrow fills orange). But there is no click handler, no `<Link>`, no `<a>`. Clicking any project card does nothing. The user has no way to see project details.

**File:** `frontend/src/features/home/components/ProjectsSection/ProjectsSection.tsx`

**Phase 2 Fix Option A (temporary):** Wrap each card in `<Link to="/contact">` with the text "Interested in this project? Contact us." This at least makes clicking do something and preserves the visual interaction.

**Phase 2 Fix Option B (correct):** Add `slug` field to `features/home/data/projects.ts`:
```ts
{ id: '001', slug: 'meridian-tower', title: 'Meridian Tower', ... }
```
Create `frontend/src/pages/ProjectDetailPage.tsx` with a `useParams()` hook. Add route `/projects/:slug` to `routes/index.tsx`. Wrap each card in `<Link to={/projects/${proj.slug}}>`. This is the recommended approach.

---

### Issue P-03: "View All Projects" Link on Projects Page Links to Itself

**Priority:** Medium
**Effort:** 5 min

`ProjectsSection` header on desktop shows `<Link to="/projects">View All Projects</Link>`. When this section is rendered on the `/projects` page, this is a self-referential link that does nothing useful.

**File:** `frontend/src/features/home/components/ProjectsSection/ProjectsSection.tsx`

**Fix:** Add a `showViewAll?: boolean` prop (default `true`). Pass `showViewAll={false}` when used on `ProjectsPage`.

---

### Issue P-04: No Project Filtering or Category Separation

**Priority:** Medium
**Effort:** 3 hours

The Projects page shows all 4 projects in one layout with no way to filter by type (Commercial, Residential, Industrial, Mixed-Use). DOCS/PAGE_ARCHITECTURE.md calls for filters.

**Files to create:**
- `frontend/src/features/home/data/projects.ts` — add `category` field
- A filter component inline in ProjectsPage or as `features/projects/components/ProjectFilter/`

**Approach:** Add a filter bar above `ProjectsSection` with buttons per category. On mobile: a horizontal scroll row of pill buttons. Active filter highlights in `--site-primary`. The filter manages local state; `ProjectsSection` accepts a `projects` prop override. This is the cleanest approach before API integration.

---

### Issue P-05: Projects Page Has No CTA at Bottom

**Priority:** Medium
**Effort:** 15 min

After viewing all projects, there's no call to action. Similar to the Services page, this is a missed conversion opportunity.

**File:** `frontend/src/pages/ProjectsPage.tsx`

**Fix:** Add `<CtaBanner />` after `<ProjectsSection />`.

---

### Issue P-06: Wide Card Hides Metadata on Mobile

**Priority:** Low
**Effort:** 20 min

In `ProjectsSection`, the wide card's `.wideMeta` (location, type, area) has `display: none` on mobile. On mobile the wide card shows only the project ID and title, losing all contextual information.

**File:** `frontend/src/features/home/components/ProjectsSection/ProjectsSection.module.css`

**Fix:** Show location at minimum on mobile. Create a mobile-specific layout for `.wideInfo` that stacks ID + title + location vertically instead of horizontally:
```css
@media (max-width: 1023px) {
  .wideInfo { flex-direction: column; justify-content: flex-end; padding-block: 1.25rem; }
  .wideLeft { flex-direction: column; gap: 0.25rem; }
}
```

---

## TESTIMONIALS PAGE (`/testimonials`)

**File:** `frontend/src/pages/TestimonialsPage.tsx`
**Sections:** PageHero → TestimonialsSection

---

### Issue T-01: Duplicate Section Label "04 / Testimonials"

**Priority:** Medium
**Effort:** 20 min

`PageHero` renders "04 / Testimonials". `TestimonialsSection` renders "04 / Testimonials" as its own SectionLabel. Two identical labels appear consecutively.

**File:** `frontend/src/features/home/components/TestimonialsSection/TestimonialsSection.tsx`

**Fix:** Apply the same `showLabel?: boolean` pattern from A-01 and S-01. Pass `showLabel={false}` when used in `TestimonialsPage`.

---

### Issue T-02: Carousel Has No Auto-Advance

**Priority:** Low
**Effort:** 30 min

The testimonial carousel requires manual interaction. There is no timer-based advance. For a page whose entire purpose is showcasing client feedback, auto-advance increases the chance all testimonials are seen.

**File:** `frontend/src/features/home/components/TestimonialsSection/TestimonialsSection.tsx`

**Fix:**
```tsx
useEffect(() => {
  const timer = setInterval(next, 6000)
  return () => clearInterval(timer)
}, [active])
```
Pause on hover by tracking a `paused` state. Respect `prefers-reduced-motion` by not starting the interval if the user has reduced motion enabled.

---

### Issue T-03: Testimonials Page Has No CTA

**Priority:** Low
**Effort:** 15 min

After reading testimonials, the user has no prompt to take action. Add `<CtaBanner />` after `<TestimonialsSection />`.

**File:** `frontend/src/pages/TestimonialsPage.tsx`

---

## FAQ PAGE (`/faq`)

**File:** `frontend/src/pages/FaqPage.tsx`
**Sections:** PageHero → FaqSection

---

### Issue F-01: Duplicate Phrasing — PageHero "COMMON QUESTIONS" + FaqSection "Common Questions"

**Priority:** Medium
**Effort:** 10 min

`PageHero` headline reads "COMMON / QUESTIONS". `FaqSection` renders `<SectionLabel>Common Questions</SectionLabel>` directly below. The phrasing is identical at two visual levels.

**File:** `frontend/src/features/faq/components/FaqSection/FaqSection.tsx`

**Fix:** Change the SectionLabel in FaqSection to something more descriptive: `<SectionLabel>Frequently Asked</SectionLabel>` or remove it entirely when used on the FAQ page via a `showLabel` prop.

---

### Issue F-02: No FAQ Categories

**Priority:** Low
**Effort:** 2 hours

DOCS/PAGE_ARCHITECTURE.md specifies FAQ categories. All 6 questions appear as a flat undifferentiated list. With more questions from the API, discoverability breaks down.

**Files:**
- `frontend/src/features/faq/data/faq.ts` — add `category: string` field to `FaqItem`
- `frontend/src/features/faq/components/FaqSection/FaqSection.tsx` — group by category
- `frontend/src/features/faq/components/FaqSection/FaqSection.module.css` — category heading styles

**Approach:**
1. Add `category` field to FAQ data: `'Services' | 'Process' | 'Coverage' | 'Commercial'`
2. Group items by category using `reduce`
3. Render each category group with a small heading above it
4. This structure will survive API migration without changes to the component logic

---

### Issue F-03: FAQ Page Has No CTA at Bottom

**Priority:** Medium
**Effort:** 15 min

The FAQ page ends with the last question. Users whose question wasn't answered have no obvious path to contact the company.

**File:** `frontend/src/pages/FaqPage.tsx`

**Fix:** Add a `CtaBanner` variant or a simple text CTA below `FaqSection`:
```tsx
<CtaBanner />
```
Or create a lighter variant — a single-line strip: "Still have questions? → Contact our team" with a link.

---

## CONTACT PAGE (`/contact`)

**File:** `frontend/src/pages/ContactPage.tsx`
**Sections:** PageHero → CtaSection

---

### Issue C-01: Form Has No Validation

**Priority:** Critical
**Effort:** 2 hours

`CtaSection` form has no validation. Every field is an uncontrolled input. Submitting with empty fields calls `setSubmitted(true)` and shows the success message. A blank form submission triggers success.

**File:** `frontend/src/features/home/components/CtaSection/CtaSection.tsx`

**Fix:** Add React Hook Form + Zod. The packages are already installed (`react-hook-form`, `@hookform/resolvers`, `zod`).

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email:   z.string().email('Valid email required'),
  service: z.string().optional(),
  message: z.string().min(10, 'Please describe your project (min 10 characters)'),
})
type FormData = z.infer<typeof schema>

// In component:
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

Add `{...register('name')}` to each input. Show `errors.name?.message` below each field.

---

### Issue C-02: Form Fields Have No `<label>` Elements — Critical Accessibility Issue

**Priority:** Critical
**Effort:** 1 hour

Every input in `CtaSection` uses only `placeholder` text to identify itself. Placeholders disappear when the user types. Screen readers do not associate placeholders with inputs as labels. This fails WCAG 2.1 criterion 1.3.1 (Info and Relationships) and 3.3.2 (Labels or Instructions).

**File:** `frontend/src/features/home/components/CtaSection/CtaSection.tsx`
**CSS File:** `frontend/src/features/home/components/CtaSection/CtaSection.module.css`

**Fix:** Add `<label>` for each field. Labels can be visually hidden (accessible) or visible (better UX). For the form's dark glass panel aesthetic, a small visible label above each field works well:
```tsx
<label htmlFor="name" className={styles.fieldLabel}>Full Name</label>
<input id="name" type="text" className={styles.field} placeholder="e.g. Marcus Holt" />
```
Add `.fieldLabel { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--site-text-muted); margin-bottom: 0.375rem; display: block; }`.

---

### Issue C-03: Form Has No Loading State

**Priority:** Critical
**Effort:** 30 min (CSS-only for now)

When the user clicks "Send Enquiry", the button instantly shows success. There is no visual feedback during a "processing" phase. Once real API calls are added, users need to see that something is happening.

**File:** `frontend/src/features/home/components/CtaSection/CtaSection.tsx`

**Fix:** Add a loading state to the button:
```tsx
<button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
  {isSubmitting ? 'Sending...' : <>Send Enquiry <ArrowUpRight size={14} /></>}
</button>
```
CSS: `.submitBtn:disabled { opacity: 0.6; cursor: not-allowed; }`.

---

### Issue C-04: Duplicate Section Label "06 / Contact"

**Priority:** Medium
**Effort:** 20 min

`PageHero` renders "06 / Contact". `CtaSection` renders `<SectionLabel>06 / Contact</SectionLabel>` directly below. Identical labels appear twice.

**File:** `frontend/src/features/home/components/CtaSection/CtaSection.tsx`

**Fix:** Apply `showLabel?: boolean` prop. Pass `showLabel={false}` in `ContactPage.tsx`.

---

### Issue C-05: Form Inputs Have No `name` Attributes

**Priority:** Medium
**Effort:** 10 min (resolved automatically when React Hook Form is added)

Current inputs: `<input type="text" placeholder="Full Name" required className={styles.field} />`. No `name` attribute. Without `name`, the browser cannot serialize form data, password managers cannot suggest values, and autofill cannot function.

**File:** `frontend/src/features/home/components/CtaSection/CtaSection.tsx`

**Fix:** Resolved automatically by C-01 implementation (`{...register('name')}` adds the `name` attribute). If RHF is not implemented yet, add `name` attributes manually as a stopgap.

---

### Issue C-06: No Map on Contact Page

**Priority:** Low
**Effort:** 1 hour

DOCS/PAGE_ARCHITECTURE.md specifies a map on the Contact page. Currently there is contact address text but no visual map.

**File:** `frontend/src/pages/ContactPage.tsx`

**Fix:** Use a static map image (no API key required) or an embedded OpenStreetMap iframe (free, no attribution restriction for basic use). Store the static map image in `assets/images/contact-map.jpg`. Do not use Google Maps API or any paid map service without approval.

---

---

# GLOBAL ISSUES

---

## GLOBAL COMPONENTS AND SHELL

---

### Issue G-01: No 404 Page

**Priority:** Critical
**Effort:** 30 min

React Router v7 renders nothing for unmatched routes. Navigating to `/anything-wrong` shows a blank page with only the Header and Footer.

**Files to create:**
- `frontend/src/pages/NotFoundPage.tsx`

**Update:** `frontend/src/routes/index.tsx`

**Fix:**
```tsx
// NotFoundPage.tsx
export function NotFoundPage() {
  return (
    <>
      <PageHero
        label="Error"
        headline="PAGE"
        headlineSub="NOT FOUND"
        subtitle="The page you are looking for does not exist or has been moved."
      />
      <CtaBanner />
    </>
  )
}
// routes/index.tsx — add inside PublicLayout children:
{ path: '*', element: <NotFoundPage /> }
```

---

### Issue G-02: No SEO Meta Tags on Any Page

**Priority:** Critical
**Effort:** 2 hours (all pages)

No page has a `<title>` or `<meta name="description">`. React 19 supports natively rendering `<title>` and `<meta>` inside components — no react-helmet needed.

**Files:** Every page file in `frontend/src/pages/`

**Fix:** Add to each page component:
```tsx
// HomePage.tsx
export function HomePage() {
  return (
    <>
      <title>BuildCo — Premium Construction & Architecture Group</title>
      <meta name="description" content="BuildCo delivers landmark construction, architecture and land development projects across Dubai, London and Sydney. 340+ projects since 1996." />
      {/* sections */}
    </>
  )
}
```
All 7 public pages + 404 need their own unique title and description.

---

### Issue G-03: No `:focus-visible` Styles on Interactive Elements Globally

**Priority:** Critical
**Effort:** 1 hour

No interactive element on the public site has a custom `:focus-visible` style. Browser default focus outlines are often styled away or invisible against the dark background. This affects all `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>` elements.

**File:** `frontend/src/index.css`

**Fix:** Add a global focus rule that applies to all interactive elements:
```css
:focus-visible {
  outline: 2px solid var(--site-primary);
  outline-offset: 3px;
}
```
This single rule in `index.css` covers everything. Components that need custom offsets or shapes can override per element.

---

### Issue G-04: ServicesSection Accordion Rows Use `<div>` Not `<button>`

**Priority:** Critical
**Effort:** 1 hour

Covered in S-05 above. Listed here because it is the most widespread accessibility violation affecting a core component used across two pages.

**Files affected:**
- `frontend/src/features/home/components/ServicesSection/ServicesSection.tsx`

---

### Issue G-05: Footer `SERVICE_LINKS` Array Does Not Match Actual Services

**Priority:** Medium
**Effort:** 10 min

`Footer.tsx` defines:
```tsx
const SERVICE_LINKS = [
  'General Construction',
  'Renovation & Remodeling',
  'Project Management',
  'Design Consultation',
]
```
These are generic placeholder names. The actual services from `services.ts` are: Building Construction, Land Development, Architecture, Project Management, Engineering Consultation.

**File:** `frontend/src/components/navigation/Footer/Footer.tsx`

**Fix:**
```tsx
import { SERVICES } from '@/features/home/data/services'
// In Footer:
{SERVICES.map((s) => (
  <li key={s.num}>
    <Link to="/services" className={styles.link}>{s.title}</Link>
  </li>
))}
```

---

### Issue G-06: Footer Grid Breaks at Tablet Width

**Priority:** Medium
**Effort:** 20 min

`Footer.module.css` defines `grid-template-columns: 2fr 1fr 1fr 1fr` on desktop. At `max-width: 1024px` it collapses to `1fr 1fr`. The brand column loses its 2fr advantage and becomes the same width as the link columns, making the description text very compressed.

**File:** `frontend/src/components/navigation/Footer/Footer.module.css`

**Fix:** Add a 768px breakpoint or refine the 1024px breakpoint:
```css
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr; /* brand spans full row */
    row-gap: 2rem;
  }
  .brand {
    grid-column: 1 / -1; /* brand takes full width on first row */
  }
}
```

---

### Issue G-07: SectionLabel Line Uses `--site-border` Instead of `--site-primary`

**Priority:** Low
**Effort:** 5 min

`SectionLabel.module.css` renders the horizontal line after the text as:
```css
.line { background: var(--site-border); }
```
`--site-border` is `rgba(240,235,227,0.08)` — extremely faint. The line is nearly invisible. Given that the text is `--site-primary` (orange), a slightly stronger line color would reinforce the motif. Not a bug, but a visual inconsistency.

**File:** `frontend/src/components/sections/SectionLabel/SectionLabel.module.css`

**Fix:** Either change to `rgba(232, 98, 10, 0.3)` (faint orange matching the border on tags) or keep as-is. This is a design call.

---

### Issue G-08: `prefers-reduced-motion` Not Respected by Any Animation

**Priority:** Medium
**Effort:** 30 min

The following animations run unconditionally without checking `prefers-reduced-motion`:
- `@keyframes marqueeScroll` — MarqueeSection
- `@keyframes heroBounce` — HeroSection scroll cue
- CSS `transition` on image hover in ProjectsSection, ProjectsPreview
- CSS `transition` on TeamSection card hover overlays
- Testimonial carousel timing (when auto-advance is added)

**Files:** `MarqueeSection.module.css`, `HeroSection.module.css`, multiple others.

**Fix (CSS-only approach):**
```css
@media (prefers-reduced-motion: reduce) {
  .inner { animation: none; }
  .scrollDot { animation: none; }
  .cardImg { transition: none; }
}
```
Add this block to each affected CSS module file.

---

### Issue G-09: No Scroll Animation System

**Priority:** Medium
**Effort:** 4 hours (all pages)

Referenced in H-03. This is the implementation plan for the site-wide scroll animation system.

**Files to create:**
- `frontend/src/hooks/useInView.ts`

**Files to update:** Every section component's TSX and CSS module.

**Implementation approach:** Single `useInView` hook with IntersectionObserver. Returns `{ ref, inView }`. Attach `ref` to `<section>` element. Apply `cn(styles.section, inView && styles.sectionVisible)` to the className. CSS modules define initial `opacity: 0; transform: translateY(24px)` state and final `opacity: 1; transform: none` state in `.sectionVisible`.

**Stagger children:** For grid sections (ServicesPreview cards, project cards, value cards), add `animation-delay` via inline `style={{ transitionDelay: \`${index * 0.1}s\`` }}` on each child.

**Sections requiring animation:**
- MarqueeSection: slide in from left
- ServicesPreview cards: stagger
- ProjectsPreview cards: stagger
- TestimonialPreview: fade
- CtaBanner: slide up
- AboutPreviewSection: left panel + right panel stagger
- MissionValuesSection cards: stagger
- TeamSection cards: stagger
- ServicesSection: each row fades in sequentially
- ProcessSection steps: stagger left to right

---

### Issue G-10: No Skip Navigation Link for Keyboard Users

**Priority:** Medium
**Effort:** 20 min

Keyboard users must tab through all 7 navigation links before reaching main content on every page load. This fails WCAG 2.4.1 (Bypass Blocks).

**File:** `frontend/src/layouts/PublicLayout/PublicLayout.tsx`

**Fix:** Add a visually hidden skip link that becomes visible on focus:
```tsx
<a href="#main-content" className={styles.skipLink}>Skip to main content</a>
<Header />
<main id="main-content" className={styles.main}>
```
```css
/* PublicLayout.module.css */
.skipLink {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--site-primary);
  color: var(--site-bg);
  font-family: var(--font-mono);
  font-size: 11px;
  z-index: 9999;
}
.skipLink:focus { top: 1rem; }
```

---

### Issue G-11: `<html lang>` Attribute May Be Missing

**Priority:** Medium
**Effort:** 2 min

Screen readers use the `lang` attribute to select the correct language engine for pronunciation.

**File:** `frontend/index.html`

**Fix:** Verify that `<html lang="en">` is present. If not, add it.

---

### Issue G-12: Color Contrast — `--site-text-muted` May Fail WCAG AA

**Priority:** Medium
**Effort:** Analysis only

`--site-text-muted: #7A756E` on `--site-bg: #0A0A08` needs verification. The approximate contrast ratio is ~4.0:1 — below the 4.5:1 minimum for normal text at WCAG AA. This color is used for body text, subtitles, and metadata throughout every page.

**Files:** All CSS modules that use `var(--site-text-muted)` for body copy (not just decorative elements).

**Fix:** Lighten `--site-text-muted` slightly in `site-theme.css`:
```css
--site-text-muted: #8A8379;  /* from #7A756E — estimated ~4.7:1 on #0A0A08 */
```
Verify the new value with a contrast checker before committing. All uses inherit the change automatically.

---

### Issue G-13: Social Icon Links in Footer Link to `#`

**Priority:** Low
**Effort:** 5 min (placeholder fix) or 1 hour (real icons)

Footer social links (`Globe`, `Camera`, `Briefcase`, `Share2`) all have `href="#"`. Two problems:
1. `href="#"` scrolls to the top of the page on click
2. The icons are not actual social brand icons (Lucide doesn't have Facebook, Instagram, LinkedIn, X)

**File:** `frontend/src/components/navigation/Footer/Footer.tsx`

**Phase 2 Fix:** Change `href="#"` to `href="https://instagram.com/buildco"` etc. with the actual placeholder URLs, or add `onClick={(e) => e.preventDefault()}` to prevent the scroll-to-top behavior.

For the icon mismatch: download actual brand SVG icons, store in `assets/icons/`, import as React components. This requires approval before adding new icon packages.

---

---

# COMPONENT AUDIT

---

## Orphaned Components

### ProcessSection

**File:** `frontend/src/features/home/components/ProcessSection/`
**Status:** Complete UI, zero page renders it
**Resolution:** Add to `ServicesPage.tsx` after `ServicesSection` (Issue S-03)

---

## Components That Will Break When APIs Replace Static Data

### 1. ProjectsSection

**File:** `frontend/src/features/home/components/ProjectsSection/ProjectsSection.tsx`
**Risk:** CRITICAL crash
**Reason:** Direct index access `PROJECTS[0]`, `PROJECTS[3]`. Any count other than 4 causes runtime errors or silent data loss.
**Fix:** Issue P-01 — add safe fallbacks and conditional rendering.

---

### 2. HeroSection (badge data)

**File:** `frontend/src/features/home/components/HeroSection/HeroSection.tsx`
**Risk:** Runtime crash
**Reason:** `PROJECTS[0].title` and `PROJECTS[0].location` accessed unconditionally. If API returns empty projects array, this crashes.
**Fix:** Add optional chaining:
```tsx
{PROJECTS[0] && (
  <div className={styles.heroBadge}>
    <div className={styles.badgeLabel}>Latest Project</div>
    <div className={styles.badgeTitle}>{PROJECTS[0].title}</div>
    ...
  </div>
)}
```

---

### 3. TestimonialPreview

**File:** `frontend/src/features/home/components/TestimonialPreview/TestimonialPreview.tsx`
**Risk:** Wrong data displayed
**Reason:** Uses `TESTIMONIALS[0]` — the "featured" testimonial is assumed to be index 0. When API data arrives, the featured testimonial may be a different record with a `featured: true` field.
**Fix:** Future: `const featured = TESTIMONIALS.find(t => t.featured) ?? TESTIMONIALS[0]`. Add `featured?: boolean` field to `Testimonial` interface in `testimonials.ts` now so the data shape is ready.

---

### 4. MissionValuesSection

**File:** `frontend/src/features/about/components/MissionValuesSection/MissionValuesSection.tsx`
**Risk:** Data can't be managed without code changes
**Reason:** `const VALUES = [...]` is defined inside the component file. These values can't be edited through an admin panel.
**Fix:** Extract to `features/about/data/values.ts` as a data file with proper TypeScript interface. Same pattern as services.ts, testimonials.ts. This makes the future API migration straightforward.

---

### 5. CtaSection Service Dropdown

**File:** `frontend/src/features/home/components/CtaSection/CtaSection.tsx`
**Risk:** Incorrect options displayed
**Reason:** `<select>` options are populated from `SERVICES` data. When API replaces this, the select will show whatever the API returns. This is actually correct behavior and low risk — but needs loading state if options are async.
**Fix:** No change needed now. Flag for API integration phase.

---

## Components That Should Be Refactored

### 1. SectionLabel Shown Twice Pattern (5 instances)

Every inner page suffers from double SectionLabel rendering: once in PageHero, once in the section component below.

**Affected pages/components:**
- `/about` — `AboutPreviewSection` shows "00 / About" after PageHero "01 / About"
- `/services` — `ServicesSection` shows "01 / Services" after PageHero "02 / Services"
- `/projects` — `ProjectsSection` shows "02 / Projects" after PageHero "03 / Projects"
- `/testimonials` — `TestimonialsSection` shows "04 / Testimonials" after PageHero "04 / Testimonials"
- `/contact` — `CtaSection` shows "06 / Contact" after PageHero "06 / Contact"
- `/faq` — `FaqSection` shows "Common Questions" near-duplicate phrasing

**Resolution:** All affected section components need a `showLabel?: boolean` prop (default `true`). Pages that use PageHero pass `showLabel={false}` to the first section. This requires small changes to 5 component files but cleanly solves the duplication.

---

### 2. ServicesSection Accordion Uses `<div>` as Interactive Element

**Affected files:** `ServicesSection.tsx`
**Resolution:** Issue S-05 — change to `<button>` element.

---

### 3. ProjectsPreview Grid Column Count Mismatch

**Affected files:** `ProjectsPreview.module.css`
**Resolution:** Issue H-01 — fix to `repeat(4, 1fr)`.

---

### 4. Footer Hardcoded Service Names

**Affected files:** `Footer.tsx`
**Resolution:** Issue G-05 — derive from SERVICES data.

---

### 5. All Section CSS Modules Duplicate Animation Pattern

When scroll animations are added (Issue G-09), each CSS module will get `.section { opacity: 0; transform: translateY(24px) }` + `.sectionVisible { ... }`. This pattern is repeated across ~14 section files. This is intentional and acceptable with CSS Modules — do not abstract into a shared class, as PostCSS/Modules don't support cross-file class composition for component-specific states.

---

---

# PHASE 2 IMPLEMENTATION ORDER

Tasks are sequenced by dependency and impact. Bugs before features. Critical before medium.

---

## Stage 1: Fix Critical Bugs (Do First — Unblocks Everything)

These issues either crash, break a11y critically, or produce incorrect output.

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 1 | H-01: Fix ProjectsPreview 4-item 3-col grid | `ProjectsPreview.module.css` | 15 min |
| 2 | P-01: Refactor ProjectsSection for variable project count | `ProjectsSection.tsx` | 2 hrs |
| 3 | G-01: Create 404 page + add route | `NotFoundPage.tsx`, `routes/index.tsx` | 30 min |
| 4 | G-02: Add SEO `<title>` + `<meta>` to all 7 pages + 404 | All page files | 2 hrs |
| 5 | G-03: Add `:focus-visible` globally | `index.css` | 10 min |
| 6 | C-01: Form validation with React Hook Form + Zod | `CtaSection.tsx` | 2 hrs |
| 7 | C-02: Add `<label>` to all form fields | `CtaSection.tsx`, `.module.css` | 1 hr |
| 8 | S-05: Change ServicesSection rows from `<div>` to `<button>` | `ServicesSection.tsx` | 1 hr |
| 9 | H-05: Fix HeroSection badge crash with optional chaining | `HeroSection.tsx` | 10 min |

**Stage 1 total: ~9.5 hours**

---

## Stage 2: Fix Label Duplication (Structural — Affects 5 Pages)

All SectionLabel duplicate issues resolved with a single pattern applied consistently.

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 10 | Add `showLabel` prop to `AboutPreviewSection` | `AboutPreviewSection.tsx` | 20 min |
| 11 | Add `showHeader` prop to `ServicesSection` | `ServicesSection.tsx` | 20 min |
| 12 | Add `showViewAll` prop to `ProjectsSection` | `ProjectsSection.tsx` | 10 min |
| 13 | Add `showLabel` prop to `TestimonialsSection` | `TestimonialsSection.tsx` | 20 min |
| 14 | Add `showLabel` prop to `CtaSection` | `CtaSection.tsx` | 20 min |
| 15 | F-01: Fix FAQ SectionLabel phrasing | `FaqSection.tsx` | 10 min |
| 16 | Update all inner pages to pass the new props | All 5 page files | 30 min |

**Stage 2 total: ~2.5 hours**

---

## Stage 3: Add Missing Page Content (Substance)

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 17 | S-03: Add ProcessSection to ServicesPage | `ServicesPage.tsx` | 30 min |
| 18 | S-04: Add CtaBanner to ServicesPage | `ServicesPage.tsx` | 10 min |
| 19 | P-05: Add CtaBanner to ProjectsPage | `ProjectsPage.tsx` | 10 min |
| 20 | T-03: Add CtaBanner to TestimonialsPage | `TestimonialsPage.tsx` | 10 min |
| 21 | F-03: Add CtaBanner to FaqPage | `FaqPage.tsx` | 10 min |
| 22 | A-02: Create StatsSection component + add to AboutPage | New `StatsSection/`, `AboutPage.tsx` | 1.5 hrs |
| 23 | A-05: Add Vision statement to MissionValuesSection | `MissionValuesSection.tsx`, `.module.css` | 45 min |
| 24 | A-03: Remove "View Profile" from TeamSection (Option A) | `TeamSection.tsx`, `.module.css` | 30 min |

**Stage 3 total: ~3.5 hours**

---

## Stage 4: Fix Navigation and Footer

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 25 | G-05: Fix Footer SERVICE_LINKS to use actual SERVICES data | `Footer.tsx` | 10 min |
| 26 | G-06: Fix Footer grid at tablet width | `Footer.module.css` | 20 min |
| 27 | G-10: Add skip navigation link | `PublicLayout.tsx`, `.module.css` | 20 min |
| 28 | G-11: Verify `<html lang="en">` | `index.html` | 2 min |
| 29 | G-13: Fix footer social `href="#"` scroll issue | `Footer.tsx` | 5 min |

**Stage 4 total: ~1 hour**

---

## Stage 5: Accessibility and Motion

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 30 | G-08: Add `prefers-reduced-motion` to all animated CSS | 5 CSS module files | 30 min |
| 31 | G-12: Verify and fix muted text contrast | `site-theme.css` | 30 min |
| 32 | T-01: Add `showLabel` to TestimonialsSection (done in Stage 2) | — | — |
| 33 | P-04: Add keyboard focus to project cards | `ProjectsSection.tsx` | 30 min |
| 34 | A-04: Improve TeamSection keyboard behavior | `TeamSection.tsx` | 30 min |

**Stage 5 total: ~2 hours**

---

## Stage 6: Interactions and Animations

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 35 | G-09: Create `useInView` hook + apply scroll animations to all sections | New hook + 14 component files | 4 hrs |
| 36 | H-04: Add fade transition to TestimonialsSection carousel | `TestimonialsSection.tsx`, `.module.css` | 45 min |
| 37 | T-02: Add auto-advance to testimonials carousel (with reduced-motion guard) | `TestimonialsSection.tsx` | 30 min |
| 38 | H-07: Add hover state to ServicesPreview cards | `ServicesPreview.module.css` | 30 min |
| 39 | C-03: Add loading state to contact form button | `CtaSection.tsx`, `.module.css` | 20 min |

**Stage 6 total: ~6 hours**

---

## Stage 7: Refactor for API Readiness

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 40 | Extract MissionValuesSection values to data file | New `features/about/data/values.ts`, update component | 30 min |
| 41 | Add `featured` field to testimonials data + update TestimonialPreview | `testimonials.ts`, `TestimonialPreview.tsx` | 15 min |
| 42 | Add `slug` and `category` fields to project data | `projects.ts` | 15 min |
| 43 | Add `category` field to FAQ data and group in FaqSection | `faq.ts`, `FaqSection.tsx`, `.module.css` | 2 hrs |
| 44 | A-06: Normalize AboutPreviewSection bottom padding | `AboutPreviewSection.module.css` | 10 min |

**Stage 7 total: ~3 hours**

---

## Stage 8: Project Detail Pages

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 45 | P-02: Add `slug` field to projects data | `projects.ts` | 10 min |
| 46 | P-02: Create ProjectDetailPage with `useParams` | New `ProjectDetailPage.tsx`, `routes/index.tsx` | 3 hrs |
| 47 | P-02: Wrap project cards in `<Link>` elements | `ProjectsSection.tsx`, `ProjectsPreview.tsx` | 30 min |
| 48 | P-03: Pass `showViewAll={false}` to ProjectsSection on ProjectsPage | `ProjectsPage.tsx` | 5 min |
| 49 | P-06: Show location on mobile wide card | `ProjectsSection.module.css` | 20 min |

**Stage 8 total: ~4 hours**

---

## Stage 9: Polish and Remaining Low Priority

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 50 | H-06: Revisit CtaBanner SectionLabel text | `CtaBanner.tsx` | 5 min |
| 51 | P-04: Add project filtering UI | New filter component + `ProjectsPage.tsx` | 3 hrs |
| 52 | H-02: Mobile ProjectsPreview count indicator | `ProjectsPreview.tsx`, `.module.css` | 30 min |
| 53 | C-06: Add static map image to ContactPage | `ContactPage.tsx`, new image in assets | 1 hr |
| 54 | G-07: Review SectionLabel line color | `SectionLabel.module.css` | 5 min |
| 55 | T-02: Testimonial auto-advance with pause on hover | `TestimonialsSection.tsx` | 30 min |

**Stage 9 total: ~5 hours**

---

## Phase 2 Summary

| Stage | Description | Estimated Hours |
|-------|-------------|-----------------|
| 1 | Critical bugs + accessibility fixes | 9.5 |
| 2 | Label duplication fix | 2.5 |
| 3 | Missing page content | 3.5 |
| 4 | Footer and navigation | 1 |
| 5 | Accessibility and motion | 2 |
| 6 | Animations and interactions | 6 |
| 7 | API readiness refactors | 3 |
| 8 | Project detail pages | 4 |
| 9 | Polish | 5 |
| **Total** | | **~37 hours** |

---

## Critical Path (Minimum Viable Public Site)

If time is constrained, the minimum viable public site requires only Stages 1–4:

- All crashes and broken layouts fixed
- All accessibility blockers resolved
- All pages have content
- SEO in place
- Navigation working correctly

That is approximately **16.5 hours** of implementation work.

Stages 5–9 represent polish, animations, and detail pages — important for a premium brand but not blocking launch.
