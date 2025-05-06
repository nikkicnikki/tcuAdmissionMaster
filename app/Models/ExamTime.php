<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamTime extends Model
{
    protected $table = 'exam_time';

    protected $fillable = [
        'exam_time', 
        'status', 
        'des',
    ];
}
