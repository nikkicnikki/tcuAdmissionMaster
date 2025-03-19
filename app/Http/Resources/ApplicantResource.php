<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Http\Resources\UserResource;

class ApplicantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'sr_name'   => $this->sr_name,
            'f_name'    => $this->f_name,
            'm_name'    => $this->m_name,
            'status'       => $this->status,
            'email'         => $this->email,
            'created_at'    => (new Carbon($this->created_at))->format('Y-m-d') ,
            'validated_by'  => new UserResource($this->validateBy),
            'printed_by'    => new UserResource($this->printedBy),
            
        ];
    }
}
