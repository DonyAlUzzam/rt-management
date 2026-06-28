<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\BillType;
use App\Models\HouseOccupancy;
use Illuminate\Database\Seeder;

class BillSeeder extends Seeder
{
    public function run(): void
    {
        $billTypes = BillType::all();

        $occupancies = HouseOccupancy::where(
            'is_active',
            true
        )->get();

        $months = [4, 5, 6, 7, 8, 9];

        foreach ($occupancies as $occupancy) {

            foreach ($months as $month) {

                foreach ($billTypes as $billType) {

                    Bill::create([

                        'house_id' => $occupancy->house_id,

                        'resident_id' => $occupancy->resident_id,

                        'bill_type_id' => $billType->id,

                        'period_month' => $month,

                        'period_year' => 2026,

                        'amount' => $billType->amount,

                        'status' => 'unpaid',

                    ]);

                }

            }

        }
    }
}