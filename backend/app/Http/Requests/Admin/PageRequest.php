<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'title'            => ['required', 'string', 'max:200'],
            'slug'             => ['nullable', 'string', 'max:100', 'unique:pages,slug' . ($id ? ",{$id}" : '')],
            'nav_label'        => ['nullable', 'string', 'max:100'],
            'template'         => ['required', 'in:standard,landing,blank'],
            'meta_title'       => ['nullable', 'string', 'max:200'],
            'meta_description' => ['nullable', 'string'],
            'status'           => ['required', 'in:0,1'],
        ];
    }
}
