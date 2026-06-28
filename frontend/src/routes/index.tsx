import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { TestimonialsPage } from '@/pages/TestimonialsPage'
import { FaqPage } from '@/pages/FaqPage'
import { ContactPage } from '@/pages/ContactPage'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { SiteSettingsPage } from '@/pages/admin/SiteSettingsPage'
import { ThemeSettingsPage } from '@/pages/admin/ThemeSettingsPage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/testimonials', element: <TestimonialsPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'settings', element: <SiteSettingsPage /> },
      { path: 'theme', element: <ThemeSettingsPage /> },
    ],
  },
])
