<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Legality extends Model
{
    protected $fillable = ['label', 'value', 'is_full_width', 'sort', 'is_active'];

    protected $casts = ['is_full_width' => 'boolean', 'is_active' => 'boolean', 'sort' => 'integer'];
}
