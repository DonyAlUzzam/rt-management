<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BillType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }
}