<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'slug'             => 'home',
                'title'            => 'Home',
                'nav_label'        => 'Home',
                'template'         => 'standard',
                'meta_title'       => 'BuildCo — Engineering Excellence Since 1996',
                'meta_description' => 'BuildCo delivers landmark construction projects and trusted engineering solutions across residential, commercial, and industrial sectors.',
                'is_system'        => true,
                'show_in_sitemap'  => true,
                'sort_order'       => 1,
                'status'           => 1,
            ],
            [
                'slug'             => 'about',
                'title'            => 'About',
                'nav_label'        => 'About',
                'template'         => 'standard',
                'meta_title'       => 'About BuildCo — Our Story, Mission & Team',
                'meta_description' => 'Learn about BuildCo\'s history, mission, values, and the team behind our construction projects.',
                'is_system'        => false,
                'show_in_sitemap'  => true,
                'sort_order'       => 2,
                'status'           => 1,
            ],
            [
                'slug'             => 'services',
                'title'            => 'Services',
                'nav_label'        => 'Services',
                'template'         => 'standard',
                'meta_title'       => 'Construction Services — BuildCo',
                'meta_description' => 'Explore BuildCo\'s full range of construction, renovation, and project management services.',
                'is_system'        => false,
                'show_in_sitemap'  => true,
                'sort_order'       => 3,
                'status'           => 1,
            ],
            [
                'slug'             => 'projects',
                'title'            => 'Projects',
                'nav_label'        => 'Projects',
                'template'         => 'standard',
                'meta_title'       => 'Portfolio — BuildCo Projects',
                'meta_description' => 'Browse BuildCo\'s portfolio of completed construction projects across Dubai, London, and Sydney.',
                'is_system'        => false,
                'show_in_sitemap'  => true,
                'sort_order'       => 4,
                'status'           => 1,
            ],
            [
                'slug'             => 'testimonials',
                'title'            => 'Testimonials',
                'nav_label'        => 'Testimonials',
                'template'         => 'standard',
                'meta_title'       => 'Client Testimonials — BuildCo',
                'meta_description' => 'Read what BuildCo clients say about our construction services and project delivery.',
                'is_system'        => false,
                'show_in_sitemap'  => true,
                'sort_order'       => 5,
                'status'           => 1,
            ],
            [
                'slug'             => 'faq',
                'title'            => 'FAQ',
                'nav_label'        => 'FAQ',
                'template'         => 'standard',
                'meta_title'       => 'Frequently Asked Questions — BuildCo',
                'meta_description' => 'Answers to common questions about BuildCo\'s construction services, process, and timelines.',
                'is_system'        => false,
                'show_in_sitemap'  => true,
                'sort_order'       => 6,
                'status'           => 1,
            ],
            [
                'slug'             => 'contact',
                'title'            => 'Contact',
                'nav_label'        => 'Contact',
                'template'         => 'standard',
                'meta_title'       => 'Contact BuildCo — Get a Quote',
                'meta_description' => 'Get in touch with BuildCo to discuss your construction project or request a quote.',
                'is_system'        => false,
                'show_in_sitemap'  => true,
                'sort_order'       => 7,
                'status'           => 1,
            ],
        ];

        foreach ($pages as $pageData) {
            Page::firstOrCreate(['slug' => $pageData['slug']], $pageData);
        }
    }
}
