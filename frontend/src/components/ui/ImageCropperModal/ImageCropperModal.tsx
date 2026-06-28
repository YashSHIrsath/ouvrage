import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { Modal, AdminButton } from '@/components/ui'
import { getCroppedImg } from '@/utils/cropImage'
import styles from './ImageCropperModal.module.css'

interface ImageCropperModalProps {
  imageSrc: string
  aspect: number
  targetWidth: number
  targetHeight: number
  onClose: () => void
  onSave: (croppedFile: File) => void
}

export function ImageCropperModal({
  imageSrc,
  aspect,
  targetWidth,
  targetHeight,
  onClose,
  onSave,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isCropping, setIsCropping] = useState(false)

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = async () => {
    if (!croppedAreaPixels) return

    try {
      setIsCropping(true)
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        targetWidth,
        targetHeight
      )
      onSave(croppedFile)
    } catch (e) {
      console.error(e)
      alert('Unable to crop image. Please check format.')
    } finally {
      setIsCropping(false)
    }
  }

  return (
    <Modal
      open={true}
      title="Adjust Image Crop"
      onClose={onClose}
      size="lg"
      footer={
        <div className={styles.modalFooter}>
          <AdminButton variant="default" onClick={onClose} disabled={isCropping}>
            Cancel
          </AdminButton>
          <AdminButton variant="primary" onClick={handleSave} loading={isCropping}>
            Apply Crop
          </AdminButton>
        </div>
      }
    >
      <div className={styles.cropperContainer}>
        <div className={styles.cropArea}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className={styles.sliderContainer}>
          <label htmlFor="zoom-slider" className={styles.sliderLabel}>Zoom</label>
          <input
            id="zoom-slider"
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="zoom-slider"
            onChange={(e) => setZoom(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>
    </Modal>
  )
}
