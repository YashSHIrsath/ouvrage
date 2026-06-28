export interface GeneralSettings {
  company_name: string | null
  tagline:      string | null
  email:        string | null
  phone:        string | null
  address:      string | null
  logo_url:     string | null
  favicon_url:  string | null
}

// Shape of the react-hook-form values.
// logo / favicon hold: existing URL (string), new File, or null (removed).
export interface GeneralSettingsFormValues {
  company_name: string
  tagline:      string
  email:        string
  phone:        string
  address:      string
  logo:         string | File | null
  favicon:      string | File | null
}
