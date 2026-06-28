# FORM COMPONENT SYSTEM

## Purpose

All forms must use shared reusable components.

No page may directly use Ant Design inputs.

Pages must use application components.

---

# Base Components

TextInput
TextareaInput
EmailInput
PasswordInput
PhoneInput
NumberInput
DateInput
SelectInput
MultiSelectInput
CheckboxInput
RadioInput
SwitchInput
ColorInput
UploadInput

---

# Layout Components

FormSection
FormRow
FormGroup
FieldLabel
FieldHint
FieldError

---

# Component Requirements

Every field must support:

* label
* placeholder
* required
* disabled
* readonly
* help text
* error message
* size
* loading

---

# Theme Support

All fields must automatically support:

* Light mode
* Dark mode
* Custom themes

No field may hardcode:

* Colors
* Border radius
* Shadows

---

# Validation

All validation handled by:

* React Hook Form
* Zod

---

# Example

TextInput

Props:

* name
* label
* placeholder
* required
* disabled
* hint
* size

---

# Benefits

* Consistent UI.
* Faster development.
* Easier maintenance.
* Theme support.
* Reusability.

---

# Rules

❌ Direct Ant Input usage.

❌ Inline form styling.

❌ Page-specific inputs.

✅ Shared components only.

Example:

Bad:

<Input />

Good:

<TextInput />
