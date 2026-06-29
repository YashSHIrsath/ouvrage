<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\NavItem;
use Illuminate\Http\JsonResponse;

class NavItemController extends BaseApiController
{
    /**
     * Return all active nav items for the public site.
     * Only exposes public-safe fields — no created_by, updated_by, etc.
     */
    public function index(): JsonResponse
    {
        $items = NavItem::active()
            ->ordered()
            ->get(['id', 'label', 'href', 'type', 'is_navbar', 'is_footer', 'sort_order']);

        return $this->success($items);
    }
}
