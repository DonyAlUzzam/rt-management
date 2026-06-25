<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BillType;

class BillTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BillType::insert([
            [
                'name' => 'Satpam',
                'amount' => 100000
            ],
            [
                'name' => 'Kebersihan',
                'amount' => 15000
            ]
        ]);
    }
}
