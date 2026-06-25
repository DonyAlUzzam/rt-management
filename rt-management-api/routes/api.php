<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ResidentController;
use App\Http\Controllers\Api\HouseController;
use App\Http\Controllers\Api\HouseOccupancyController;

Route::apiResource(
    'residents',
    ResidentController::class
);

Route::prefix('houses')->group(function () {

    Route::get(
        '/vacant',
        [HouseController::class, 'vacant']
    );

    Route::get(
        '/occupied',
        [HouseController::class, 'occupied']
    );

    Route::post(
        'assign-resident',
        [HouseOccupancyController::class, 'assign']
    );

    Route::post(
        '{house}/checkout',
        [HouseOccupancyController::class, 'checkout']
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
});

Route::apiResource(
    'houses',
    HouseController::class
);