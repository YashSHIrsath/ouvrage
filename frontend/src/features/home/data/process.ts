export interface ProcessStep {
  num: string
  phase: string
  time: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    phase: 'Discovery',
    time: 'Weeks 1–3',
    description:
      'Site analysis, feasibility study, stakeholder alignment, scope definition, and initial risk assessment.',
  },
  {
    num: '02',
    phase: 'Design',
    time: 'Weeks 4–16',
    description:
      'Concept development, schematic design, engineering coordination, and full permit documentation.',
  },
  {
    num: '03',
    phase: 'Pre-Construction',
    time: 'Weeks 17–24',
    description:
      'Procurement strategy, contractor selection, value engineering, and detailed scheduling.',
  },
  {
    num: '04',
    phase: 'Construction',
    time: 'Phase-Dependent',
    description:
      'Site mobilization, phased execution, quality control inspections, and live progress reporting.',
  },
  {
    num: '05',
    phase: 'Delivery',
    time: 'Final Phase',
    description:
      'Commissioning, handover documentation, defect management, and post-occupancy review.',
  },
]
