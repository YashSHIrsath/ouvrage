import { useState, useRef, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form'
import styles from './TagInput.module.css'

interface TagInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  separator?: string
  required?: boolean
}

export function TagInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Type and press Enter...',
  separator = ' · ',
  required,
}: TagInputProps<T>) {
  const { field } = useController({ name, control })
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Parse the stored string value into an array of tags
  const tags: string[] = field.value
    ? String(field.value)
        .split(/\s*[·•,]\s*/)
        .map((t: string) => t.trim())
        .filter(Boolean)
    : []

  const updateValue = (newTags: string[]) => {
    field.onChange(newTags.join(separator))
  }

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag) return
    if (tags.some((t) => t.toLowerCase() === tag.toLowerCase())) return
    updateValue([...tags, tag])
    setInputValue('')
  }

  const removeTag = (index: number) => {
    updateValue(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <div
        className={styles.container}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span key={`${tag}-${i}`} className={styles.tag}>
            <span className={styles.tagText}>{tag}</span>
            <button
              type="button"
              className={styles.tagRemove}
              onClick={(e) => {
                e.stopPropagation()
                removeTag(i)
              }}
              aria-label={`Remove ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={tags.length === 0 ? placeholder : ''}
        />
      </div>
      <span className={styles.hint}>Press Enter or comma to add</span>
    </div>
  )
}
