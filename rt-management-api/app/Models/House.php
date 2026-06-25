<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class House extends Model
{
    use HasFactory;

    protected $fillable = [
        'house_number',
        'address',
        'status'
    ];

    public function occupancies()
    {
        return $this->hasMany(HouseOccupancy::class);
    }

    public function activeOccupancy()
    {
        return $this->hasOne(HouseOccupancy::class)
            ->where('is_active', true);
    }

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function currentResident()
    {
        return $this->hasOne(HouseOccupancy::class)
            ->where('is_active', true);
    }
}