<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Place;
use App\Models\Contest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;


class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $characters = Character::all();
        return Inertia::render('Character/Index', [
            'characters' => $characters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Character/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'is_enemy' => ['required','boolean'],
            'defence' => ['required', 'integer', 'max:3', 'min:0'],
            'strength' => ['required', 'integer', 'max:20', 'min:0'],
            'accuracy' => ['required', 'integer', 'max:20', 'min:0'],
            'magic' => ['required', 'integer', 'max:20', 'min:0'],
        ]);

        if($validated['is_enemy'] && !Auth::user()->is_admin){
            return redirect()->back()->withErrors(['unauthorized' => 'Unauthorized action!']);
        }

        $validated['user_id'] = Auth::id();
        $sumOfStats = $validated['defence'] + $validated['strength'] + $validated['accuracy'] + $validated['magic'];

        if ($sumOfStats !== 20) {
            return redirect()->back()->withErrors(['stats' => 'The sum of defence, strength, accuracy, and magic must be 20.']);
        }

        Character::create($validated);
        Session::flash('message', 'characters.store');
        return to_route('characters.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Character $character)
    {
        // $id = (int)$id;

        $user_id = Auth::user()->id;
        $id = $character->id;

        // $character = Character::find($id);

        // if (!$character) {
        //     return Inertia::render('404');
        // }
        $character_userId = $character->user_id;

        if(!$character->is_enemy){
            $data = DB::table('character_contest')
                ->join('characters', 'character_contest.enemy_id', '=', 'characters.id')
                ->join('contests', 'character_contest.contest_id', '=', 'contests.id')
                ->join('places', 'contests.place_id', '=', 'places.id')
                ->where('character_id', $id)
                ->select(
                    'characters.name as enemy_name',
                    'places.image as place_image',
                    'places.name as place_name',
                    'contests.id as contest_id',
                    'contests.history',
                    'contests.created_at as contest_date',
                    'contests.win',
                )
                ->get();

        }else{
            $data = DB::table('character_contest')
                ->join('characters', 'character_contest.character_id', '=', 'characters.id')
                ->join('contests', 'character_contest.contest_id', '=', 'contests.id')
                ->join('places', 'contests.place_id', '=', 'places.id')
                ->where('enemy_id', $id)
                ->select(
                    'characters.name as enemy_name',
                    'places.image as place_image',
                    'places.name as place_name',
                    'contests.id as contest_id',
                    'contests.history',
                    'contests.created_at as contest_date',
                    'contests.win'

                )
                ->get();
        }

        if ($user_id !== $character_userId) {
            return to_route('characters.index');
        }

        return Inertia::render('Character/Show', [
            'character' => $character,
            'contests' => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $character = Character::find($id);

        $user = Auth::user();

        if (!$character) {
            return to_route('characters.index');
        }
        if (($user->id != $character->user_id) and ($user->is_admin !== 1)) {
            return to_route('characters.index');
        }



        return Inertia::render('Character/Edit', [
            'character' => Character::find((int)$id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $character = Character::find((int)$id);

        $user = Auth::user();

        if (!$character) {
            return to_route('characters.index');
        }
        if ($user->id !== $character->user_id and $user->is_admin !== 1) {
            return to_route('characters.index');
        }

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'is_enemy' => ['required','boolean'],
            'defence' => ['required', 'integer', 'max:3', 'min:0'],
            'strength' => ['required', 'integer', 'max:20', 'min:0'],
            'accuracy' => ['required', 'integer', 'max:20', 'min:0'],
            'magic' => ['required', 'integer', 'max:20', 'min:0'],
        ]);
        $sumOfStats = $validated['defence'] + $validated['strength'] + $validated['accuracy'] + $validated['magic'];

        if ($sumOfStats !== 20) {
            return redirect()->back()->withErrors(['stats' => 'The sum of defence, strength, accuracy, and magic must be 20.']);
        }
        $character->update($validated);

        Session::flash('message', 'characters.update');
        return to_route('characters.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character)
    {
        $user = Auth::user();

        if (!$character) {
            return to_route('characters.index');
        }
        if ($user->id !== $character->user_id and $user->is_admin !== 1) {
            return to_route('characters.index');
        }

        $character->delete();
        Session::flash('message', 'characters.destroy');

        return to_route('characters.index');
    }
}
