<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray($request)
    {
        return [

            'id' => $this->id,

            'receipt_number' =>
                $this->receipt_number,

            'resident_payment' =>
                $this->resident_payment,

            'payment_date' =>
                $this->payment_date,

            'total_amount' =>
                $this->total_amount,

            'notes' =>
                $this->notes,

            'resident' => [

                'id' =>
                    $this->resident?->id,

                'full_name' =>
                    $this->resident?->full_name,
            ]
        ];
    }
}
