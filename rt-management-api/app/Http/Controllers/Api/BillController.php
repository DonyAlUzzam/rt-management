<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\GenerateBillRequest;
use App\Models\House;
use App\Models\Bill;
use App\Models\BillType;
use App\Http\Resources\BillResource;

class BillController extends Controller
{
    public function index(Request $request)
    {
        $query = Bill::with([
            'house',
            'resident',
            'billType'
        ]);

        if ($request->filled('search')) {

            $query->where(

                'period_month',

                'like',

                '%' . $request->search . '%'

            )->orWhereHas('resident', function ($resident) use ($request) {

                $resident->where(
                    'full_name',
                    'like',
                    "%{$request->search}%"
                );

            });


        }

        if ($request->status) {

            $query->where(
                'status',
                $request->status
            );
        }

        if ($request->month) {

            $query->where(
                'period_month',
                $request->month
            );
        }

        if ($request->year) {

            $query->where(
                'period_year',
                $request->year
            );
        }

        $billings =

            $query

            ->latest()

            ->paginate(10);

        return BillResource::collection(

            $billings

        );
    }

    public function show(Bill $bill)
    {
        $bill->load([
            'house',
            'resident',
            'billType',
            'paymentDetails.payment'
        ]);

        return new BillResource($bill);
    }

    public function generate(GenerateBillRequest $request)
    {
        $month = $request->month;
        $year = $request->year;

        $houses = House::where(
            'status',
            'occupied'
        )->with('currentResident.resident')
        ->get();

        $billTypes = BillType::all();

        $generated = 0;

        foreach ($houses as $house) {

            $occupancy = $house->currentResident;

            if (!$occupancy) {
                continue;
            }

            foreach ($billTypes as $billType) {

                $exists = Bill::where([
                    'house_id' => $house->id,
                    'bill_type_id' => $billType->id,
                    'period_month' => $month,
                    'period_year' => $year
                ])->exists();

                if ($exists) {
                    continue;
                }

                Bill::create([
                    'house_id' => $house->id,
                    'resident_id' => $occupancy->resident_id,
                    'bill_type_id' => $billType->id,
                    'period_month' => $month,
                    'period_year' => $year,
                    'amount' => $billType->amount,
                    'status' => 'unpaid'
                ]);

                $generated++;
            }
        }

        return response()->json([
            'message' => 'Bills generated',
            'generated_count' => $generated
        ]);
    }

    public function houseBills( House $house )
    {
        return Bill::with([
            'billType',
            'resident'
        ])
        ->where(
            'house_id',
            $house->id
        )
        ->orderByDesc('period_year')
        ->orderByDesc('period_month')
        ->get();
    }

    public function houseBillSummary(House $house,Request $request)
    {
        $month = $request->month;
        $year = $request->year;

        $bills = Bill::with([
                'billType',
                'resident'
            ])
            ->where('house_id', $house->id)
            ->where('period_month', $month)
            ->where('period_year', $year)
            ->get();

        if ($bills->isEmpty()) {

            return response()->json([
                'message' => 'No bills found'
            ], 404);
        }

        $totalBill = $bills->sum('amount');

        $totalPaid = $bills
            ->where('status', 'paid')
            ->sum('amount');

        return response()->json([

            'house_id' => $house->id,

            'house_number' => $house->house_number,

            'resident_name' => optional(
                $bills->first()->resident
            )->full_name,

            'month' => $month,

            'year' => $year,

            'total_bill' => $totalBill,

            'total_paid' => $totalPaid,

            'remaining' => $totalBill - $totalPaid,

            'status' => $totalBill == $totalPaid
                ? 'paid'
                : 'unpaid',

            'details' => $bills->map(function ($bill) {

                return [

                    'bill_id' => $bill->id,

                    'bill_type' => $bill->billType->name,

                    'amount' => $bill->amount,

                    'status' => $bill->status
                ];
            })
        ]);
    }

    public function monthlySummary(Request $request)
    {
        $month = $request->month;
        $year = $request->year;

        $bills = Bill::with([
                'house',
                'resident'
            ])
            ->where('period_month', $month)
            ->where('period_year', $year)
            ->get()
            ->groupBy('house_id');

        return $bills->map(function ($items) {

            return [

                'house_id' =>
                    $items->first()->house_id,

                'house_number' =>
                    $items->first()->house->house_number,

                'resident_name' =>
                    optional(
                        $items->first()->resident
                    )->full_name,

                'total_bill' =>
                    $items->sum('amount'),

                'status' =>
                    $items->every(
                        fn ($bill) =>
                            $bill->status === 'paid'
                    )
                        ? 'paid'
                        : 'unpaid'
            ];
        })->values();
    }

    public function billingStatistics( Request $request )
    {
        $month = $request->month;
        $year = $request->year;

        $bills = Bill::where(
            'period_month',
            $month
        )
        ->where(
            'period_year',
            $year
        );

        return response()->json([

            'total_bills' =>
                $bills->count(),

            'paid_bills' =>
                (clone $bills)
                    ->where('status', 'paid')
                    ->count(),

            'unpaid_bills' =>
                (clone $bills)
                    ->where('status', 'unpaid')
                    ->count(),

            'total_amount' =>
                $bills->sum('amount')
        ]);
    }

    public function outstandingBills(House $house)
    {
        $bills = Bill::with([
                'billType'
            ])
            ->where('house_id', $house->id)
            ->where('status', 'unpaid')
            ->orderBy('period_year')
            ->orderBy('period_month')
            ->get();

        return response()->json([
            'house_id' => $house->id,
            'house_number' => $house->house_number,
            'total_outstanding' => $bills->sum('amount'),
            'bills' => $bills->map(function ($bill) {
                return [
                    'bill_id' => $bill->id,
                    'bill_type' => $bill->billType->name,
                    'period_month' => $bill->period_month,
                    'period_year' => $bill->period_year,
                    'amount' => $bill->amount,
                    'status' => $bill->status,
                ];
            }),
        ]);
    }

    public function outstandingSummary(
        House $house
    )
    {
        $bills = Bill::where(
            'house_id',
            $house->id
        )
        ->where(
            'status',
            'unpaid'
        )
        ->get();

        return response()->json([

            'house_id' =>
                $house->id,

            'house_number' =>
                $house->house_number,

            'total_unpaid_bills' =>
                $bills->count(),

            'total_outstanding' =>
                $bills->sum('amount')
        ]);
    }
}
