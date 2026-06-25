<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory;

    protected $fillable = [
        'house_id',
        'resident_id',
        'bill_type_id',
        'period_month',
        'period_year',
        'amount',
        'status'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function billType()
    {
        return $this->belongsTo(BillType::class);
    }

    public function paymentDetails()
    {
        return $this->hasMany(PaymentDetail::class);
    }
}