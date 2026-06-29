<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $table = 'pages';

    protected $guarded = [];

    protected $casts = [
        'sort_order'      => 'integer',
        'status'          => 'integer',
        'is_system'       => 'boolean',
        'show_in_sitemap' => 'boolean',
    ];

    /** Scope: published pages only (status = 1) — used by public API */
    public function scopePublished($query)
    {
        return $query->where('status', 1);
    }

    /** Scope: exclude soft-deleted pages (status != 9) — used by admin API */
    public function scopeNotDeleted($query)
    {
        return $query->where('status', '!=', 9);
    }

    /** Scope: order by sort_order ascending */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    /** Nav items that link to this page */
    public function navItems()
    {
        return $this->hasMany(NavItem::class);
    }
}
