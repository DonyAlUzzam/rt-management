<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'expense_category_id' => $this->expense_category_id,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],

            'expense_date' => $this->expense_date,

            'description' => $this->description,

            'amount' => $this->amount,

            'created_at' => $this->created_at
        ];
    }
}