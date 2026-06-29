import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Save, RotateCcw, AlertTriangle, Lock, CheckCircle2 } from 'lucide-react'
import { Switch } from 'antd'
import { SectionCard, AdminButton } from '@/components/ui'
import { AdminInput, AdminTextarea, AdminSelect } from '@/components/forms/admin'
import { FormRow } from '@/components/forms/FormRow/FormRow'
import type { Page, PageFormValues, NavLinkOptions } from '@/features/pages/types'
import styles from './PageForm.module.css'

interface PageFormProps {
  initialValues: Page | null
  onSubmit: (values: PageFormValues, navLink?: NavLinkOptions) => void
  onDiscard: () => void
  isSaving?: boolean
  onDirtyChange?: (isDirty: boolean) => void
  navAlreadyLinked?: boolean
}

const DEFAULT_VALUES: PageFormValues = {
  title:            '',
  slug:             '',
  nav_label:        '',
  template:         'standard',
  meta_title:       '',
  meta_description: '',
  status:           0,
}

const TEMPLATE_OPTIONS = [
  { label: 'Standard (header + footer)',  value: 'standard' },
  { label: 'Landing (no header/footer)',  value: 'landing'  },
  { label: 'Blank (bare shell)',          value: 'blank'    },
]

const STATUS_OPTIONS = [
  { label: 'Published', value: 1 },
  { label: 'Draft',     value: 0 },
]

