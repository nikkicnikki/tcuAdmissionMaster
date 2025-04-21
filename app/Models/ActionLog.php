<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    //
    protected $fillable = [
        'action',
        'user_id',
        'target_id',
        'metadata',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function target()
    {
        return $this->belongsTo( Applicant::class, 'target_id');
    }
}
