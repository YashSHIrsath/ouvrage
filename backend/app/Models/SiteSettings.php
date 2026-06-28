<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SiteSettings extends Model
{
    protected $table = 'site_settings';

    protected $fillable = [
        'company_name',
        'tagline',
        'email',
        'phone',
        'address',
        'logo_path',
        'favicon_path',
    ];

    /** Always returns the single settings record, creating it if missing. */
    public static function current(): static
    {
        return static::firstOrCreate([], [
            'company_name' => 'BuildCo Construction',
        ]);
    }

    /** Resolved public URL or null. */
    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo_path
            ? Storage::disk('public')->url($this->logo_path)
            : null;
    }

    /** Resolved public URL or null. */
    public function getFaviconUrlAttribute(): ?string
    {
        return $this->favicon_path
            ? Storage::disk('public')->url($this->favicon_path)
            : null;
    }
}
