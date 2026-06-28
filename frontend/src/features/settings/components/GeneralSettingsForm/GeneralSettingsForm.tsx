import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Save } from 'lucide-react'
import { PageHeader }   from '@/components/ui/PageHeader/PageHeader'
import { SectionCard }  from '@/components/ui/SectionCard/SectionCard'
import { AdminButton }  from '@/components/ui/AdminButton/AdminButton'
import { AdminInput, AdminTextarea } from '@/components/forms/admin'
import { UploadInput }  from '@/components/forms/UploadInput/UploadInput'
import { FormRow }      from '@/components/forms/FormRow/FormRow'
import { useGeneralSettings } from '../../hooks/useGeneralSettings'
import type { GeneralSettingsFormValues } from '../../types'
import styles from './GeneralSettingsForm.module.css'

export function GeneralSettingsForm() {
  const { settings, isLoading, save, isSaving } = useGeneralSettings()

  const { control, handleSubmit, reset } = useForm<GeneralSettingsFormValues>({
    defaultValues: {
      company_name: '',
      tagline:      '',
      email:        '',
      phone:        '',
      address:      '',
      logo:         null,
      favicon:      null,
    },
  })

  // Populate the form once settings load (or whenever they change)
  useEffect(() => {
    if (!settings) return
    reset({
      company_name: settings.company_name ?? '',
      tagline:      settings.tagline      ?? '',
      email:        settings.email        ?? '',
      phone:        settings.phone        ?? '',
      address:      settings.address      ?? '',
      logo:         settings.logo_url     ?? null,
      favicon:      settings.favicon_url  ?? null,
    })
  }, [settings, reset])

  const onSubmit = (values: GeneralSettingsFormValues) => save(values)

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>Loading settings…</span>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

      <PageHeader
        title="General Settings"
        description="Company information, contact details, and branding assets."
        actions={
          <AdminButton
            variant="primary"
            htmlType="submit"
            loading={isSaving}
            icon={<Save size={15} />}
          >
            Save Changes
          </AdminButton>
        }
      />

      <div className={styles.sections}>

        {/* ── Company ─────────────────────────────────────── */}
        <SectionCard
          title="Company"
          description="Your company name and public tagline."
        >
          <FormRow>
            <AdminInput<GeneralSettingsFormValues>
              name="company_name"
              control={control}
              label="Company Name"
              placeholder="BuildCo Construction"
              rules={{ required: 'Company name is required.' }}
              required
            />
            <AdminInput<GeneralSettingsFormValues>
              name="tagline"
              control={control}
              label="Tagline"
              placeholder="Building Your Vision…"
            />
          </FormRow>
        </SectionCard>

        {/* ── Contact ─────────────────────────────────────── */}
        <SectionCard
          title="Contact"
          description="Public contact details shown on the website."
        >
          <div className={styles.contactFields}>
            <FormRow>
              <AdminInput<GeneralSettingsFormValues>
                name="email"
                control={control}
                label="Email Address"
                placeholder="info@buildco.com"
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address.',
                  },
                }}
              />
              <AdminInput<GeneralSettingsFormValues>
                name="phone"
                control={control}
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
              />
            </FormRow>
            <AdminTextarea<GeneralSettingsFormValues>
              name="address"
              control={control}
              label="Address"
              placeholder="123 Construction Ave, City, State 00000"
              rows={3}
            />
          </div>
        </SectionCard>

        {/* ── Branding ────────────────────────────────────── */}
        <SectionCard
          title="Branding"
          description="Upload your logo and favicon. Recommended: SVG or PNG with transparent background."
        >
          <FormRow>
            <UploadInput<GeneralSettingsFormValues>
              name="logo"
              control={control}
              label="Logo"
              hint="PNG, SVG, WebP, or JPG · 3:1 ratio (600x200px recommended) · max 2 MB"
              accept="image/png,image/svg+xml,image/webp,image/jpeg"
              maxSizeMb={2}
              cropPreset="logo"
            />
            <UploadInput<GeneralSettingsFormValues>
              name="favicon"
              control={control}
              label="Favicon"
              hint="ICO, PNG, SVG, or JPG · 1:1 ratio (32x32px recommended) · max 512 KB"
              accept="image/x-icon,image/png,image/svg+xml,image/jpeg"
              maxSizeMb={0.5}
              cropPreset="favicon"
            />
          </FormRow>
        </SectionCard>

      </div>

    </form>
  )
}
