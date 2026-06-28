import team01 from '@/assets/images/team/team-01.jpg'
import team02 from '@/assets/images/team/team-02.jpg'
import team03 from '@/assets/images/team/team-03.jpg'
import team04 from '@/assets/images/team/team-04.jpg'

export interface TeamMember {
  name: string
  role: string
  experience: string
  image: string
}

export const TEAM: TeamMember[] = [
  { name: 'Adrian Cole',  role: 'Founder & CEO',       experience: '32 yrs', image: team01 },
  { name: 'Miriam Osei',  role: 'Chief Architect',     experience: '19 yrs', image: team02 },
  { name: 'Tomas Brandt', role: 'Head of Engineering', experience: '24 yrs', image: team03 },
  { name: 'Lena Park',    role: 'Project Director',    experience: '17 yrs', image: team04 },
]
