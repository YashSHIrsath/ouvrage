# FOLDER_STRUCTURE.md

# Purpose

This document defines the project folder architecture.

Claude must follow this structure.

No new top-level folders should be created without approval.

---

# Frontend Structure

src/

```
app/
pages/
layouts/
components/
features/
hooks/
services/
stores/
types/
utils/
themes/
assets/
routes/
```

---

# app/

Application providers.

Examples:

* Query Provider
* Theme Provider
* Router Provider

---

# pages/

Route-level pages.

Examples:

* HomePage
* AboutPage
* ServicesPage
* ContactPage

Pages should:

* Fetch data.
* Compose sections.

Pages should NOT:

* Contain business logic.
* Contain large components.

---

# layouts/

Shared layouts.

Examples:

* PublicLayout
* AdminLayout

---

# components/

Reusable UI.

Structure:

components/

```
ui/
forms/
navigation/
feedback/
typography/
sections/
```

---

# components/ui/

Examples:

* Button
* Card
* Badge
* Modal

---

# components/forms/

Examples:

* TextInput
* SelectInput
* TextAreaInput

---

# components/sections/

Examples:

* HeroSection
* StatisticsSection
* CTASection

---

# features/

Business modules.

Examples:

features/

```
auth/
services/
projects/
testimonials/
faq/
contact/
```

Each feature owns:

* api
* hooks
* types
* components

---

# hooks/

Shared hooks.

Examples:

* useDebounce
* useTheme

---

# services/

API clients.

Examples:

* apiClient
* authService

No fetch calls inside components.

---

# stores/

Global state.

Examples:

* authStore
* themeStore

Use Zustand.

---

# types/

Shared TypeScript types.

---

# utils/

Helper functions.

Examples:

* date utilities
* formatting utilities

---

# themes/

Theme configuration.

Examples:

* lightTheme
* darkTheme

---

# assets/

Static assets.

Examples:

* images
* icons

---

# routes/

Application routes.

---

# Backend Structure

app/

```
Actions/
Services/
Http/
Models/
Policies/
```

---

# Controllers

Only:

* Request validation.
* Service calls.
* Responses.

Business logic should not live in controllers.

---

# Services

Business logic.

---

# Models

Relationships.

Scopes.

---

# Requests

Validation rules.

---

# Rules

❌ No business logic inside pages.

❌ No API calls inside components.

❌ No duplicate components.

❌ No random folders.

✅ Feature-based architecture.

✅ Reusable components.

✅ Centralized APIs.
