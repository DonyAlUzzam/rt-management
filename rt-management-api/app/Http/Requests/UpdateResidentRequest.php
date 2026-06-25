<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResidentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|max:255',

            'resident_type' => 'required|in:tetap,kontrak',

            'phone' => 'required|max:20',

            'marital_status' => 'required|in:menikah,belum_menikah',

            'ktp_photo' => 'nullable|image|max:2048'
        ];
    }
}