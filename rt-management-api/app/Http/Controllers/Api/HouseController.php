<?php

namespace App\Http\Controllers\Api;

use App\Models\House;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreHouseRequest;
use App\Http\Requests\UpdateHouseRequest;

use App\Http\Resources\HouseResource;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    public function index(Request $request)
    {
        $query = House::query()
            ->with('currentResident.resident');

        if ($request->filled('search')) {

            $query->where(

                'house_number',

                'like',

                '%' . $request->search . '%'

            );

        }


        if ($request->filled('status')) {
            $query->where(
                'status',
                $request->status
            );
        }

        return HouseResource::collection(
            $query->paginate()
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