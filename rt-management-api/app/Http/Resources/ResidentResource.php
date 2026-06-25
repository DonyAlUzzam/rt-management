<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResidentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'full_name' => $this->full_name,

            'ktp_photo' => $this->ktp_photo,

            'resident_type' => $this->resident_type,

            'phone' => $this->phone,

            'marital_status' => $this->marital_status,

            'created_at' => $this->created_at
        ];
    }
}