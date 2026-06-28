<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseApiController
{
    /**
     * Authenticate the administrator and start a session.
     * Updates last_login_at on every successful login.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = $request->user();

        // Stamp the login time
        $user->update(['last_login_at' => now()]);

        return $this->success(
            $this->userResource($user),
            'Login successful.'
        );
    }

    /**
     * Destroy the authenticated session.
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->success(null, 'Logged out successfully.');
    }

    /**
     * Return the currently authenticated administrator.
     * Used by the frontend on app load to restore session state.
     */
    public function me(Request $request): JsonResponse
    {
        return $this->success($this->userResource($request->user()));
    }

    /**
     * Consistent user shape returned to the frontend.
     *
     * @param  \App\Models\User  $user
     * @return array<string, mixed>
     */
    private function userResource(\App\Models\User $user): array
    {
        return [
            'id'            => $user->id,
            'name'          => $user->name,
            'email'         => $user->email,
            'role'          => $user->role,
            'theme_mode'    => $user->theme_mode,
            'last_login_at' => $user->last_login_at?->toISOString(),
        ];
    }
}
