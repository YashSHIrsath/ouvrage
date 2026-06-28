import { useNavigate } from 'react-router-dom'
import { Briefcase, FolderOpen, Quote, Users, HelpCircle, Mail } from 'lucide-react'
import { PageHeader, SectionCard, AdminButton } from '@/components/ui'
import styles from './WebsitePage.module.css'

export function WebsitePage() {
  const navigate = useNavigate()

  const modules = [
    {
      id: 'services',
      title: 'Services',
      description: 'Manage website services.',
      count: '5 entries',
      icon: Briefcase,
      path: '/admin/website/services',
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Manage portfolio projects.',
      count: '4 entries',
      icon: FolderOpen,
      path: '/admin/website/projects',
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      description: 'Manage client testimonials.',
      count: '3 entries',
      icon: Quote,
      path: '/admin/website/testimonials',
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Manage leadership team members.',
      count: '4 entries',
      icon: Users,
      path: '/admin/website/team',
    },
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Manage frequently asked questions.',
      count: '6 entries',
      icon: HelpCircle,
      path: '/admin/website/faq',
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'View contact form submissions.',
      count: '0 messages',
      icon: Mail,
      path: '/admin/forms',
    },
  ]

  return (
    <div className={styles.page}>
      <PageHeader
        title="Website"
        description="Manage services, projects, testimonials, team, FAQ, and contact messages."
      />
      <div className={styles.grid}>
        {modules.map((m) => {
          const Icon = m.icon
          return (
            <SectionCard
              key={m.id}
              title={m.title}
              description={m.description}
              actions={<Icon className={styles.cardIcon} size={20} />}
              className={styles.card}
            >
              <div className={styles.cardFooter}>
                <span className={styles.countText}>{m.count}</span>
                <AdminButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(m.path)}
                >
                  Manage
                </AdminButton>
              </div>
            </SectionCard>
          )
        })}
      </div>
    </div>
  )
}
