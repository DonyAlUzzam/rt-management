<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        $query = Expense::with('category');

        return ExpenseResource::collection(
            $query->paginate()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'expense_category_id' =>
                'required|exists:expense_categories,id',

            'expense_date' =>
                'required|date',

            'description' =>
                'nullable|string',

            'amount' =>
                'required|numeric|min:1'
        ]);

        $expense = Expense::create(
            $validated
        );

        return response()->json([
            'message' => 'Expense created',
            'data' => $expense->load('category')
        ], 201);
    }

    public function show(Expense $expense)
    {
        return $expense->load(
            'category'
        );
    }

    public function update(
        Request $request,
        Expense $expense
    ) {

        $validated = $request->validate([
            'expense_category_id' =>
                'required|exists:expense_categories,id',

            'expense_date' =>
                'required|date',

            'description' =>
                'nullable|string',

            'amount' =>
                'required|numeric|min:1'
        ]);

        $expense->update(
            $validated
        );

        return response()->json([
            'message' => 'Expense updated',
            'data' => $expense->load('category')
        ]);
    }

    public function destroy(
        Expense $expense
    ) {

        $expense->delete();

        return response()->json([
            'message' => 'Expense deleted'
        ]);
    }
}