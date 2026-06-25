<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;

use App\Models\House;
use App\Models\HouseOccupancy;

use App\Http\Controllers\Controller;

use App\Http\Requests\AssignResidentRequest;

class HouseOccupancyController extends Controller
{
    public function assign(
        AssignResidentRequest $request
    ) {

        $house = House::findOrFail(
            $request->house_id
        );

        $activeHouseOccupancy =
            HouseOccupancy::where('house_id', $house->id)
            ->where('is_active', true)
            ->first();

        $activeOccupancy = HouseOccupancy::where(
            'resident_id',
            $request->resident_id
        )
        ->where('is_active', true)
        ->first();
        
        if ($activeOccupancy) {
            return response()->json([
                'message' => 'Resident already occupies another house'
            ], 422);
        }

        if ($activeHouseOccupancy) {

            $activeHouseOccupancy->update([
                'is_active' => false,
                'end_date' => Carbon::today()
            ]);
        }

        HouseOccupancy::create([

            'house_id' => $request->house_id,

            'resident_id' => $request->resident_id,

            'start_date' => $request->start_date ?? Carbon::today(),

            'is_active' => true
        ]);

        $house->update([
            'status' => 'occupied'
        ]);

        return response()->json([
            'message' => 'Resident assigned'
        ]);
    }

    public function history(
        House $house
        )
    {
        return $house
            ->occupancies()
            ->with('resident')
            ->orderByDesc('start_date')
            ->get();
    }

    public function checkout(House $house)
    {
        $occupancy = $house->occupancies()
            ->where('is_active', true)
            ->first();

        if (!$occupancy) {
            return response()->json([
                'message' => 'No active resident'
            ], 422);
        }

        $occupancy->update([
            'is_active' => false,
            'end_date' => now()
        ]);

        $house->update([
            'status' => 'vacant'
        ]);

        return response()->json([
            'message' => 'Resident checked out'
        ]);
    }

    public function currentResident(House $house)
    {
        $occupancy = $house->occupancies()
            ->with('resident')
            ->where('is_active', true)
            ->first();

        return response()->json($occupancy);
    }
}