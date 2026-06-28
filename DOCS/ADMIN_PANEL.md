# ADMIN_PANEL.md

# Purpose

The administration panel is the content management system for the website.

Administrators should be able to manage the entire website without modifying code.

The admin panel should be:

* Simple
* Professional
* Responsive
* Fast
* Consistent

---

# Authentication

Features:

* Login
* Logout
* Remember session
* Password reset (future)

Only authenticated users can access the administration panel.

---

# Layout

Admin layout consists of:

* Sidebar
* Header
* Breadcrumbs
* Content Area

The layout must support:

* Desktop
* Tablet
* Mobile

---

# Dashboard

Purpose:

Provide an overview of the website.

Widgets:

* Total Services
* Total Projects
* Testimonials
* Contact Messages

Recent Activity:

* Latest messages
* Latest projects
* Recent updates

---

# Site Settings

Responsibilities:

* Company information
* Contact information
* Social links
* Business information
* Logo
* Favicon

Only one global configuration exists.

---

# Theme Settings

Responsibilities:

* Theme mode
* Colors
* Typography
* Border radius

Features:

* Live preview
* Theme switching

Supported Modes:

* Light
* Dark
* Custom

---

# Home Page Management

Administrators can edit:

* Hero section
* Statistics
* Call-to-action
* Homepage content

The page structure itself remains fixed.

---

# About Page Management

Administrators can edit:

* Company story
* Mission
* Vision
* Values

---

# Services Management

Features:

* List services
* Create service
* Edit service
* Delete service
* Reorder services
* Enable/disable services

---

# Projects Management

Features:

* Create projects
* Upload images
* Edit projects
* Feature projects
* Reorder projects

Future:

* Galleries
* Videos

---

# Testimonials Management

Features:

* Create testimonial
* Edit testimonial
* Feature testimonial
* Enable/disable

---

# Team Management

Features:

* Add members
* Edit information
* Manage photos
* Social links

---

# FAQ Management

Features:

* Create questions
* Edit answers
* Categories
* Ordering

---

# Contact Messages

Features:

* View messages
* Mark as read
* Delete messages

Future:

* Reply system

---

# Future Modules

Not included in Version 1:

* Roles & Permissions
* Media Library
* Blog Management
* Analytics
* SEO Manager
* Page Builder

---

# UI Requirements

All admin pages must use:

* Shared forms
* Shared tables
* Shared actions
* Shared validation

Never create page-specific CRUD implementations.

---

# Form Requirements

Every form should support:

* Validation
* Loading state
* Error handling
* Success messages
* Confirmation dialogs

---

# Table Requirements

Tables should support:

* Search
* Sorting
* Pagination
* Status indicators

When applicable.

---

# Design Rules

* Consistent spacing
* Consistent actions
* Theme support
* Mobile responsive

---

# AI Instructions

When implementing admin modules:

1. Reuse existing components.
2. Reuse form controls.
3. Reuse tables.
4. Follow design system.
5. Keep user experience simple.

The admin panel is a content management system, not an ERP.
