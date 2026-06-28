<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExpenseCategory;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExpenseCategory::insert([
            [
                'name' => 'Listrik'
            ],
            [
                'name' => 'Internet'
            ],
            [
                'name' => 'Kebersihan'
            ],
            [
                'name' => 'Perawatan'
            ]
        ]);
    }
}
