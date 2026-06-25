<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\House;

class HouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {

            House::create([
                'house_number' => 'A-' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'status' => 'vacant'
            ]);
        }
    }
}
