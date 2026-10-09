<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactLine extends Model
{
    protected $fillable = ['label', 'value', 'href', 'is_link', 'sort', 'is_active'];

    protected $casts = ['is_link' => 'boolean', 'is_active' => 'boolean', 'sort' => 'integer'];
}
