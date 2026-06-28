# DESIGN SYSTEM

## Purpose

All UI elements must follow a single design system.

No page may create its own styling.

No duplicate components are allowed.

---

# Design Principles

* Consistent
* Reusable
* Accessible
* Responsive
* Theme aware

---

# Typography

Heading 1
Heading 2
Heading 3
Body
Caption

These components must be reusable.

---

# Spacing System

4px
8px
12px
16px
24px
32px
48px

No arbitrary spacing.

---

# Border Radius

Small
Medium
Large

Controlled by theme.

---

# Elevation

Card shadows.
Drawer shadows.
Modal shadows.

Centralized.

---

# Colors

Primary
Secondary
Success
Warning
Danger
Background
Surface
Text

Theme controlled.

---

# UI Components

Buttons
Cards
Badges
Tags
Avatars
Alerts
Empty States
Loaders
Dividers

Every component must use the design system.

---

# Page Components

SectionHeader
PageHeader
HeroSection
StatisticsCard
FeatureCard
ProjectCard

Reusable.

---

# Rules

* Never create duplicate components.
* Never hardcode colors.
* Never hardcode spacing.
* Use design tokens.


# Data Lifecycle Rules

All business entities should support:

- Active
- Inactive
- Deleted

Use:

1 = Active
0 = Inactive
9 = Deleted

Requirements:

- Records should never be permanently deleted.
- Administrative deletion means changing status to 9.
- Queries should exclude status 9 by default.
- Status values must remain consistent across modules.
- Avoid hard deletes whenever possible.

Future implementations may use soft deletes in addition to status management if required.