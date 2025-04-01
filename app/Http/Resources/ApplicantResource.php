<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\BarangayResource;
use App\Http\Resources\ExamDateResource;
use App\Http\Resources\ExamRoomResource;

class ApplicantResource extends JsonResource
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
            'sex'           => $this->sex,
            'bday'          => (new Carbon($this->bday))->format('Y-m-d'),
            'bplace'        => $this->bplace,
            'cont'          => $this->cont,
            'email'         => $this->email,
            'tag_res'       => $this->tag_res,
            'curr_add'      => $this->curr_add,
            //'brgy'          => new BarangayResource($this->barangay),
            'fb_acc'        => $this->fb_acc,
            'fb_acc_link'   => $this->fb_acc_link,
            'bs_degree'     => $this->bs_degree,
            'l_schl_att'    => $this->l_schl_att,
            'yr_grad'       => $this->yr_grad,
            'curr_emp'      => $this->curr_emp,
            'conn_com_ins'  => $this->conn_com_ins,
            'curr_occ'      => $this->curr_occ,
            'l_serv'        => $this->l_serv,
            'gov_id'        => $this->gov_id,
            'voter_id'      => $this->voter_id,
            'tor'           => $this->tor,
            'reason'        => $this->reason,
            //'app_pic'       => $this->app_pic,

            'status'        => $this->status,
            'remarks'       => $this->remarks,
            'exam_date'     => new ExamDateResource($this->examDate),
            'exam_room'     => new ExamRoomResource($this->examRoom),

            'image_capture' => $this->image_capture,

            'validate_by'   => new UserResource($this->validateBy),
            'printed_by'    => new UserResource($this->printedBy),
            'printed_date'  => $this->printed_date ? (new Carbon($this->printed_date))->format('Y-m-d') : null,
            'score_by'      => new UserResource($this->scoreBy),
            
            'score'         => $this->score,
            
            'created_at'    => $this->created_at ? (new Carbon($this->created_at))->format('Y-m-d') : null,
            'updated_at'    => $this->updated_at ? (new Carbon($this->updated_at))->format('Y-m-d') : null,
        ];
    }
}
