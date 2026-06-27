<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
class HouseOccupancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'house_id',
        'resident_id',
        'start_date',
        'end_date',
        'is_active'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean'
    ];

    protected $appends = [
        'duration',
    ];

    public function getDurationAttribute()
    {
        $start = Carbon::parse($this->start_date);

        if (is_null($this->end_date)) {
            return $start->diffInDays(now()) . ' Days (Current)';
        }

        return $start->diffInDays(Carbon::parse($this->end_date)) . ' Days';
    }

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}