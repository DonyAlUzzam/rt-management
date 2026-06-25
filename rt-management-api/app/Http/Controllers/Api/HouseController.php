<?php

namespace App\Http\Controllers\Api;

use App\Models\House;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreHouseRequest;
use App\Http\Requests\UpdateHouseRequest;

use App\Http\Resources\HouseResource;

class HouseController extends Controller
{
    public function index()
    {
        return HouseResource::collection(
            House::with(
                'currentResident.resident'
            )->get()
        );
    }

    public function store(
        StoreHouseRequest $request
    ) {

        $house = House::create(
            $request->validated()
        );

        return new HouseResource($house);
    }

    public function show(House $house)
    {
        $house->load(
            'currentResident.resident'
        );

        return new HouseResource($house);
    }

    public function update(
        UpdateHouseRequest $request,
        House $house
    ) {

        $house->update(
            $request->validated()
        );

        return new HouseResource($house);
    }

    public function destroy(House $house)
    {
        if ($house->occupancies()->exists()) {
            return response()->json([
                'message' => 'House has occupancy history'
            ], 422);
        }

        $house->delete();

        return response()->json([
            'message' => 'House deleted'
        ]);
    }

    public function vacant()
    {
        $houses = House::where('status', 'vacant')
            ->orderBy('house_number')
            ->get();

        return HouseResource::collection($houses);
    }

    public function occupied()
    {
        $houses = House::with([
                'currentResident.resident'
            ])
            ->where('status', 'occupied')
            ->orderBy('house_number')
            ->get();

        return HouseResource::collection($houses);
    }

    public function statistics()
    {
        return response()->json([
            'total_houses' => House::count(),

            'occupied_houses' => House::where(
                'status',
                'occupied'
            )->count(),

            'vacant_houses' => House::where(
                'status',
                'vacant'
            )->count(),
        ]);
    }
}