<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ResidentController;
use App\Http\Controllers\Api\HouseController;
use App\Http\Controllers\Api\HouseOccupancyController;
use App\Http\Controllers\Api\BillController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ExpenseCategoryController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\ReportController;

Route::apiResource(
    'residents',
    ResidentController::class
);

Route::prefix('occupancies')->group(function () {
    Route::post(
        'assign-resident',
        [HouseOccupancyController::class, 'assign']
    );

    Route::post(
        '{house}/checkout',
        [HouseOccupancyController::class, 'checkout']
    );

    Route::get(
        'available-residents',
        [ResidentController::class, 'availableResident']
    );
});

Route::prefix('houses')->group(function () {

    Route::get(
        '{house}/bills',
        [BillController::class, 'houseBills']
    );

    Route::get(
        '{house}/bill-summary',
        [BillController::class, 'houseBillSummary']
    );

    Route::get(
        '{house}/history',
        [HouseOccupancyController::class, 'history']
    );

    Route::get(
        '{house}/current-resident',
        [HouseOccupancyController::class, 'currentResident']
    );

    Route::get(
        '/house-statistics',
        [HouseController::class, 'statistics']
    );

    Route::get(
        '{house}/outstanding-bills',
        [BillController::class, 'outstandingBills']
    );

    Route::get(
        '{house}/outstanding-summary',
        [BillController::class, 'outstandingSummary']
    );
});

Route::apiResource(
    'houses',
    HouseController::class
);

Route::prefix('billing')->group(function () {

    Route::get(
        '/monthly-summary',
        [BillController::class, 'monthlySummary']
    );

    Route::get(
        '/statistics',
        [BillController::class, 'billingStatistics']
    );

    Route::post(
        '/generate',
        [BillController::class, 'generate']
    );

});

Route::prefix('bills')->group(function () {

    Route::get(
        '/',
        [BillController::class, 'index']
    );

    Route::get(
        '{bill}',
        [BillController::class, 'show']
    );

});

Route::prefix('payments')->group(function () {

    Route::get(
        '/',
        [PaymentController::class, 'index']
    );

    Route::post(
        '/',
        [PaymentController::class, 'store']
    );

    Route::get(
        '{payment}',
        [PaymentController::class, 'show']
    );

});

Route::prefix('dashboard')->group(function () {

    Route::get(
        'houses',
        [HouseController::class, 'statistics']
    );

    Route::get(
        'billing',
        [BillController::class, 'billingStatistics']
    );

});

Route::apiResource(
    'expense-categories',
    ExpenseCategoryController::class
);

Route::apiResource(
    'expenses',
    ExpenseController::class
);

Route::prefix('reports')->group(function () {

    Route::get(
        '/summary',
        [ReportController::class, 'summary']
    );

    Route::get(
        '/monthly-detail',
        [ReportController::class, 'monthlyDetail']
    );

});

Route::get(
        '/dashboard',
        [ReportController::class, 'dashboard']
    );
