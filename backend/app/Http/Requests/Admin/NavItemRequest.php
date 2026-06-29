<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class NavItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'label'     => ['required', 'string', 'max:100'],
            'href'      => ['required', 'string', 'max:255'],
            'type'      => ['required', 'in:page,external'],
            'page_id'   => ['nullable', 'exists:pages,id'],
            'is_navbar' => ['required', 'boolean'],
            'is_footer' => ['required', 'boolean'],
            'status'    => ['required', 'in:0,1'],
        ];
    }
}
