export interface Service {
  num: string
  title: string
  subtitle: string
  description: string
  tags: string[]
}

export const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Building Construction',
    subtitle: 'Residential · Commercial · Industrial',
    description:
      'From foundation to final finish — we execute complex builds with precision engineering, rigorous quality controls, and deep structural expertise across residential, commercial, and industrial typologies.',
    tags: ['Residential', 'Commercial', 'High-Rise', 'Industrial', 'Mixed-Use'],
  },
  {
    num: '02',
    title: 'Land Development',
    subtitle: 'Acquisition · Master Planning · Infrastructure',
    description:
      'Strategic land acquisition, feasibility analysis, and master planning that transforms raw parcels into high-value developments. We navigate zoning, environmental compliance, and full infrastructure design.',
    tags: ['Site Analysis', 'Master Planning', 'Infrastructure', 'Zoning & Permits'],
  },
  {
    num: '03',
    title: 'Architecture',
    subtitle: 'Design · Documentation · Interiors',
    description:
      'Design that balances aesthetic ambition with functional precision. Our architectural practice operates at the intersection of form, material, and human experience — producing buildings that endure.',
    tags: ['Concept Design', 'Schematic', 'Construction Docs', 'Interior Architecture'],
  },
  {
    num: '04',
    title: 'Project Management',
    subtitle: 'Scheduling · Cost Control · Oversight',
    description:
      'End-to-end program management that keeps complex, multi-stakeholder projects on schedule and on budget. Real-time reporting, proactive risk management, and decisive leadership at every milestone.',
    tags: ['Scheduling', 'Cost Control', 'Risk Management', 'Stakeholder Reporting'],
  },
  {
    num: '05',
    title: 'Engineering Consultation',
    subtitle: 'Structural · Civil · MEP',
    description:
      'Deep engineering expertise available as standalone consultation or fully integrated within project delivery. We solve the hard problems early — before they become costly delays on site.',
    tags: ['Structural Engineering', 'Civil Works', 'MEP Systems', 'Geotechnical'],
  },
]
