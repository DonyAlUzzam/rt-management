<?php

namespace Database\Seeders;

use App\Models\House;
use App\Models\Resident;
use App\Models\HouseOccupancy;
use Illuminate\Database\Seeder;

class OccupancySeeder extends Seeder
{
    public function run(): void
    {
        // HouseOccupancy::truncate();

        $houses = House::where(
            'status',
            'occupied'
        )->get();

        $residents = Resident::all();

        foreach ($houses as $index => $house) {

            $resident = $residents[$index];

            HouseOccupancy::create([

                'house_id' => $house->id,

                'resident_id' => $resident->id,

                'start_date' => now()
                    ->subMonths(
                        rand(1, 24)
                    ),

                'end_date' => null,

                'is_active' => true,

            ]);
        }
    }
}