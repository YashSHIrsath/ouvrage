<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {

    // Public routes — no authentication required
    Route::prefix('public')->name('public.')->group(function (): void {
        // Phase 2: services, projects, testimonials, faqs, team
    });

    // Admin routes — authentication middleware added in Phase 2
    Route::prefix('admin')->name('admin.')->group(function (): void {
        // Phase 2: site settings, theme, content management
    });

});
