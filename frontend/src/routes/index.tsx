import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { AuthInit } from './AuthInit'
import { RequireAuth } from './RequireAuth'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { TestimonialsPage } from '@/pages/TestimonialsPage'
import { FaqPage } from '@/pages/FaqPage'
import { ContactPage } from '@/pages/ContactPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { LoginPage } from '@/pages/portal/LoginPage'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { WebsitePage } from '@/pages/admin/WebsitePage'
import { FormsPage } from '@/pages/admin/FormsPage'
import { SiteSettingsPage } from '@/pages/admin/SiteSettingsPage'
import { ServicesPage as AdminServicesPage } from '@/pages/admin/services/ServicesPage'


export const router = createBrowserRouter([
  {
    element: <AuthInit />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: '/',              element: <HomePage />        },
          { path: '/about',         element: <AboutPage />       },
          { path: '/services',      element: <ServicesPage />    },
          { path: '/projects',      element: <ProjectsPage />    },
          { path: '/testimonials',  element: <TestimonialsPage /> },
          { path: '/faq',           element: <FaqPage />         },
          { path: '/contact',       element: <ContactPage />     },
          { path: '*',              element: <NotFoundPage />    },
        ],
      },
      {
        path: '/portal/login',
        element: <LoginPage />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/admin',
            element: <AdminLayout />,
            children: [
              { index: true,           element: <DashboardPage />    },
              { path: 'website',       element: <WebsitePage />      },
              { path: 'website/services', element: <AdminServicesPage /> },
              { path: 'forms',         element: <FormsPage />        },
              { path: 'settings',      element: <SiteSettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
])
