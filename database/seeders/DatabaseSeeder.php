<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Character;
use App\Models\Contest;
use App\Models\Place;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $users = collect();

        for ($i = 1; $i <= 5; $i++) {
            $isAdmin = $i <= 2;

            $user = User::create([
                'email' => 'user' . $i . '@szerveroldali.hu',
                'name' => fake('hu_HU')->firstName(),
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'is_admin' => $isAdmin,
            ]);

            $users->add($user);
        }


        $characters = collect();

        for ($i = 1; $i <= 20; $i++) {
            $defence = rand(0, 3);
            $strength = rand(0, 20-$defence);
            $accuracy = rand(0, 20-$defence-$strength);

            $remainingPoints = 20 - ($defence + $strength + $accuracy);
            $magic = ($remainingPoints >= 0) ? $remainingPoints : 0;

            $user = $users->random();
            $isEnemy = $user->is_admin && (rand(1, 10) <= 9);

            $character = Character::create([
                'name' => fake('is_IS')->lastName(),
                'user_id' => $user->id,
                'defence' => $defence,
                'strength' => $strength,
                'accuracy' => $accuracy,
                'magic' => $magic,
                'is_enemy' => $isEnemy,
            ]);

            $characters->add($character);
        }

        $places = collect();

        $placeImages = [
            "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkV84pIdS6EmsgJs3S79Pfoe2gtqRY0NMy4yWJG2VYCw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFnjdIDfL8t-9o33J25YMkFS4GSSYaYr-IqyY9vheCg&s",
            "https://www.cubecraft.net/attachments/2014-11-04_20-04-00-png.26295/",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBOTqdlXJiedylKzLCqjPzJZ9TrrQzJAhLNFMS1QLMAA&s"
        ];

        for ($i = 1; $i <= 5; $i++) {
            $place = Place::create(
                [
                    'name' => fake('da_DK')->region(),
                    'image' => $placeImages[$i-1],
                    'description' => fake('is_IS')->sentence(),
                ]

            );
            $places->add($place);
        }

        for ($i = 1; $i <= 30; $i++) {
            $userId = Character::pluck('user_id')->unique()->random();


            $attackTypes = ['melee', 'ranged', 'magic'];
            $history = [];

            $heroHealth = 20;
            $enemyHealth = 20;

            while ($heroHealth > 0 && $enemyHealth > 0) {
                $attacker = count($history) % 2 == 0 ? 'hero' : 'enemy';
                $damage = rand(2, 10);
                $history[] = [
                    'attacker' => $attacker,
                    'attackType' => $attackTypes[array_rand($attackTypes)],
                    'damage' => $damage
                ];

                if ($attacker == 'hero') {
                    $enemyHealth -= $damage;
                } else {
                    $heroHealth -= $damage;
                }
            }

            $winner = $heroHealth > 0;

            $contest = Contest::create([
                'user_id' => $userId,
                'place_id' => $places->random()->id,
                'history' => $history,
                'win' => $winner,
            ]);

            $characterId = Character::where('user_id', $userId)->inRandomOrder()->first();
            $enemyId = Character::where('is_enemy', true)->inRandomOrder()->first()->id;

            if ($winner) {
                $contest->characters()->attach($characterId, [
                    'hero_hp' => $heroHealth,
                    'enemy_hp' => 0,
                    'enemy_id' => $enemyId,
                ]);
            } else {
                $contest->characters()->attach($characterId, [
                    'hero_hp' => 0,
                    'enemy_hp' => $enemyHealth,
                    'enemy_id' => $enemyId,
                ]);
            }
        }
    }
}

