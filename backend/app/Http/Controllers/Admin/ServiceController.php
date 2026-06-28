<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Requests\Admin\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceController extends BaseApiController
{
    /** List all non-deleted services ordered by sort_order */
    public function index(): JsonResponse
    {
        $services = Service::notDeleted()->ordered()->get();
        return $this->success($services);
    }

    /** Create a new service */
    public function store(ServiceRequest $request): JsonResponse
    {
        // 1. Generate unique slug (only on creation)
        $slug = Str::slug($request->title);
        $originalSlug = $slug;
        $count = 1;
        while (Service::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-" . (++$count);
        }

        // 2. Assign sort order as max + 1
        $maxOrder = Service::notDeleted()->max('sort_order') ?? 0;
        $sortOrder = $maxOrder + 1;

        $data = $request->only([
            'title',
            'subtitle',
            'short_description',
            'long_description',
            'icon',
            'status'
        ]);

        $data['slug'] = $slug;
        $data['sort_order'] = $sortOrder;

        // TODO: created_by
        // TODO: updated_by

        // 3. Handle image uploads to segmented paths
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('services/cropped', 'public');
        }

        if ($request->hasFile('image_original')) {
            $data['image_original_path'] = $request->file('image_original')->store('services/original', 'public');
        }

        $service = Service::create($data);

        return $this->created($service, 'Service created successfully.');
    }

    /** Update an existing service */
    public function update(ServiceRequest $request, $id): JsonResponse
    {
        $service = Service::notDeleted()->findOrFail($id);

        $data = $request->only([
            'title',
            'subtitle',
            'short_description',
            'long_description',
            'icon',
            'status'
        ]);

        // Note: Slugs are static and never auto-update on edit
        // TODO: updated_by

        // Handle image removals
        if ($request->boolean('remove_image')) {
            $this->deleteFile($service->image_path);
            $this->deleteFile($service->image_original_path);
            $data['image_path'] = null;
            $data['image_original_path'] = null;
        }

        // Handle image updates
        if ($request->hasFile('image')) {
            $this->deleteFile($service->image_path);
            $data['image_path'] = $request->file('image')->store('services/cropped', 'public');
        }

        if ($request->hasFile('image_original')) {
            $this->deleteFile($service->image_original_path);
            $data['image_original_path'] = $request->file('image_original')->store('services/original', 'public');
        }

        $service->update($data);

        return $this->success($service, 'Service updated successfully.');
    }

    /** Soft-delete a service */
    public function destroy($id): JsonResponse
    {
        $service = Service::notDeleted()->findOrFail($id);

        // Soft delete: status = 9
        // TODO: updated_by
        // TODO: clean unused images (can be cleaned by artisan command later)
        $service->update(['status' => 9]);

        return $this->success(null, 'Service deleted successfully.');
    }

    /** Reorder services positions (only updates changed records) */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            '*' => ['required', 'array'],
            '*.id' => ['required', 'exists:services,id'],
            '*.sort_order' => ['required', 'integer'],
        ]);

        $items = $request->all();

        // Optimize: Only save rows whose sort_order has actually changed
        $ids = collect($items)->pluck('id')->toArray();
        $dbServices = Service::whereIn('id', $ids)->get()->keyBy('id');

        foreach ($items as $item) {
            $id = $item['id'];
            $newOrder = (int) $item['sort_order'];
            $service = $dbServices->get($id);

            if ($service && $service->sort_order !== $newOrder) {
                $service->update(['sort_order' => $newOrder]);
            }
        }

        return $this->success(null, 'Service order updated.');
    }

    /** Helper to delete a file from public storage disk */
    private function deleteFile(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
