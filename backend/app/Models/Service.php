<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Service extends Model
{
    protected $table = 'services';

    protected $guarded = [];

    protected $casts = [
        'sort_order' => 'integer',
        'status' => 'integer',
    ];

    /** Appends accessors to serialization */
    protected $appends = [
        'image_url',
        'image_original_url',
    ];

    /** Scope to only active services (status = 1) */
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    /** Scope to exclude soft deleted services (status != 9) */
    public function scopeNotDeleted($query)
    {
        return $query->where('status', '!=', 9);
    }

    /** Scope to order by sort_order */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    /** Accessor for cropped image url */
    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path
            ? Storage::disk('public')->url($this->image_path)
            : null;
    }

    /** Accessor for original raw image url */
    public function getImageOriginalUrlAttribute(): ?string
    {
        return $this->image_original_path
            ? Storage::disk('public')->url($this->image_original_path)
            : null;
    }
}
