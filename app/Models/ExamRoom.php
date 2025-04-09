<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamRoom extends Model
{
    protected $table = 'exam_rooms';
    protected $fillable = [
        'exam_room',
        'status',
        'des',
        'set_user',
        'limit',
    ];
}
