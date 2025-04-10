<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Applicant extends Model
{
    //

    protected $fillable = [

                "sr_name"       ,
                "f_name"        ,
                "m_name"        ,
                "prog"          ,
                "sex"           ,
                "bday"          ,
                "bplace"        ,
                "cont"          ,
                "email"         ,
                "tag_res"       ,
                "curr_add"      ,
                "fb_acc"        ,
                "fb_acc_link"   ,
                "bs_degree"     ,
                "l_schl_att"    ,
                "yr_grad"       ,
                "curr_emp"      ,
                "conn_com_ins"  ,
                "curr_occ"      ,
                "l_serv"        ,
                "gov_id"        ,
                "voter_id"      ,
                "tor"           ,
                "reason"        ,
                "status"        ,
                "remarks"       ,
                
                "validate_by"   ,
                "printed_by"    ,
                "score_by"      ,
                
                "image_capture" ,
                "printed_date"  ,
                
                "created_at"    ,
                
    ];

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

    public function examDate(): BelongsTo {
        return $this->belongsTo(ExamDate::class , 'exam_date');
    }

    public function examRoom(): BelongsTo {
        return $this->belongsTo(ExamRoom::class , 'exam_room');
    }
}
