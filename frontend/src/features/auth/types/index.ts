export interface AdminUser {
  id: number
  name: string
  email: string
  role: string
  theme_mode: string
  last_login_at: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}
