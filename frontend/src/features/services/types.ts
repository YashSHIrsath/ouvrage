export interface Service {
  id: string | number
  title: string
  subtitle: string
  short_description: string
  long_description: string
  image: File | string | null
  image_url?: string | null
  image_original_url?: string | null
  icon: string
  sort_order: number
  status: 1 | 0 | 9 // 1 = active, 0 = inactive, 9 = deleted
}

export type ServiceFormValues = Omit<Service, 'id'>
