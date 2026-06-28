import project01 from '@/assets/images/project-01.jpg'
import project02 from '@/assets/images/project-02.jpg'
import project03 from '@/assets/images/project-03.jpg'
import project04 from '@/assets/images/project-04.jpg'

export interface Project {
  id: string
  title: string
  location: string
  year: string
  type: string
  area: string
  image: string
}

export const PROJECTS: Project[] = [
  {
    id: '001',
    title: 'Meridian Tower',
    location: 'Dubai, UAE',
    year: '2024',
    type: 'Commercial High-Rise',
    area: '84,000 m²',
    image: project01,
  },
  {
    id: '002',
    title: 'Harlow Quarter',
    location: 'London, UK',
    year: '2023',
    type: 'Mixed-Use Development',
    area: '32,000 m²',
    image: project02,
  },
  {
    id: '003',
    title: 'Vantage Residences',
    location: 'Sydney, AU',
    year: '2023',
    type: 'Luxury Residential',
    area: '18,500 m²',
    image: project03,
  },
  {
    id: '004',
    title: 'Sorell Industrial Park',
    location: 'Amsterdam, NL',
    year: '2022',
    type: 'Industrial Campus',
    area: '62,000 m²',
    image: project04,
  },
]
