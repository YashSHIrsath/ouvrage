<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Page;
use Illuminate\Http\JsonResponse;

class PageController extends BaseApiController
{
    public function show(string $slug): JsonResponse
    {
        $page = Page::published()
            ->where('slug', $slug)
            ->first(['id', 'slug', 'title', 'nav_label', 'template', 'meta_title', 'meta_description']);

        if (! $page) {
            return $this->error('Page not found', 404);
        }

        return $this->success($page);
    }
}
