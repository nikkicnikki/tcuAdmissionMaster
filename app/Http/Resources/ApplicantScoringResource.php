<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\ExamDateResource;
use App\Http\Resources\ExamRoomResource;

class ApplicantScoringResource extends JsonResource
{
    
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'sr_name'       => $this->sr_name,
            'f_name'        => $this->f_name,
            'm_name'        => $this->m_name,
            'prog'          => new ProgramResource($this->program),
            'score'         => $this->score,

            'exam_date'     => new ExamDateResource($this->examDate),
            'exam_room'     => new ExamRoomResource($this->examRoom),

            'image_capture' => $this->image_capture,

            'validate_by'   => $this->validateBy,            
            'printed_by'    => $this->printedBy,  
            'printed_date'  => Carbon::parse($this->printed_date)->format('F j, Y g:i A'),          
            
            'created_at'    => $this->created_at->format('F j, Y g:i A'),
        ];
    }
}
