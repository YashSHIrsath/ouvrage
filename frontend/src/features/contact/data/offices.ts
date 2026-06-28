export interface OfficeLocation {
  city: string
  country: string
  address: string
  phone: string
  email: string
}

export const OFFICES: OfficeLocation[] = [
  {
    city: 'Dubai',
    country: 'UAE',
    address: 'Level 24, One Central, Sheikh Zayed Road, Dubai 12345',
    phone: '+971 4 000 0000',
    email: 'dubai@buildco.com',
  },
  {
    city: 'London',
    country: 'UK',
    address: '15 Bishopsgate, London EC2N 3AR, United Kingdom',
    phone: '+44 20 0000 0000',
    email: 'london@buildco.com',
  },
  {
    city: 'Sydney',
    country: 'AU',
    address: 'Level 12, 60 Martin Place, Sydney NSW 2000, Australia',
    phone: '+61 2 0000 0000',
    email: 'sydney@buildco.com',
  },
]
