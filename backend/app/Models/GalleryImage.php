<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    protected $fillable = ['category', 'image_path', 'sort', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'sort' => 'integer'];
}
