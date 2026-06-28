<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\Public\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends BaseApiController
{
    /**
     * Display a listing of public active services.
     */
    public function index(): JsonResponse
    {
        $services = Service::where('status', 1)
            ->orderBy('sort_order', 'asc')
            ->get();

        return $this->success(ServiceResource::collection($services));
    }
}
