<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use App\Models\Character;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class ContestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userCharacters = Character::where('user_id', '=', Auth::id())->get();
        return Inertia::render('Contest/Create', [
            'userCharacters' => $userCharacters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $characterId = $request['id'];

        $enemy = Character::inRandomOrder()
            ->where('id', '!=', $characterId)
            ->where('is_enemy', '=', true)
            ->first();

        $newContest = [
            'user_id' => Auth::id(),
            'place_id' => Place::inRandomOrder()->first()->id,
            'history' => [],
            'win' => null,
        ];


        $createdContest = Contest::create($newContest);


        $createdContest->characters()->attach($characterId,  [
            'hero_hp' => 20,
            'enemy_hp' => 20,
            'enemy_id' => $enemy->id,
        ]);

        $createdContest->characters()->sync($characterId);

        return to_route('contests.show', $createdContest->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contest $contest)
    {
        $contest_characters = DB::table('character_contest')->where('contest_id', $contest->id)->get()->first();

        $enemyId = $contest_characters->enemy_id;
        $characterId = $contest_characters->character_id;


        return Inertia::render('Contest/Show', [
            'enemy_hp' => $contest_characters->enemy_hp,
            'character_hp' => $contest_characters->hero_hp,
            'contest' => $contest,
            'enemy' => Character::find($enemyId),
            'place' => Place::find($contest->place_id),
            'character' => Character::find($characterId),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contest $contest)
    {
        $contestId = $contest->id;
        $contest_characters = DB::table('character_contest')->where('contest_id', $contestId)->get()->first();

        if (!isset($request['attackType'])) {
            return redirect()->back();
        }

        $character = Character::find($contest_characters->character_id);
        $character->hp = $contest_characters->hero_hp;

        $enemy = Character::find($contest_characters->enemy_id);
        $enemy->hp = $contest_characters->enemy_hp;

        $attackTypes = ['melee', 'ranged', 'magic'];
        $randomAttackType = $attackTypes[array_rand($attackTypes)];

        $damage = $this->calculateDamage($character, $enemy, $request['attackType']);
        $enemyDamage = $this->calculateDamage($enemy, $character, $randomAttackType);


        $newEnemyHp = $contest_characters->enemy_hp - $damage;
        $newHeroHp = $contest_characters->hero_hp - $enemyDamage;

        $history = $contest->history ?? [];

        $history[] = [
            'attacker' =>  'hero',
            'attackType' => $request['attackType'],
            'damage' =>  $damage
        ];

        if ($newEnemyHp <= 0) {

            $contest->win = true;
            $newData = [
                'enemy_hp' =>  0,
            ];

        } else if ($newHeroHp <= 0) {
            $history[] = [
                'attacker' =>  'enemy',
                'attackType' => $randomAttackType,
                'damage' =>  $enemyDamage,
            ];

            $contest->win = false;

            $newData = [
                'hero_hp' => 0,
            ];
        } else {

            $history[] = [
                'attacker' =>  'enemy',
                'attackType' => $randomAttackType,
                'damage' =>  $enemyDamage,
            ];
            $newData = [
                'enemy_hp' => $newEnemyHp,
                'hero_hp' => $newHeroHp,
            ];
        }

        DB::table('character_contest')
            ->where('contest_id', $contestId)
            ->update($newData);

        $contest->history = $history;
        $contest->save();
    }

    private function calculateDamage(Character $attacking, Character $defending, string $attackType)
    {
        switch ($attackType) {
            case 'melee':
                $baseDamage = (($attacking->strength * 0.7 + $attacking->accuracy * 0.1 + $attacking->magic * 0.1) - $defending->defence);
                break;
            case 'ranged':
                $baseDamage =  (($attacking->strength * 0.1 + $attacking->accuracy * 0.7 + $attacking->magic * 0.1) - $defending->defence);
                break;
            case 'magic':
                $baseDamage = (($attacking->strength * 0.1 + $attacking->accuracy * 0.1 + $attacking->magic * 0.7) - $defending->defence);
                break;
            default:
                $baseDamage = -15;
                break;
        }

        $randomFactor = mt_rand(75, 125) / 100;
        $damage = $baseDamage * $randomFactor;
        $damage = number_format($damage, 1);

        return max(0, $damage);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
