export interface Page {
  id: number
  slug: string
  title: string
  nav_label: string | null
  template: 'standard' | 'landing' | 'blank'
  meta_title: string | null
  meta_description: string | null
  is_system: boolean
  show_in_sitemap: boolean
  sort_order: number
  status: 0 | 1 | 9  // 0=draft, 1=published, 9=deleted
}

export type PageFormValues = {
  title: string
  slug: string
  nav_label: string
  template: 'standard' | 'landing' | 'blank'
  meta_title: string
  meta_description: string
  status: 0 | 1
}

export interface NavLinkOptions {
  label: string
  is_navbar: boolean
  is_footer: boolean
}
