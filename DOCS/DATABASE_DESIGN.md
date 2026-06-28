# DATA_ARCHITECTURE.md

# Purpose

This document defines the application's data architecture.

Its purpose is to explain:

* What data exists.
* Which module owns the data.
* How modules relate to each other.
* Data responsibilities.
* Future extensibility.

Claude should use these requirements to design migrations, models, relationships, indexes, and database structures.

---

# Database Philosophy

The database should be:

* Simple.
* Scalable.
* Maintainable.
* Modular.
* Extensible.

Avoid over-engineering.

Version 1 prioritizes simplicity.

Future versions may introduce:

* Page builders
* Dynamic sections
* Multi-language support
* Advanced SEO
* Role management

The architecture should support future expansion without major rewrites.

---

# Global Rules

* Use foreign keys where appropriate.
* Prevent duplicated data.
* Prefer normalization where it improves maintainability.
* Support soft deletion only where necessary.
* Add indexes for searchable data.
* Support ordering where content is displayed in lists.
* Support active/inactive status where administrators control visibility.

---

# Authentication Module

Responsibilities:

* Administrator login.
* Session management.
* Password management.

Future:

* Roles.
* Permissions.
* Multiple administrators.

---

# Site Settings Module

Stores:

* Company information.
* Contact information.
* Address information.
* Social media links.
* Business details.
* Branding assets.

Characteristics:

* Global application data.
* Usually a single record.
* Used throughout the application.

---

# Theme System

Stores:

* Theme mode.
* Colors.
* Typography.
* Radius settings.
* Visual preferences.

Requirements:

* Support light mode.
* Support dark mode.
* Support custom themes.

The entire application depends on this data.

---

# Home Page Content

Stores:

* Hero content.
* Statistics.
* Calls to action.
* Marketing content.

Requirements:

* Administrator editable.
* Support future section expansion.
* Support future page builder integration.

---

# About Page Content

Stores:

* Company history.
* Mission.
* Vision.
* Values.
* Company information.

Requirements:

* Easily editable.
* Future expansion support.

---

# Services Module

Responsibilities:

* Store company services.
* Display services publicly.
* Support administration.

Requirements:

* Ordering.
* Visibility control.
* Images or icons.
* SEO-friendly URLs.

Relationships:

* Displayed on Home page.
* Displayed on Services page.

Future:

* Service categories.
* Related projects.

---

# Projects Module

Responsibilities:

* Showcase completed projects.
* Portfolio management.

Requirements:

* Multiple images.
* Categorization.
* Featured projects.
* Project details.
* Ordering.

Relationships:

* Home page.
* Projects page.

Future:

* Project galleries.
* Project videos.
* Related services.

---

# Testimonials Module

Responsibilities:

* Store customer reviews.
* Build trust.

Requirements:

* Visibility control.
* Ordering.
* Featured testimonials.

---

# Team Module

Responsibilities:

* Store team members.
* Company leadership information.

Requirements:

* Photos.
* Positions.
* Biography.
* Social links.

---

# FAQ Module

Responsibilities:

* Frequently asked questions.

Requirements:

* Categorization.
* Ordering.
* Visibility control.

---

# Contact Module

Responsibilities:

* Visitor inquiries.
* Contact requests.

Requirements:

* Inquiry storage.
* Read status.
* Future response management.

---

# Blog Module (Future)

Responsibilities:

* Articles.
* Categories.
* Tags.

Future feature.

---

# Media Management (Future)

Responsibilities:

* File uploads.
* Images.
* Reusable assets.

Future feature.

---

# Relationships

Services may appear:

* Home page.
* Services page.

Projects may appear:

* Home page.
* Projects page.

Testimonials may appear:

* Home page.
* Testimonials page.

Team members may appear:

* About page.
* Team page.

FAQs may appear:

* FAQ page.
* Contact page.

---

# Administrative Requirements

Administrators should be able to:

* Create content.
* Update content.
* Reorder content.
* Enable or disable content.

Without requiring code changes.

---

# AI Instructions

Claude should:

* Design the database based on requirements.
* Choose appropriate relationships.
* Create scalable migrations.
* Avoid unnecessary tables.
* Avoid unnecessary complexity.
* Prioritize maintainability.

The documentation defines the business requirements.

Claude is responsible for the final database implementation.
