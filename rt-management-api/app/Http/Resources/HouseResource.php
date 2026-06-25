<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HouseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'house_number' => $this->house_number,

            'address' => $this->address,

            'status' => $this->status,

            'current_resident' => $this->whenLoaded(
                'currentResident',
                function () {
                    return [
                        'resident_id' => $this->currentResident?->resident?->id,
                        'full_name' => $this->currentResident?->resident?->full_name,
                        'phone' => $this->currentResident?->resident?->phone,
                    ];
                }
            ),
        ];
    }
}