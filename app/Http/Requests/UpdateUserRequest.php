<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

use App\Models\User;

class UpdateUserRequest extends FormRequest
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
        $user = $this->route("user");
        //dd($user);

        return [
            "name"  => ["required","string","max:255"],
            "email" => [
                "required",
                "email",
                Rule::unique('users')->ignore($user->id),
            ],
            "role"  => ["required","integer","in:1,2,3,4"],
            "password" => [ 
                "nullable",
                "confirmed", 
                Rules\Password::min(8)->letters()
            ],
        ];
    }
}
