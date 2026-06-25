<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'ktp_photo',
        'resident_type',
        'phone',
        'marital_status'
    ];

    public function occupancies()
    {
        return $this->hasMany(HouseOccupancy::class);
    }

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function activeOccupancy()
    {
        return $this->hasOne(HouseOccupancy::class)
            ->where('is_active', true);
    }

    public function currentHouse()
    {
        return $this->hasOne(HouseOccupancy::class)
            ->where('is_active', true);
    }
}