export function PageForm({ initialValues, onSubmit, onDiscard, isSaving, onDirtyChange, navAlreadyLinked }: PageFormProps) {
  const defaultValues = useMemo<PageFormValues>(() => {
    if (!initialValues) return DEFAULT_VALUES
    return {
      title:            initialValues.title            ?? '',
      slug:             initialValues.slug             ?? '',
      nav_label:        initialValues.nav_label        ?? '',
      template:         initialValues.template         ?? 'standard',
      meta_title:       initialValues.meta_title       ?? '',
      meta_description: initialValues.meta_description ?? '',
      status:           initialValues.status === 9 ? 0 : (initialValues.status as 0 | 1),
    }
  }, [initialValues])

  const { control, handleSubmit, reset, watch } = useForm<PageFormValues>({ defaultValues })

  const currentValues = watch()

  const isDirty = useMemo(() => (
    currentValues.title            !== defaultValues.title            ||
    currentValues.slug             !== defaultValues.slug             ||
    currentValues.nav_label        !== defaultValues.nav_label        ||
    currentValues.template         !== defaultValues.template         ||
    currentValues.meta_title       !== defaultValues.meta_title       ||
    currentValues.meta_description !== defaultValues.meta_description ||
    Number(currentValues.status)   !== Number(defaultValues.status)
  ), [currentValues, defaultValues])

  useEffect(() => { reset(defaultValues) }, [defaultValues, reset])
  useEffect(() => { onDirtyChange?.(isDirty) }, [isDirty, onDirtyChange])

  // "Add to Navigation" local state — not part of page data, handled separately
  const [navEnabled,   setNavEnabled]   = useState(false)
  const [navLabel,     setNavLabel]     = useState('')
  const [navIsNavbar,  setNavIsNavbar]  = useState(true)
  const [navIsFooter,  setNavIsFooter]  = useState(false)

  if (!initialValues) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyTitle}>No Page Selected</span>
        <span className={styles.emptyHint}>Select a page from the list or create a new one.</span>
      </div>
    )
  }

  const handleFormSubmit = handleSubmit((values) => {
    const navLink: NavLinkOptions | undefined = (!navAlreadyLinked && navEnabled) ? {
      label:      navLabel.trim() || values.nav_label || values.title,
      is_navbar:  navIsNavbar,
      is_footer:  navIsFooter,
    } : undefined
    onSubmit(values, navLink)
  })

  return (
    <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
      {/* ── Sticky action header ── */}
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h2 className={styles.title}>
            {initialValues.title || 'Untitled Page'}
          </h2>
          {isDirty && (
            <div className={styles.unsavedBadge} role="alert">
              <AlertTriangle size={14} className={styles.warnIcon} />
              <span>Unsaved changes</span>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          {isDirty && (
            <AdminButton
              variant="default"
              size="sm"
              icon={<RotateCcw size={14} />}
              onClick={() => { reset(defaultValues); onDiscard() }}
              disabled={isSaving}
            >
              Discard
            </AdminButton>
          )}
          <AdminButton
            variant="primary"
            size="sm"
            htmlType="submit"
            disabled={!isDirty || isSaving}
            loading={isSaving}
            icon={<Save size={14} />}
          >
            Save Changes
          </AdminButton>
        </div>
      </div>

      <div className={styles.sections}>
        {/* System page notice */}
        {initialValues.is_system && (
          <div className={styles.systemNotice}>
            <Lock size={14} className={styles.lockIcon} />
            <span>
              <strong>System page</strong> — The slug is locked and this page cannot be deleted.
              All other fields can be edited freely.
            </span>
          </div>
        )}

        {/* ── Page Identity ── */}
        <SectionCard title="Page Identity" description="Core page identifiers used across the site.">
          <FormRow cols={2}>
            <AdminInput<PageFormValues>
              name="title"
              control={control}
              label="Title"
              placeholder="e.g. About Us"
              rules={{ required: 'Title is required.' }}
              required
            />
            <AdminInput<PageFormValues>
              name="slug"
              control={control}
              label="Slug"
              placeholder="e.g. about-us"
              disabled={initialValues.is_system}
              hint={initialValues.is_system ? 'Locked for system pages' : 'URL path segment — changing this breaks existing links'}
            />
          </FormRow>
        </SectionCard>

        {/* ── Navigation ── */}
        <SectionCard title="Navigation" description="How this page appears in the nav builder.">
          <FormRow cols={2}>
            <AdminInput<PageFormValues>
              name="nav_label"
              control={control}
              label="Nav Label"
              placeholder="e.g. About (overrides Title in nav)"
            />
            <AdminSelect<PageFormValues>
              name="template"
              control={control}
              label="Template"
              options={TEMPLATE_OPTIONS}
              required
            />
          </FormRow>
        </SectionCard>

        {/* ── Publication ── */}
        <SectionCard title="Publication" description="Control whether this page is live on the public site.">
          <FormRow cols={1}>
            <AdminSelect<PageFormValues>
              name="status"
              control={control}
              label="Status"
              options={STATUS_OPTIONS}
              required
            />
          </FormRow>
        </SectionCard>

        {/* ── SEO ── */}
        <SectionCard title="SEO" description="Override meta tags shown in search results.">
          <AdminInput<PageFormValues>
            name="meta_title"
            control={control}
            label="Meta Title"
            placeholder="Leave blank to inherit page title"
          />
          <AdminTextarea<PageFormValues>
            name="meta_description"
            control={control}
            label="Meta Description"
            placeholder="Short description for search engines (150–160 chars recommended)"
            rows={3}
          />
        </SectionCard>

        {/* ── Add to Navigation ── */}
        <SectionCard title="Add to Navigation" description="Create a header/footer link pointing to this page.">
          {navAlreadyLinked ? (
            <div className={styles.navLinkedNotice}>
              <CheckCircle2 size={14} className={styles.navLinkedIcon} />
              <span>This page already has a navigation link. Manage it in <strong>Website → Navigation</strong>.</span>
            </div>
          ) : (
            <div className={styles.navSection}>
              <label className={styles.navToggleRow}>
                <Switch
                  size="small"
                  checked={navEnabled}
                  onChange={setNavEnabled}
                  disabled={isSaving}
                />
                <span className={styles.navToggleLabel}>Add a navigation link on save</span>
              </label>

              {navEnabled && (
                <div className={styles.navOptions}>
                  <div className={styles.navLabelRow}>
                    <label className={styles.navFieldLabel}>Nav Label</label>
                    <input
                      className={styles.navLabelInput}
                      value={navLabel}
                      onChange={e => setNavLabel(e.target.value)}
                      placeholder={currentValues.nav_label || currentValues.title || 'Label in navigation'}
                    />
                  </div>
                  <div className={styles.navCheckboxes}>
                    <label className={styles.navCheckbox}>
                      <input type="checkbox" checked={navIsNavbar} onChange={e => setNavIsNavbar(e.target.checked)} />
                      Show in header navbar
                    </label>
                    <label className={styles.navCheckbox}>
                      <input type="checkbox" checked={navIsFooter} onChange={e => setNavIsFooter(e.target.checked)} />
                      Show in footer
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </SectionCard>
      </div>
    </form>
  )
}
