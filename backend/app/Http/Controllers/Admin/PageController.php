<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Requests\Admin\PageRequest;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends BaseApiController
{
    /** List all non-deleted pages ordered by sort_order (includes draft + published) */
    public function index(): JsonResponse
    {
        $pages = Page::notDeleted()->ordered()->get();
        return $this->success($pages);
    }

    /** Create a new page */
    public function store(PageRequest $request): JsonResponse
    {
        // Auto-generate unique slug from title
        $slug         = Str::slug($request->title);
        $originalSlug = $slug;
        $count        = 1;
        while (Page::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-" . (++$count);
        }

        $maxOrder = Page::notDeleted()->max('sort_order') ?? 0;

        $page = Page::create([
            ...$request->only(['title', 'nav_label', 'template', 'meta_title', 'meta_description', 'status']),
            'slug'       => $slug,
            'sort_order' => $maxOrder + 1,
            'is_system'  => false,
            'created_by' => auth()->id(),
            'updated_by' => auth()->id(),
        ]);

        return $this->created($page, 'Page created successfully.');
    }

    /** Update an existing page */
    public function update(PageRequest $request, $id): JsonResponse
    {
        $page = Page::notDeleted()->findOrFail($id);

        $data = $request->only(['title', 'nav_label', 'template', 'meta_title', 'meta_description', 'status']);

        // Slug changes are blocked for system pages
        if (!$page->is_system && $request->filled('slug')) {
            $data['slug'] = $request->slug;
        }

        $data['updated_by'] = auth()->id();
        $page->update($data);

        return $this->success($page, 'Page updated successfully.');
    }

    /** Soft-delete a page (status = 9) — system pages are protected */
    public function destroy($id): JsonResponse
    {
        $page = Page::notDeleted()->findOrFail($id);

        if ($page->is_system) {
            return $this->error('System pages cannot be deleted.', 403);
        }

        $page->update(['status' => 9, 'updated_by' => auth()->id()]);

        return $this->success(null, 'Page deleted successfully.');
    }

    /** Reorder pages — only writes rows whose sort_order changed */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            '*'            => ['required', 'array'],
            '*.id'         => ['required', 'exists:pages,id'],
            '*.sort_order' => ['required', 'integer'],
        ]);

        $items  = $request->all();
        $ids    = collect($items)->pluck('id')->toArray();
        $dbRows = Page::whereIn('id', $ids)->get()->keyBy('id');

        foreach ($items as $item) {
            $dbRow    = $dbRows->get($item['id']);
            $newOrder = (int) $item['sort_order'];

            if ($dbRow && $dbRow->sort_order !== $newOrder) {
                $dbRow->update(['sort_order' => $newOrder]);
            }
        }

        return $this->success(null, 'Page order updated.');
    }
}
