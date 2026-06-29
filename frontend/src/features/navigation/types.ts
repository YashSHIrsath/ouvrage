export interface NavItem {
  id: number
  page_id: number | null
  label: string
  href: string
  type: 'page' | 'external'
  is_navbar: boolean
  is_footer: boolean
  sort_order: number
  status: 1 | 0 | 9
}

export type NavItemFormValues = Pick<
  NavItem,
  'label' | 'href' | 'type' | 'page_id' | 'is_navbar' | 'is_footer' | 'status'
>
