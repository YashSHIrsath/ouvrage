<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nav_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->nullable()->constrained('pages')->nullOnDelete(); // optional link to a page record
            $table->string('label', 100);
            $table->string('href', 255);
            $table->enum('type', ['page', 'external'])->default('page');
            $table->boolean('is_navbar')->default(true);
            $table->boolean('is_footer')->default(true);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->tinyInteger('status')->default(1); // 1=active, 0=hidden, 9=deleted
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('status');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nav_items');
    }
};
