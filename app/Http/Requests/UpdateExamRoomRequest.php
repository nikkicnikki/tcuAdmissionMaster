<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "exam_room" => ['required'] ,
            "des"       => ['string', 'nullable'] ,
            "status"    => ['required' , 'in:1,2'] ,
            'set_user'  => ['nullable'] ,
            'capacity'  => ['nullable'] ,
            'capacity_status' => ['nullable'] ,
        ];
    }
}
