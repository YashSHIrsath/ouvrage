<?php

namespace Database\Seeders;

use App\Models\NavItem;
use App\Models\Page;
use Illuminate\Database\Seeder;

class NavItemSeeder extends Seeder
{
    public function run(): void
    {
        // Resolve page IDs by slug for the optional FK
        $pageIds = Page::whereIn('slug', ['home', 'about', 'services', 'projects', 'testimonials', 'faq', 'contact'])
            ->pluck('id', 'slug');

        // Mirrors current navLinks.ts exactly, plus footer visibility matching current Footer.tsx
        $items = [
            [
                'slug'       => 'home',
                'label'      => 'Home',
                'href'       => '/',
                'is_navbar'  => true,
                'is_footer'  => true,
                'sort_order' => 1,
            ],
            [
                'slug'       => 'about',
                'label'      => 'About',
                'href'       => '/about',
                'is_navbar'  => true,
                'is_footer'  => true,
                'sort_order' => 2,
            ],
            [
                'slug'       => 'services',
                'label'      => 'Services',
                'href'       => '/services',
                'is_navbar'  => true,
                'is_footer'  => true,
                'sort_order' => 3,
            ],
            [
                'slug'       => 'projects',
                'label'      => 'Projects',
                'href'       => '/projects',
                'is_navbar'  => true,
                'is_footer'  => true,
                'sort_order' => 4,
            ],
            [
                'slug'       => 'testimonials',
                'label'      => 'Testimonials',
                'href'       => '/testimonials',
                'is_navbar'  => true,
                'is_footer'  => false, // not in footer column in current Footer.tsx
                'sort_order' => 5,
            ],
            [
                'slug'       => 'faq',
                'label'      => 'FAQ',
                'href'       => '/faq',
                'is_navbar'  => true,
                'is_footer'  => true,
                'sort_order' => 6,
            ],
            [
                'slug'       => 'contact',
                'label'      => 'Contact',
                'href'       => '/contact',
                'is_navbar'  => true,
                'is_footer'  => true,
                'sort_order' => 7,
            ],
        ];

        foreach ($items as $item) {
            NavItem::firstOrCreate(
                ['href' => $item['href']],
                [
                    'page_id'    => $pageIds[$item['slug']] ?? null,
                    'label'      => $item['label'],
                    'href'       => $item['href'],
                    'type'       => 'page',
                    'is_navbar'  => $item['is_navbar'],
                    'is_footer'  => $item['is_footer'],
                    'sort_order' => $item['sort_order'],
                    'status'     => 1,
                ]
            );
        }
    }
}
