<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ExpenseCategory::all();

        $months = [4, 5, 6, 7, 8, 9];

        foreach ($months as $month) {

            foreach ($categories as $category) {

                Expense::create([

                    'expense_category_id' => $category->id,

                    'expense_date' => now()

                        ->setYear(2026)

                        ->setMonth($month)

                        ->setDay(rand(1, 28)),

                    'description' => match ($category->name) {

                        'Listrik' =>
                            'Pembayaran listrik bulan ' . $month,

                        'Internet' =>
                            'Pembayaran internet bulan ' . $month,

                        'Kebersihan' =>
                            'Pembelian alat kebersihan',

                        'Perawatan' =>
                            'Perawatan fasilitas lingkungan',

                        default =>
                            'Pengeluaran operasional'

                    },

                    'amount' => match ($category->name) {

                        'Listrik' => rand(450000, 650000),

                        'Internet' => rand(300000, 450000),

                        'Kebersihan' => rand(100000, 250000),

                        'Perawatan' => rand(250000, 800000),

                        default => rand(100000, 500000)

                    }

                ]);

            }

        }
    }
}