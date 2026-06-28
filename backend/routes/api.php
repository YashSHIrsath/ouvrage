<?php

use App\Http\Controllers\Auth\AuthController;
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
    Route::get('services', [App\Http\Controllers\Public\ServiceController::class, 'index'])->name('services.public');

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

        // Services CRUD
        Route::get('services', [ServiceController::class, 'index'])->name('services.index');
        Route::post('services', [ServiceController::class, 'store'])->name('services.store');
        Route::put('services/{id}', [ServiceController::class, 'update'])->name('services.update');
        Route::delete('services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
        Route::post('services/reorder', [ServiceController::class, 'reorder'])->name('services.reorder');

    });

});
