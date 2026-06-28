<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Payment;
use App\Models\PaymentDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {

            $groups = Bill::query()

                ->whereIn(
                    'period_month',
                    [4,5,6]
                )

                ->where(
                    'status',
                    'unpaid'
                )

                ->orderBy('house_id')

                ->get()

                ->groupBy(function ($bill) {

                    return
                        $bill->house_id .
                        '-' .
                        $bill->period_month;

                });

            $running = 1;

            foreach ($groups as $bills) {

                $firstBill = $bills->first();

                $payment = Payment::create([

                    'receipt_number' =>

                        'PAY2026' .
                        str_pad(
                            $running++,
                            5,
                            '0',
                            STR_PAD_LEFT
                        ),
                    
                    'resident_payment' => $firstBill->resident_id,

                    'payment_date' =>

                        now()->subDays(
                            rand(0,30)
                        ),

                    'total_amount' =>

                        $bills->sum('amount'),

                    'notes' =>

                        'Seeder Payment',

                ]);

                foreach ($bills as $bill) {

                    PaymentDetail::create([

                        'payment_id' =>

                            $payment->id,

                        'bill_id' =>

                            $bill->id,

                        'amount' =>

                            $bill->amount,

                    ]);

                    $bill->update([

                        'status' => 'paid'

                    ]);

                }

            }

        });
    }
}