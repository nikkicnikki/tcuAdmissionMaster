<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id ,
            "name"      => $this->name ,
            "acronym"   => $this->acronym ,
            "passing_grade" => $this->passing_grade,
            "create_at" => (new Carbon($this->created_at))->format('Y-m-d') ,
        ];
    }
}
