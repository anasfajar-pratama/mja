<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = ['icon', 'title', 'text', 'sort', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'sort' => 'integer'];
}
