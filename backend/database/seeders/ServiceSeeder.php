<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title'             => 'Building Construction',
                'subtitle'          => 'Residential · Commercial · Industrial',
                'short_description' => 'From foundation to final finish — we execute complex builds with precision engineering, rigorous quality controls, and deep structural expertise.',
                'long_description'  => 'From foundation to final finish — we execute complex builds with precision engineering, rigorous quality controls, and deep structural expertise across residential, commercial, and industrial typologies.',
                'icon'              => 'Briefcase',
                'sort_order'        => 1,
                'status'            => 1,
            ],
            [
                'title'             => 'Land Development',
                'subtitle'          => 'Acquisition · Master Planning · Infrastructure',
                'short_description' => 'Strategic land acquisition, feasibility analysis, and master planning that transforms raw parcels into developments.',
                'long_description'  => 'Strategic land acquisition, feasibility analysis, and master planning that transforms raw parcels into high-value developments. We navigate zoning, environmental compliance, and full infrastructure design.',
                'icon'              => 'Map',
                'sort_order'        => 2,
                'status'            => 1,
            ],
            [
                'title'             => 'Architecture',
                'subtitle'          => 'Design · Documentation · Interiors',
                'short_description' => 'Design that balances aesthetic ambition with functional precision operating at the intersection of form, material, and experience.',
                'long_description'  => 'Design that balances aesthetic ambition with functional precision. Our architectural practice operates at the intersection of form, material, and human experience — producing buildings that endure.',
                'icon'              => 'Compass',
                'sort_order'        => 3,
                'status'            => 1,
            ],
            [
                'title'             => 'Project Management',
                'subtitle'          => 'Scheduling · Cost Control · Oversight',
                'short_description' => 'End-to-end program management that keeps complex, multi-stakeholder projects on schedule and on budget.',
                'long_description'  => 'End-to-end program management that keeps complex, multi-stakeholder projects on schedule and on budget. Real-time reporting, proactive risk management, and decisive leadership at every milestone.',
                'icon'              => 'Calendar',
                'sort_order'        => 4,
                'status'            => 1,
            ],
            [
                'title'             => 'Engineering Consultation',
                'subtitle'          => 'Structural · Civil · MEP',
                'short_description' => 'Deep engineering expertise available as standalone consultation or fully integrated within project delivery.',
                'long_description'  => 'Deep engineering expertise available as standalone consultation or fully integrated within project delivery. We solve the hard problems early — before they become costly delays on site.',
                'icon'              => 'Hammer',
                'sort_order'        => 5,
                'status'            => 1,
            ],
        ];

        foreach ($services as $data) {
            $data['slug'] = Str::slug($data['title']);
            
            // Check if the service already exists by slug before creating to prevent duplicates on multiple runs
            if (!Service::where('slug', $data['slug'])->exists()) {
                Service::create($data);
            }
        }
    }
}
