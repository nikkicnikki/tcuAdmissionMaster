<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamRoom extends Model
{
    protected $fillable = [ 
        'exam_room' , 
        'status' , 
        'des' , 
        'set_user' ,
        'capacity' ,
        'capacity_status' ,  
    ];

}
