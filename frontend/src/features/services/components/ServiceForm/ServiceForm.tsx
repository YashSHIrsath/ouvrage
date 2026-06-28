import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Save, RotateCcw, AlertTriangle } from 'lucide-react'
import { SectionCard, AdminButton } from '@/components/ui'
import { AdminInput, AdminTextarea, AdminSelect } from '@/components/forms/admin'
import { UploadInput } from '@/components/forms/UploadInput/UploadInput'
import { FormRow } from '@/components/forms/FormRow/FormRow'
import type { Service, ServiceFormValues } from '../../types'
import styles from './ServiceForm.module.css'

interface ServiceFormProps {
  initialValues: Service | null
  onSubmit: (values: ServiceFormValues) => void
  onDiscard: () => void
  isSaving?: boolean
  onDirtyChange?: (isDirty: boolean) => void
}

const DEFAULT_VALUES: ServiceFormValues = {
  title: '',
  subtitle: '',
  short_description: '',
  long_description: '',
  image: null,
  icon: 'Briefcase',
  sort_order: 0,
  status: 1,
}

export function ServiceForm({ initialValues, onSubmit, onDiscard, isSaving, onDirtyChange }: ServiceFormProps) {
  const defaultValues = useMemo(() => {
    if (!initialValues) return DEFAULT_VALUES
    return {
      title: initialValues.title ?? '',
      subtitle: initialValues.subtitle ?? '',
      short_description: initialValues.short_description ?? '',
      long_description: initialValues.long_description ?? '',
      image: initialValues.image ?? null,
      icon: initialValues.icon ?? 'Briefcase',
      sort_order: initialValues.sort_order ?? 0,
      status: initialValues.status ?? 1,
    }
  }, [initialValues])

  const { control, handleSubmit, reset, watch, setValue } = useForm<ServiceFormValues>({
    defaultValues,
  })

  // Watch fields to compute custom dirty state
  const currentValues = watch()
  
  const isDirty = useMemo(() => {
    return (
      currentValues.title !== defaultValues.title ||
      currentValues.subtitle !== defaultValues.subtitle ||
      currentValues.short_description !== defaultValues.short_description ||
      currentValues.long_description !== defaultValues.long_description ||
      currentValues.image !== defaultValues.image ||
      currentValues.icon !== defaultValues.icon ||
      Number(currentValues.sort_order) !== Number(defaultValues.sort_order) ||
      Number(currentValues.status) !== Number(defaultValues.status)
    )
  }, [currentValues, defaultValues])

  // Reset form when initialValues changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  // Propagate dirty state to parent
  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  const handleFormSubmit = (data: ServiceFormValues) => {
    onSubmit(data)
  }

  const handleDiscardClick = () => {
    reset(defaultValues)
    onDiscard()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form} noValidate>
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h2 className={styles.title}>
            {initialValues ? `Edit: ${initialValues.title || 'Untitled'}` : 'New Service'}
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
              onClick={handleDiscardClick}
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
        <SectionCard title="General Details" description="Configure basic service identification.">
          <FormRow>
            <AdminInput<ServiceFormValues>
              name="title"
              control={control}
              label="Service Title"
              placeholder="e.g. Building Construction"
              rules={{ required: 'Title is required.' }}
              required
            />
            <AdminInput<ServiceFormValues>
              name="subtitle"
              control={control}
              label="Subtitle"
              placeholder="e.g. Turnkey engineering & delivery"
            />
          </FormRow>
          <FormRow>
            <AdminInput<ServiceFormValues>
              name="icon"
              control={control}
              label="Icon (Lucide Name)"
              placeholder="e.g. Briefcase, Hammer, Grid"
            />
            <AdminSelect<ServiceFormValues>
              name="status"
              control={control}
              label="Status"
              options={[
                { label: 'Active', value: 1 },
                { label: 'Inactive', value: 0 },
              ]}
              required
            />
          </FormRow>
        </SectionCard>

        <SectionCard title="Descriptions" description="Information displayed on the website.">
          <AdminTextarea<ServiceFormValues>
            name="short_description"
            control={control}
            label="Short Description"
            placeholder="A brief summary for previews & lists..."
            rows={2}
          />
          <AdminTextarea<ServiceFormValues>
            name="long_description"
            control={control}
            label="Detailed Description"
            placeholder="Full service overview for expanded accordion..."
            rows={5}
          />
        </SectionCard>

        <SectionCard title="Branding Media" description="Service thumbnail and visualization image.">
          <UploadInput<ServiceFormValues>
            name="image"
            control={control}
            label="Service Thumbnail"
            hint="PNG, JPG, or WEBP · 1:1 ratio (1200x1200px recommended) · max 5 MB"
            accept="image/png,image/jpeg,image/webp"
            maxSizeMb={5}
            cropPreset="service"
            setValue={setValue}
          />
        </SectionCard>
      </div>
    </form>
  )
}
