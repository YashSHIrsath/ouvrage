<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        // TODO: seo_title
        // TODO: seo_description
        
        return [
            'id'                => $this->id,
            'slug'              => $this->slug,
            'title'             => $this->title,
            'subtitle'          => $this->subtitle,
            'short_description' => $this->short_description,
            'long_description'  => $this->long_description,
            'image_url'         => $this->image_url,
            'icon'              => $this->icon,
        ];
    }
}
