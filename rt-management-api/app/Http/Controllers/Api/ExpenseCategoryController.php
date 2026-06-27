<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        return ExpenseCategory::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $category = ExpenseCategory::create($validated);

        return response()->json([
            'message' => 'Expense category created',
            'data' => $category
        ], 201);
    }

    public function show(ExpenseCategory $expenseCategory)
    {
        return $expenseCategory;
    }

    public function update(
        Request $request,
        ExpenseCategory $expenseCategory
    ) {

        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $expenseCategory->update($validated);

        return response()->json([
            'message' => 'Expense category updated',
            'data' => $expenseCategory
        ]);
    }

    public function destroy(
        ExpenseCategory $expenseCategory
    ) {

        $expenseCategory->delete();

        return response()->json([
            'message' => 'Expense category deleted'
        ]);
    }
}