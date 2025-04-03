<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamDate extends Model
{
    protected $table = 'exam_dates';
    protected $fillable = [ 'exam_date' , 'status' , 'des' ];
}
