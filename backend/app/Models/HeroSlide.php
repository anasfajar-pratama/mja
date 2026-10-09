<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'variant', 'eyebrow', 'title_html', 'lead',
        'btn_primary_label', 'btn_primary_href',
        'btn_secondary_label', 'btn_secondary_href',
        'image_path', 'image_mini', 'badge_title', 'badge_text', 'stats', 'highlights', 'sort', 'is_active',
    ];

    protected $casts = [
        'stats' => 'array',
        'highlights' => 'array',
        'is_active' => 'boolean',
        'sort' => 'integer',
    ];
}
