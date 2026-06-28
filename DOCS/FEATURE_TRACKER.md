# FEATURE_TRACKER.md

# Project Progress

## Foundation

* [x] Project setup
* [x] Theme system
* [x] Routing
* [ ] Authentication
* [x] Layout system
* [x] Design system (typography, UI, sections, forms)
* [x] Public website shell (Header, Footer, NavItem, MobileMenu)

---

## Admin Panel

* [ ] Dashboard
* [ ] Site settings
* [ ] Theme settings

---

## Website Pages

* [x] Home
* [ ] About
* [ ] Services
* [ ] Projects
* [ ] Testimonials
* [ ] FAQ
* [ ] Contact

---

## Content Modules

* [ ] Services management
* [ ] Projects management
* [ ] Testimonials management
* [ ] FAQ management

---

## Future Features

* [ ] Blog
* [ ] Media manager
* [ ] SEO tools

---

# AI WORKFLOW RULES

Claude must follow these rules.

---

## Package Installation

Never install packages automatically.

Before installing any package:

1. Explain why it is needed.
2. Explain alternatives.
3. Request approval.

Example:

"I recommend react-hook-form because it simplifies validation. Approve installation?"

---

## External Assets

Never use:

* External image URLs
* CDN images
* Hotlinked assets
* Remote icons

Bad:

https://images.unsplash.com

https://randomuser.me

---

## Asset Policy

If assets are required:

* Download them locally.
* Store them inside assets/.
* Optimize them.

Folder:

assets/

```
images/
icons/
logos/
```

---

## Fonts

Prefer:

* System fonts
* Self-hosted fonts

Avoid:

* Multiple external font requests.

---

## Icons

Use:

* Lucide React

Avoid:

* Random icon packages.

---

## Images

Temporary placeholder images are allowed only during development.

Before completion:

* Replace placeholders.
* Store assets locally.

---

## New Dependencies

Before adding a dependency:

Claude must explain:

* Why it is needed.
* Why existing packages cannot solve it.
* Installation impact.

Approval is required.

---

## Large Changes

Before:

* Major refactors.
* Folder restructuring.
* Database redesign.

Claude should explain the proposal.

---

## Database Changes

Never:

* Delete tables.
* Rename columns.
* Remove data structures.

Without approval.

---

## UI Changes

Never redesign:

* Theme system.
* Layout system.
* Design system.

Without approval.

---

## Code Generation Process

1. Read documentation.
2. Check existing code.
3. Reuse components.
4. Reuse services.
5. Follow standards.
6. Implement feature.
7. Update feature tracker.

---

## Completion Rules

A feature is complete only when:

* UI finished.
* Validation implemented.
* API connected.
* Error handling exists.
* Loading states exist.
* Responsive behavior works.

---

## Project Philosophy

This project values:

1. Maintainability.
2. Reusability.
3. Simplicity.
4. Consistency.

Over:

* Fast code generation.
* Excessive dependencies.
* Shortcuts.
