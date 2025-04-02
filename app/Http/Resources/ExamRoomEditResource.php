<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamRoomEditResource extends JsonResource
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
            'exam_room' => $this->exam_room,
            'status'    => $this->status,
            'des'       => $this->des,
            'set_user'  => $this->set_user,
            'capacity'  => $this->capacity,
            'capacity_status'  => $this->capacity_status,
        ];
    }
}
