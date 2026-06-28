# THEME SYSTEM

## Purpose

The entire application must support dynamic themes.

No colors may be hardcoded.

---

# Theme Modes

1. Light
2. Dark
3. Custom

---

# Theme Variables

Primary Color
Secondary Color
Background Color
Surface Color
Text Color
Border Color

---

# Typography Variables

Font Family
Heading Weight
Body Weight

---

# Shape Variables

Border Radius
Button Radius
Card Radius

---

# Shadow Variables

Card Shadow
Modal Shadow
Drawer Shadow

---

# Theme Storage

Theme settings are stored in:

theme_settings

Fields:

* mode
* primary_color
* secondary_color
* background_color
* surface_color
* text_color
* border_radius
* font_family

---

# Components Must Use

theme.token.primary
theme.token.background
theme.token.text

Never:

* #000000
* #ffffff
* rgb values

---

# Theme Requirements

All components must automatically support:

* Light theme
* Dark theme
* Custom theme

---

# Administrator Features

* Select theme mode.
* Pick colors.
* Change radius.
* Preview changes.

---

# Rules

❌ Hardcoded colors.

❌ Page-specific themes.

❌ Inline colors.

✅ Theme tokens only.

