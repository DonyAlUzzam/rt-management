<?php

namespace Database\Seeders;

use App\Models\House;
use Illuminate\Database\Seeder;

class HouseSeeder extends Seeder
{
    public function run(): void
    {
        // House::truncate();

        $houses = [];

        for ($i = 1; $i <= 20; $i++) {

            $houseNumber = sprintf(
                'A-%02d',
                $i
            );
            $address = sprintf(
                'Jalan-%02d',
                $i
            );

            if ($i <= 18) {

                $status = 'occupied';

            } else {

                $status = 'vacant';

            }

            $houses[] = [

                'house_number' => $houseNumber,

                'address' => $address,

                'status' => $status,

                'created_at' => now(),

                'updated_at' => now(),

            ];
        }

        House::insert($houses);
    }
}