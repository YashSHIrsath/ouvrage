<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): mixed
    {
        if (! Auth::check()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $user = Auth::user();

        // Must be an admin with status = 1 (active). Inactive (0) and deleted (9) are rejected.
        if ($user->role !== 'admin' || $user->status !== 1) {
            Auth::logout();

            return response()->json(['message' => 'Access denied.'], 403);
        }

        return $next($request);
    }
}
