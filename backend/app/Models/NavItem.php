<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavItem extends Model
{
    protected $table = 'nav_items';

    protected $guarded = [];

    protected $casts = [
        'sort_order' => 'integer',
        'status'     => 'integer',
        'is_navbar'  => 'boolean',
        'is_footer'  => 'boolean',
    ];

    /** Scope: active nav items (status = 1) — used by public API */
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    /** Scope: exclude soft-deleted items (status != 9) — used by admin API */
    public function scopeNotDeleted($query)
    {
        return $query->where('status', '!=', 9);
    }

    /** Scope: order by sort_order ascending */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    /** Optional page link — withDefault() prevents null exceptions */
    public function page()
    {
        return $this->belongsTo(Page::class)->withDefault();
    }
}
