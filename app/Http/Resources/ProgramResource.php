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
            "name"      => $this->name ,
            "acronym"   => $this->acronym ,
            "create_at" => (new Carbon($this->created_at))->format('Y-m-d') ,
        ];
    }
}
