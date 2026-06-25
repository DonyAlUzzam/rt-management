<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'expense_category_id',
        'expense_date',
        'description',
        'amount'
    ];

    protected $casts = [
        'expense_date' => 'date',
        'amount' => 'decimal:2'
    ];

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }
}