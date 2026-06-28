export type ThemeMode = 'light' | 'dark' | 'custom'

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T = unknown> {
  success: boolean
  message: string
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export type RecordStatus = 1 | 0 | 9
