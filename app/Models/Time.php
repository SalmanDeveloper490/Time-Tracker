<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    use HasFactory;

    protected $fillable = ['time','todo_id'];
    
    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }

}
