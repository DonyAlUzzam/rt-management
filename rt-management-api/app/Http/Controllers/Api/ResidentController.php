<?php

namespace App\Http\Controllers\Api;

use App\Models\Resident;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreResidentRequest;
use App\Http\Requests\UpdateResidentRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ResidentResource;

class ResidentController extends Controller
{
    public function index(Request $request)
    {

        $query = Resident::query();

        if ($request->filled('search')) {

            $query->where(

                'full_name',

                'like',

                '%' . $request->search . '%'

            );

        }

        $residents =

            $query

            ->latest()

            ->paginate(10);

        return ResidentResource::collection(

            $residents

        );

    }

    public function availableResident(Request $request)
    {
        $query = Resident::query()
            ->whereDoesntHave('occupancies', function ($query) {
                $query->where('is_active', true);
            });

        $residents =

            $query

            ->latest()
            ->paginate(10);

        // return response()->json([
        //     'data' => $query
        // ]);

        return ResidentResource::collection(

            $residents

        );
    }

    public function store(StoreResidentRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('ktp_photo')) {

            $data['ktp_photo'] =
                $request->file('ktp_photo')
                    ->store('ktp', 'public');
        }

        $resident = Resident::create($data);

        return new ResidentResource($resident);
    }

    public function show(Resident $resident)
    {
        return new ResidentResource($resident);
    }

    public function update(
        UpdateResidentRequest $request,
        Resident $resident
    ) {

        $data = $request->validated();

        if ($request->hasFile('ktp_photo')) {

            $data['ktp_photo'] =
                $request->file('ktp_photo')
                    ->store('ktp', 'public');
        }

        $resident->update($data);

        return new ResidentResource($resident);
    }

    public function destroy(Resident $resident)
    {
        if ($resident->occupancies()->exists()) {
            return response()->json([
                'message' => 'Resident has occupancy history'
            ], 422);
        }
        
        $resident->delete();

        return response()->json([
            'message' => 'Resident deleted'
        ]);
    }
}