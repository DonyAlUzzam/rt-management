<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'house' => [
                'id' => $this->house?->id,
                'house_number' => $this->house?->house_number,
            ],

            'resident' => [
                'id' => $this->resident?->id,
                'full_name' => $this->resident?->full_name,
            ],

            'bill_type' => [
                'id' => $this->billType?->id,
                'name' => $this->billType?->name,
            ],

            'period_month' => $this->period_month,

            'period_year' => $this->period_year,

            'amount' => $this->amount,

            'status' => $this->status,

            'created_at' => $this->created_at,
        ];
    }
}