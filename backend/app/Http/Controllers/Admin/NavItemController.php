<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Requests\Admin\NavItemRequest;
use App\Models\NavItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavItemController extends BaseApiController
{
    /** List all non-deleted nav items ordered by sort_order */
    public function index(): JsonResponse
    {
        $items = NavItem::notDeleted()->ordered()->get();
        return $this->success($items);
    }

    /** Create a new nav item */
    public function store(NavItemRequest $request): JsonResponse
    {
        $maxOrder = NavItem::notDeleted()->max('sort_order') ?? 0;

        $item = NavItem::create([
            ...$request->only(['label', 'href', 'type', 'page_id', 'is_navbar', 'is_footer', 'status']),
            'sort_order' => $maxOrder + 1,
            'created_by' => auth()->id(),
            'updated_by' => auth()->id(),
        ]);

        return $this->created($item, 'Navigation item created successfully.');
    }

    /** Update an existing nav item */
    public function update(NavItemRequest $request, $id): JsonResponse
    {
        $item = NavItem::notDeleted()->findOrFail($id);

        $item->update([
            ...$request->only(['label', 'href', 'type', 'page_id', 'is_navbar', 'is_footer', 'status']),
            'updated_by' => auth()->id(),
        ]);

        return $this->success($item, 'Navigation item updated successfully.');
    }

    /** Soft-delete a nav item (status = 9) */
    public function destroy($id): JsonResponse
    {
        $item = NavItem::notDeleted()->findOrFail($id);
        $item->update(['status' => 9, 'updated_by' => auth()->id()]);

        return $this->success(null, 'Navigation item deleted successfully.');
    }

    /** Reorder nav items — only writes rows whose sort_order changed */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            '*'             => ['required', 'array'],
            '*.id'          => ['required', 'exists:nav_items,id'],
            '*.sort_order'  => ['required', 'integer'],
        ]);

        $items  = $request->all();
        $ids    = collect($items)->pluck('id')->toArray();
        $dbRows = NavItem::whereIn('id', $ids)->get()->keyBy('id');

        foreach ($items as $item) {
            $dbRow   = $dbRows->get($item['id']);
            $newOrder = (int) $item['sort_order'];

            if ($dbRow && $dbRow->sort_order !== $newOrder) {
                $dbRow->update(['sort_order' => $newOrder]);
            }
        }

        return $this->success(null, 'Navigation order updated.');
    }
}
