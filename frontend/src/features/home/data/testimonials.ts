export interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Structura didn't just build our headquarters — they built confidence. Every deadline met, every detail considered. The result is a building our people are genuinely proud to work in.",
    name: 'Marcus Holt',
    role: 'CEO, Vektor Capital',
    initials: 'MH',
  },
  {
    quote:
      'When we hit a challenging soil condition mid-project, their engineering team had a solution on paper within 48 hours and implemented it without a single day of delay. That\'s the caliber we needed.',
    name: 'Dr. Sarah Brennan',
    role: 'Director of Estates, Northfield University',
    initials: 'SB',
  },
  {
    quote:
      'A rare combination: architectural vision and construction muscle under one roof. Our mixed-use development came in 12% under budget and three weeks ahead of schedule.',
    name: 'James Okubo',
    role: 'Managing Partner, Ashfield Property Group',
    initials: 'JO',
  },
]
