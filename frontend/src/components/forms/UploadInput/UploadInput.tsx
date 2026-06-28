import { useRef, useEffect, useCallback, useState } from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Upload, X, ImageIcon } from 'lucide-react'
import { Label } from '@/components/typography'
import { cn } from '@/utils'
import { ImageCropperModal } from '@/components/ui'
import styles from './UploadInput.module.css'

export const IMAGE_PRESETS = {
  service: { aspect: 1 / 1, width: 1200, height: 1200 },
  project: { aspect: 16 / 9, width: 1920, height: 1080 },
  team: { aspect: 1 / 1, width: 800, height: 800 },
  hero: { aspect: 21 / 9, width: 2560, height: 1097 },
  logo: { aspect: 3 / 1, width: 600, height: 200 },
  favicon: { aspect: 1 / 1, width: 64, height: 64 },
} as const

interface UploadInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  required?: boolean
  hint?: string
  accept?: string
  maxSizeMb?: number
  className?: string
  rules?: RegisterOptions<T>
  cropPreset?: keyof typeof IMAGE_PRESETS
  setValue?: any
}

interface UploadAreaProps {
  value: string | File | null | undefined
  onChange: (value: File | null) => void
  accept: string
  maxSizeMb: number
  disabled?: boolean
  error?: string
  cropPreset?: keyof typeof IMAGE_PRESETS
  onSelectRaw?: (file: File | null) => void
}

function UploadArea({
  value,
  onChange,
  accept,
  maxSizeMb,
  error,
  cropPreset,
  onSelectRaw,
}: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const previewUrl = useRef<string | null>(null)

  // Local state for raw file cropping flow
  const [rawFileSrc, setRawFileSrc] = useState<string | null>(null)
  const [rawFileObject, setRawFileObject] = useState<File | null>(null)

  // Build preview URL from File object; revoke previous on change
  let displayUrl: string | null = null
  if (typeof value === 'string' && value) {
    displayUrl = value
  } else if (value instanceof File) {
    previewUrl.current = URL.createObjectURL(value)
    displayUrl = previewUrl.current
  }

  useEffect(() => {
    return () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    }
  }, [])

  const handleSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (file.size > maxSizeMb * 1024 * 1024) {
      alert(`File must be smaller than ${maxSizeMb}MB.`)
      return
    }

    if (cropPreset) {
      const url = URL.createObjectURL(file)
      setRawFileSrc(url)
      setRawFileObject(file)
    } else {
      onChange(file)
    }
  }, [onChange, maxSizeMb, cropPreset])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    handleSelect(e.dataTransfer.files)
  }, [handleSelect])

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const handleCropperSave = (croppedFile: File) => {
    onChange(croppedFile)
    
    if (onSelectRaw && rawFileObject) {
      onSelectRaw(rawFileObject)
    }

    if (rawFileSrc) {
      URL.revokeObjectURL(rawFileSrc)
    }
    setRawFileSrc(null)
    setRawFileObject(null)
  }

  const handleCropperClose = () => {
    if (rawFileSrc) {
      URL.revokeObjectURL(rawFileSrc)
    }
    setRawFileSrc(null)
    setRawFileObject(null)
  }

  const handleRemove = () => {
    onChange(null)
    if (onSelectRaw) {
      onSelectRaw(null)
    }
  }

  const preset = cropPreset ? IMAGE_PRESETS[cropPreset] : null

  return (
    <div className={cn(styles.uploadArea, error && styles.hasError, displayUrl && styles.hasImage)}>
      {displayUrl ? (
        <div className={styles.preview}>
          <img src={displayUrl} alt="Preview" className={styles.previewImg} />
          <div className={styles.previewOverlay}>
            <button
              type="button"
              className={styles.changeBtn}
              onClick={() => inputRef.current?.click()}
              aria-label="Change image"
            >
              <Upload size={14} />
              Change
            </button>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.zone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          aria-label="Upload image"
        >
          <ImageIcon size={28} className={styles.zoneIcon} />
          <span className={styles.zoneText}>
            <span className={styles.zoneCta}>Click to upload</span>
            {' '}or drag and drop
          </span>
          <span className={styles.zoneHint}>
            PNG, JPG, SVG, WEBP · max {maxSizeMb}MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={styles.hiddenInput}
        onChange={(e) => handleSelect(e.target.files)}
        tabIndex={-1}
        aria-hidden="true"
      />

      {rawFileSrc && preset && (
        <ImageCropperModal
          imageSrc={rawFileSrc}
          aspect={preset.aspect}
          targetWidth={preset.width}
          targetHeight={preset.height}
          onClose={handleCropperClose}
          onSave={handleCropperSave}
        />
      )}
    </div>
  )
}

export function UploadInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  hint,
  accept = 'image/*',
  maxSizeMb = 5,
  className,
  rules,
  cropPreset,
  setValue,
}: UploadInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState }) => (
        <div className={cn(styles.field, className)}>
          {label && (
            <Label htmlFor={String(name)} required={required}>
              {label}
            </Label>
          )}
          <UploadArea
            value={value as string | File | null}
            onChange={onChange}
            accept={accept}
            maxSizeMb={maxSizeMb}
            error={fieldState.error?.message}
            cropPreset={cropPreset}
            onSelectRaw={(rawFile) => {
              if (setValue) {
                setValue(`${String(name)}_original` as any, rawFile)
              }
            }}
          />
          {fieldState.error ? (
            <span className={styles.error}>{fieldState.error.message}</span>
          ) : hint ? (
            <span className={styles.hint}>{hint}</span>
          ) : null}
        </div>
      )}
    />
  )
}
