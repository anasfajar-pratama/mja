<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = ['name', 'logo_path', 'sort', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'sort' => 'integer'];
}
