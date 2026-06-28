<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\SiteSettings;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SettingsController extends BaseApiController
{
    public function getGeneral(): JsonResponse
    {
        $settings = SiteSettings::current();

        return $this->success($this->resource($settings));
    }

    public function updateGeneral(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'company_name' => ['nullable', 'string', 'max:255'],
            'tagline'      => ['nullable', 'string', 'max:255'],
            'email'        => ['nullable', 'email', 'max:255'],
            'phone'        => ['nullable', 'string', 'max:50'],
            'address'      => ['nullable', 'string', 'max:1000'],
            'logo'         => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
            'favicon'      => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,ico,svg', 'max:512'],
            'remove_logo'  => ['nullable', 'boolean'],
            'remove_favicon' => ['nullable', 'boolean'],
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed.', 422, $validator->errors());
        }

        $settings = SiteSettings::current();
        $data     = $request->only(['company_name', 'tagline', 'email', 'phone', 'address']);

        // Logo
        if ($request->hasFile('logo')) {
            $this->deleteFile($settings->logo_path);
            $data['logo_path'] = $request->file('logo')->store('settings', 'public');
        } elseif ($request->boolean('remove_logo')) {
            $this->deleteFile($settings->logo_path);
            $data['logo_path'] = null;
        }

        // Favicon
        if ($request->hasFile('favicon')) {
            $this->deleteFile($settings->favicon_path);
            $data['favicon_path'] = $request->file('favicon')->store('settings', 'public');
        } elseif ($request->boolean('remove_favicon')) {
            $this->deleteFile($settings->favicon_path);
            $data['favicon_path'] = null;
        }

        $settings->update($data);

        return $this->success($this->resource($settings), 'Settings saved successfully.');
    }

    private function resource(SiteSettings $settings): array
    {
        return [
            'company_name' => $settings->company_name,
            'tagline'      => $settings->tagline,
            'email'        => $settings->email,
            'phone'        => $settings->phone,
            'address'      => $settings->address,
            'logo_url'     => $settings->logo_url,
            'favicon_url'  => $settings->favicon_url,
        ];
    }

    private function deleteFile(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
