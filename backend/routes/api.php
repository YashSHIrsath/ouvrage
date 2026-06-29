<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\NavItemController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ServiceController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {

    // ── Authentication ────────────────────────────────────────────────────────
    Route::prefix('auth')->name('auth.')->group(function (): void {
        Route::post('login', [AuthController::class, 'login'])->name('login');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::post('logout', [AuthController::class, 'logout'])->name('logout');
            Route::get('me', [AuthController::class, 'me'])->name('me');
        });
    });

    // ── Public routes — no authentication required ────────────────────────────
    Route::get('navigation',    [App\Http\Controllers\Public\NavItemController::class, 'index'])->name('navigation.public');
    Route::get('services',      [App\Http\Controllers\Public\ServiceController::class, 'index'])->name('services.public');
    Route::get('pages/{slug}',  [App\Http\Controllers\Public\PageController::class, 'show'])->name('pages.public.show');

    Route::prefix('public')->name('public.')->group(function (): void {
        // Phase 3: services, projects, testimonials, faqs, team
    });

    // ── Admin routes — authenticated + active admin only ─────────────────────
    Route::prefix('admin')->name('admin.')->middleware(['auth:sanctum', 'admin'])->group(function (): void {

        // Settings
        Route::prefix('settings')->name('settings.')->group(function (): void {
            Route::get('general',  [SettingsController::class, 'getGeneral'])->name('general.get');
            Route::post('general', [SettingsController::class, 'updateGeneral'])->name('general.update');
        });

        // Navigation CRUD + reorder (reorder must come before {id} routes)
        Route::get('nav-items',          [NavItemController::class, 'index'])->name('nav-items.index');
        Route::post('nav-items',         [NavItemController::class, 'store'])->name('nav-items.store');
        Route::post('nav-items/reorder', [NavItemController::class, 'reorder'])->name('nav-items.reorder');
        Route::put('nav-items/{id}',     [NavItemController::class, 'update'])->name('nav-items.update');
        Route::delete('nav-items/{id}',  [NavItemController::class, 'destroy'])->name('nav-items.destroy');

        // Pages CRUD + reorder (reorder must come before {id} routes)
        Route::get('pages',          [PageController::class, 'index'])->name('pages.index');
        Route::post('pages',         [PageController::class, 'store'])->name('pages.store');
        Route::post('pages/reorder', [PageController::class, 'reorder'])->name('pages.reorder');
        Route::put('pages/{id}',     [PageController::class, 'update'])->name('pages.update');
        Route::delete('pages/{id}',  [PageController::class, 'destroy'])->name('pages.destroy');

        // Services CRUD
        Route::get('services', [ServiceController::class, 'index'])->name('services.index');
        Route::post('services', [ServiceController::class, 'store'])->name('services.store');
        Route::put('services/{id}', [ServiceController::class, 'update'])->name('services.update');
        Route::delete('services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
        Route::post('services/reorder', [ServiceController::class, 'reorder'])->name('services.reorder');

    });

});
