<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use App\Models\User;

class StoreUserRequest extends FormRequest
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
            "name"  => ["required","string","max:255"],
            "email" => ["required","email","unique:users,email"],
            "role"  => ["required","integer","in:1,2,3,4,5"],
            "password" => [
                "required", 
                "confirmed", 
                Rules\Password::min(8)->letters(),
            ],

        ];
    }
}
