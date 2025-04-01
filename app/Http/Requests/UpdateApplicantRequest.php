<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicantRequest extends FormRequest
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
            "prog"          => ['integer','required'],
            "sex"           => ['string', 'in:male,female'],
            "bday"          => ['date','required'],
            "bplace"        => ['string'],
            "cont"          => ['string'],
            "email"         => ['email'],
            "tag_res"       => ['string','in:yes,no'],
            "curr_add"      => ['string'],

            "fb_acc"        => ['string'],
            "fb_acc_link"   => ['string'],
            "bs_degree"     => ['string','required'],
            "l_schl_att"    => ['string'],
            "yr_grad"       => ['string'],
            "curr_emp"      => ['string','in:yes,no'],
            "conn_com_ins"  => ['string'],
            "curr_occ"      => ['string'],
            "l_serv"        => ['string'],
            "gov_id"        => ['string'],
            "voter_id"      => ['string'],
            "tor"           => ['string'],
            "reason"        => ['string','nullable'],
            "status"        => ['integer','in:1,2,3,4,5'],
            "remarks"       => ['string','nullable'],
            "validate_by"   => ['required','integer'],
            
        ];
    }
}
