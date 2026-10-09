<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['quote', 'name', 'role', 'initials', 'rating', 'sort', 'is_active'];

    protected $casts = ['rating' => 'integer', 'is_active' => 'boolean', 'sort' => 'integer'];
}
