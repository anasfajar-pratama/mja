<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissionItem extends Model
{
    protected $fillable = ['text', 'sort', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'sort' => 'integer'];
}
