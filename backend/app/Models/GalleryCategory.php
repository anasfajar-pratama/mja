<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryCategory extends Model
{
    protected $fillable = ['name', 'sort'];

    protected $casts = ['sort' => 'integer'];
}
