<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->is_admin !== 1) {
            return to_route('index');
        }

        $places = Place::all();
        return Inertia::render('Place/Index',['places' =>$places]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $user = Auth::user();
        if (($user->is_admin !== 1)) {
            return to_route('index');
        }
        return Inertia::render('Place/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->is_admin !== 1) {
            return to_route('index');
        }

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['string'],
            'image' => ['required','url'],
        ]);

        $validated['user_id'] = Auth::id();

        Place::create($validated);
        Session::flash('message', 'places.created');
        return to_route('places.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Place $place)
    {
        $user = Auth::user();
        if (($user->is_admin !== 1)) {
            return to_route('index');
        }

        return Inertia::render('Place/Edit', [
            'place' => $place
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        $user = Auth::user();

        if ($user->is_admin !== 1) {
            return to_route('index');
        }
        if (!$place) {
            return to_route('places.index');
        }

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['string'],
            'image' => ['required','url'],

        ]);

        $place->update($validated);
        Session::flash('message','places.edited');
        return to_route('places.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        $user = Auth::user();

        if (!$place || !$user->is_admin) {
            return to_route('index');
        }

        $place->delete();
        Session::flash('message', 'places.deleted');
        return to_route('places.index');
    }

}
