<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\Payment;
use Carbon\Carbon;
use App\Models\House;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function summary(Request $request)
    {
        $year = $request->get(
            'year',
            now()->year
        );

        $summary = [];

        for ($month = 1; $month <= 12; $month++) {

            $income = Payment::whereYear(
                    'payment_date',
                    $year
                )
                ->whereMonth(
                    'payment_date',
                    $month
                )
                ->sum('total_amount');

            $expense = Expense::whereYear(
                    'expense_date',
                    $year
                )
                ->whereMonth(
                    'expense_date',
                    $month
                )
                ->sum('amount');

            $summary[] = [

                'month' => $month,

                'month_name' => Carbon::create()
                    ->month($month)
                    ->translatedFormat('F'),

                'income' => $income,

                'expense' => $expense,

                'balance' => $income - $expense
            ];
        }

        $totalIncome = collect($summary)->sum('income');

        $totalExpense = collect($summary)->sum('expense');

        $totalBalance = collect($summary)->sum('balance');

        return response()->json([

            'year' => (int) $year,

            'total_income' => $totalIncome,

            'total_expense' => $totalExpense,

            'total_balance' => $totalBalance,

            'summary' => $summary
        ]);
    }

    public function monthlyDetail(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|min:2020'
        ]);

        $month = $request->month;
        $year = $request->year;

        $payments = Payment::with([
            'details.bill.billType',
            'details.bill.house.activeOccupancy.resident'
        ])
        ->whereYear(
            'payment_date',
            $year
        )
        ->whereMonth(
            'payment_date',
            $month
        )
        ->orderBy('payment_date')
        ->get();

        $expenses = Expense::with('category')
            ->whereYear('expense_date', $year)
            ->whereMonth('expense_date', $month)
            ->orderBy('expense_date')
            ->get();

        return response()->json([

            'month' => $month,

            // 'month_name' => Carbon::create()
            //     ->month($month)
            //     ->translatedFormat('F'),

            'month_name' => Carbon::create(
                $year,
                $month,
                1
            )->translatedFormat('F'),

            'year' => $year,

            'summary' => [

                'total_income' =>
                    $payments->sum('total_amount'),

                'total_expense' =>
                    $expenses->sum('amount'),

                'balance' =>
                    $payments->sum('total_amount')
                    - $expenses->sum('amount')
            ],

            'income' => $payments->map(function ($payment) {

                $firstBill = $payment->details->first()?->bill;

                $house = $firstBill?->house;

                $resident = $house?->activeOccupancy?->resident;

                return [

                    'payment_id' => $payment->id,

                    'payment_date' => $payment->payment_date,

                    'house_number' => $house?->house_number,

                    'resident_name' => $resident?->full_name,

                    'total_amount' => $payment->total_amount,

                    'notes' => $payment->notes,

                    'bill_count' => $payment->details->count(),

                    'bills' => $payment->details->map(function ($detail) {

                        return [

                            'bill_type' => $detail->bill->billType->name,

                            'period' =>
                                sprintf(
                                    '%02d/%04d',
                                    $detail->bill->period_month,
                                    $detail->bill->period_year
                                ),

                            'amount' => $detail->amount
                        ];

                    })
                ];

            }),

            'expenses' => $expenses->map(function ($expense) {

                return [

                    'expense_id' => $expense->id,

                    'expense_date' => $expense->expense_date,

                    'category' => $expense->category->name,

                    'description' => $expense->description,

                    'amount' => $expense->amount,
                ];

            }),
        ]);
    }

    public function dashboard2()
    {
        $data = [
            'statistics' => [
                'total_houses'     => 20,
                'occupied_houses'  => 18,
                'vacant_houses'    => 2,
                'monthly_income'   => 2500000,
                'monthly_expense'  => 750000,
                'balance'          => 1750000,
            ],
            'monthly_chart' => [
                [
                    'month'   => 'Jan',
                    'income'  => 2500000,
                    'expense' => 1000000,
                ],
                [
                    'month'   => 'Feb',
                    'income'  => 3000000,
                    'expense' => 1200000,
                ],
                [
                    'month'   => 'Mar',
                    'income'  => 2800000,
                    'expense' => 800000,
                ],
            ],
            'recent_payments' => [
                [
                    'house_number'  => 'A-01',
                    'resident_name' => 'Budi',
                    'receipt_number'=> 'PAY20260625001',
                    'amount'        => 150000,
                    'payment_date'  => '2026-06-25',
                ],
            ],
            'recent_expenses' => [
                [
                    'category'     => 'Cleaning',
                    'description'  => 'Cleaning Equipment',
                    'amount'       => 300000,
                    'expense_date' => '2026-06-22',
                ],
                [
                    'category'     => 'Electricity',
                    'description'  => 'PLN June',
                    'amount'       => 500000,
                    'expense_date' => '2026-06-25',
                ],
            ],
        ];

        return response()->json($data);
    }

    public function dashboard()
    {
        return response()->json([

            'statistics' =>

                $this->statistics(),

            'monthly_chart' =>

                $this->monthlyChart(),

            'recent_payments' =>

                $this->recentPayments(),

            'recent_expenses' =>

                $this->recentExpenses()

        ]);
    }

    private function statistics(): array
    {
        $now = Carbon::now();

        $totalHouses = House::count();

        $occupiedHouses = House::where(
            'status',
            'occupied'
        )->count();

        $vacantHouses = House::where(
            'status',
            'vacant'
        )->count();

        $monthlyIncome = Payment::whereYear(
                'payment_date',
                $now->year
            )
            ->whereMonth(
                'payment_date',
                $now->month
            )
            ->sum('total_amount');

        $monthlyExpense = Expense::whereYear(
                'expense_date',
                $now->year
            )
            ->whereMonth(
                'expense_date',
                $now->month
            )
            ->sum('amount');

        return [

            'total_houses'      => $totalHouses,

            'occupied_houses'   => $occupiedHouses,

            'vacant_houses'     => $vacantHouses,

            'monthly_income'    => (float) $monthlyIncome,

            'monthly_expense'   => (float) $monthlyExpense,

            'balance'           => (float) (
                $monthlyIncome - $monthlyExpense
            ),

        ];
    }

    private function recentPayments(): array
    {
        return Payment::query()

            ->with([

                'resident:id,full_name'

            ])

            ->latest('payment_date')

            ->limit(5)

            ->get()

            ->map(function ($payment) {

                return [

                    'payment_id' => $payment->id,

                    'house_number' => $payment->house?->house_number,

                    'resident_name' => $payment->resident?->full_name,

                    'receipt_number' => $payment->receipt_number,

                    'amount' => (float) $payment->total_amount,

                    'payment_date' => $payment->payment_date
                        ->format('Y-m-d'),

                ];

            })

            ->toArray();
    }

    private function monthlyChart(): array
    {
        $year = Carbon::now()->year;

        $income = Payment::query()
            ->selectRaw('
                MONTH(payment_date) as month,
                SUM(total_amount) as total
            ')
            ->whereYear(
                'payment_date',
                $year
            )
            ->groupBy(
                DB::raw('MONTH(payment_date)')
            )
            ->pluck(
                'total',
                'month'
            );

        $expense = Expense::query()
            ->selectRaw('
                MONTH(expense_date) as month,
                SUM(amount) as total
            ')
            ->whereYear(
                'expense_date',
                $year
            )
            ->groupBy(
                DB::raw('MONTH(expense_date)')
            )
            ->pluck(
                'total',
                'month'
            );

        $months = [

            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'May',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Aug',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Dec',

        ];

        $result = [];

        foreach ($months as $number => $name) {

            $result[] = [

                'month' => $name,

                'income' => (float) (
                    $income[$number] ?? 0
                ),

                'expense' => (float) (
                    $expense[$number] ?? 0
                ),

            ];

        }

        return $result;
    }

    private function recentExpenses(): array
    {
        return Expense::query()

            ->with([

                'category:id,name'

            ])

            ->latest(
                'expense_date'
            )

            ->limit(5)

            ->get()

            ->map(function ($expense) {

                return [

                    'expense_id' => $expense->id,

                    'category' => $expense->category?->name,

                    'description' => $expense->description,

                    'amount' => (float) $expense->amount,

                    'expense_date' => $expense->expense_date
                        ->format('Y-m-d'),

                ];

            })

            ->toArray();
    }
}
