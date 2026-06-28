<?php

namespace Database\Seeders;

use App\Models\Resident;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    public function run(): void
    {
        // Resident::truncate();

        $residents = [];

        for ($i = 1; $i <= 15; $i++) {

            $residents[] = [

                'full_name' => "Resident Tetap {$i}",

                'resident_type' => 'tetap',

                'phone' => '08123456789',

                'marital_status' => 'menikah',

                'created_at' => now(),

                'updated_at' => now(),

            ];
        }

        for ($i = 1; $i <= 3; $i++) {

            $residents[] = [

                'full_name' => "Resident Kontrak {$i}",

                'resident_type' => 'kontrak',

                'phone' => '08123456789',

                'marital_status' => 'menikah',

                'created_at' => now(),

                'updated_at' => now(),

            ];
        }

        Resident::insert(
            $residents
        );
    }
}