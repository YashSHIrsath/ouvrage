<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            // Role for future multi-user support — single admin for now
            $table->string('role')->default('admin')->after('email');

            // Status: 1 = active, 0 = inactive, 9 = deleted
            $table->tinyInteger('status')->default(1)->after('role');

            // Theme: supports dark/light now, custom in future
            $table->string('theme_mode')->default('dark')->after('status');

            // Audit: track last successful login
            $table->timestamp('last_login_at')->nullable()->after('theme_mode');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['role', 'status', 'theme_mode', 'last_login_at']);
        });
    }
};
