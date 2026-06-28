# CLAUDE.md

Read this file before performing any task.

Before performing any task, always read the documentation files inside the /docs directory.

The /docs folder contains the complete project architecture, requirements, coding standards, design system, database rules, and development workflow.

The documentation files are the single source of truth for this project.

If any code conflicts with the documentation, the documentation takes precedence.

Before implementing any feature:

Read the relevant documentation files.
Analyze existing code.
Follow established patterns.
Reuse existing components and services.
Ask questions if requirements are unclear.

Never make architectural decisions without consulting the /docs directory.
---

# Project Rules

* Follow all documentation files.
* Reuse existing components.
* Respect folder structure.
* Follow design system.
* Follow theme system.

---

# Package Rules

Never install packages automatically.

Before installing:

1. Explain why.
2. Explain alternatives.
3. Request approval.

---

# Asset Rules

Use only free and publicly available assets.

Allowed:

* Royalty-free images
* Open-license assets
* Free icons

Not allowed:

* Paid stock images
* Copyrighted material
* Commercial licensed assets

Requirements:

* Download assets locally.
* Store inside assets/.
* Never hotlink images.
* Never use external image URLs.

Bad:

https://images.unsplash.com/...

Good:

assets/images/project-01.jpg

---

# Record Rules

Never permanently delete records.

Status values:

1 = Active
0 = Inactive
9 = Deleted

Delete actions must update status.

Queries should exclude deleted records.

Preserve historical data.

---

# Migration Rules

* Never edit old migrations.
* Create new migrations for changes.
* Avoid destructive changes.
* Preserve data.

---

# Dependency Rules

Before installing packages:

* Explain purpose.
* Explain benefits.
* Ask for approval.

---

# UI Rules

* No hardcoded colors.
* No inline styles.
* No duplicate components.
* Use shared inputs.
* Use design tokens.

---

# Development Process

1. Read documentation.
2. Check existing code.
3. Reuse components.
4. Implement feature.
5. Update feature tracker.

The goal is maintainable software, not rapid code generation.
