<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 100)->unique();
            $table->string('title', 200);
            $table->string('nav_label', 100)->nullable();
            $table->string('template', 50)->default('standard'); // standard|landing|blank
            $table->string('meta_title', 200)->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_system')->default(false);        // true = seeded core page; cannot be deleted
            $table->boolean('show_in_sitemap')->default(true);   // future sitemap generation
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->tinyInteger('status')->default(1);           // 0=draft, 1=published, 9=deleted
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('status');
            $table->index('sort_order');
            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
