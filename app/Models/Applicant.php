<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Applicant extends Model
{
    //

    use HasFactory;


    public function program(){
        return $this->belongsTo(Program::class , 'prog');
    }

    public function barangay(){
        return $this->belongsTo(Barangay::class , 'brgy');
    }

    public function validateBy(){
        return $this->belongsTo(User::class , 'validate_by');
    }

    public function printedBy(){
        return $this->belongsTo(User::class , 'printed_by');
    }

    public function scoreBy(){
        return $this->belongsTo(User::class , 'score_by');
    }
}
