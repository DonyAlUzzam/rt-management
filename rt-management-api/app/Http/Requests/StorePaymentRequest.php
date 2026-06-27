<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'payment_date' => 'required|date',

            'bill_ids' => 'required|array|min:1',

            'bill_ids.*' => 'exists:bills,id',

            'notes' => 'nullable|string',

            'resident_id' => 'required|exists:residents,id'
        ];
    }
}