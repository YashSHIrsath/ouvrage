<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'             => ['required', 'string', 'max:255'],
            'subtitle'          => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'long_description'  => ['nullable', 'string'],
            'icon'              => ['nullable', 'string', 'max:255'],
            'status'            => ['required', 'in:0,1'],
            'image'             => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'image_original'    => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'remove_image'      => ['nullable', 'boolean'],
        ];
    }
}
