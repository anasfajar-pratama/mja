<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'icon', 'tag_label', 'category', 'title', 'summary', 'description',
        'image_path', 'chips', 'benefits', 'sectors', 'is_featured', 'sort', 'is_active',
    ];

    protected $casts = [
        'chips' => 'array',
        'benefits' => 'array',
        'sectors' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort' => 'integer',
    ];
}
