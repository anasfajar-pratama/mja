<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyValue extends Model
{
    protected $fillable = ['letter', 'title', 'description', 'sort', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'sort' => 'integer'];
}
