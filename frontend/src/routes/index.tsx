import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout'
import { WebsiteLayout } from '@/layouts/WebsiteLayout/WebsiteLayout'
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
import { DynamicPage } from '@/pages/DynamicPage'
import { LoginPage } from '@/pages/portal/LoginPage'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { FormsPage } from '@/pages/admin/FormsPage'
import { SiteSettingsPage } from '@/pages/admin/SiteSettingsPage'
import { PageSettingsPage } from '@/pages/admin/website/PageSettingsPage'
import { ServicesPage as AdminServicesPage } from '@/pages/admin/services/ServicesPage'
import { NavigationPage } from '@/pages/admin/website/navigation/NavigationPage'
import { PagesPage } from '@/pages/admin/website/pages/PagesPage'

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
          { path: '/:slug',         element: <DynamicPage />     },
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
              { index: true, element: <DashboardPage /> },

              // ── Website module — all children share the CMS nav ──────────
              {
                path: 'website',
                element: <WebsiteLayout />,
                children: [
                  { index: true, element: <Navigate to="home" replace /> },

                  // Page settings (each tab shows that page's settings form)
                  { path: 'home',         element: <PageSettingsPage slug="home"         /> },
                  { path: 'about',        element: <PageSettingsPage slug="about"        /> },
                  { path: 'services',     element: <AdminServicesPage />                    },
                  { path: 'projects',     element: <PageSettingsPage slug="projects"     /> },
                  { path: 'testimonials', element: <PageSettingsPage slug="testimonials" /> },
                  { path: 'faq',          element: <PageSettingsPage slug="faq"          /> },
                  { path: 'contact',      element: <PageSettingsPage slug="contact"      /> },

                  // Website tools
                  { path: 'navigation',   element: <NavigationPage /> },
                  { path: 'pages',        element: <PagesPage />      },
                ],
              },

              { path: 'forms',    element: <FormsPage />        },
              { path: 'settings', element: <SiteSettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
])
