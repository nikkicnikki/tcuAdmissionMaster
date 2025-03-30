<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicantVALIDRequest extends FormRequest
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

            "sr_name"       => ['string','required'],
            "f_name"        => ['string','required'],
            "m_name"        => ['string'],
            "status"        => ['integer','in:1,2,3,4,5'],
            "validate_by"   => ['required','integer'],
            
        ];
    }
}
