<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'receipt_number',
        'resident_payment',
        'payment_date',
        'total_amount',
        'notes'
    ];

    protected $casts = [
        'payment_date' => 'date',
        'total_amount' => 'decimal:2'
    ];

    public function details()
    {
        return $this->hasMany(PaymentDetail::class);
    }

    public function resident()
    {
        return $this->belongsTo(
            Resident::class,
            'resident_payment'
        );
    }
}