<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;

use App\Models\Bill;
use App\Models\Payment;
use App\Models\PaymentDetail;
use App\Models\House;
use App\Http\Resources\PaymentResource;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use Illuminate\Http\Request;
class PaymentController extends Controller
{
    public function index(Request $request)
    {
        // return Payment::withCount(
        //     'details'
        // )
        // ->latest()
        // ->paginate(20);

        $query = Payment::query()
            ->withCount('details');

        return PaymentResource::collection(
            $query->paginate()
        );
    }

    public function store(
        StorePaymentRequest $request
    ) {

        $payment = DB::transaction(function () use ($request) {
            $bills = Bill::whereIn(
                'id',
                $request->bill_ids
            )->lockForUpdate()->get();

            if (
                $bills->count()
                !== count($request->bill_ids)
            ) {

                throw new \Exception(
                    'Some bills not found'
                );
            }

            $house = House::find(
                $bills->first()->house_id
            );

            if (!$house) {
                throw new \Exception(
                    'House not found'
                );
            }

            // if ($house->status !== 'occupied') {

            //     throw new \Exception(
            //         'House is not occupied'
            //     );
            // }

            $houseIds = $bills
                ->pluck('house_id')
                ->unique();

            if ($houseIds->count() > 1) {

                throw new \Exception(
                    'All bills must belong to the same house'
                );
            }

            $paidBill = $bills->firstWhere(
                'status',
                'paid'
            );

            if ($paidBill) {

                throw new \Exception(
                    'Bill already paid'
                );
            }

            $totalAmount =
                $bills->sum('amount');

            $receiptNumber =
                'PAY-' .
                now()->format('YmdHis');

            $payment = Payment::create([

                'receipt_number' =>
                    $receiptNumber,

                'resident_payment' =>
                    $request->resident_id,

                'house_id' => $house->id,

                'payment_date' =>
                    $request->payment_date,

                'total_amount' =>
                    $totalAmount,

                'notes' =>
                    $request->notes
            ]);

            foreach ($bills as $bill) {

                PaymentDetail::create([

                    'payment_id' =>
                        $payment->id,

                    'bill_id' =>
                        $bill->id,

                    'amount' =>
                        $bill->amount
                ]);

                $bill->update([
                    'status' => 'paid'
                ]);
            }

            return $payment;
        });

        return response()->json([
            'message' => 'Payment success',
            'payment_id' => $payment->id,
            'resident_id' => $request->resident_id,
            'receipt_number' => $payment->receipt_number
        ]);
    }

    public function show(
        Payment $payment
    )
    {
        return new PaymentResource(

            $payment->load([

                'resident',

                'details.bill.billType'
            ])
        );
    }
}