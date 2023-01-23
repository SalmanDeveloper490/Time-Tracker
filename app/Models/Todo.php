<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['todo','user_id'];

    public function times()
    {
        return $this->hasMany(Time::class);
    }
}
