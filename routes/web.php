<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ProfileController;
use App\Models\Character;
use App\Models\Contest;
use App\Models\Place;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//MAIN PAGE
Route::get('/', function () {
    return Inertia::render('index', [
        'characterCount' => Character::count(),
        'contestCount' => Contest::count(),
        'placeCount' => Place::count(),
    ]);
}) -> name('index');

Route::middleware('auth')->group(function () {

    //CHARACTER PAGES
    Route::post('/characters', [CharacterController::class, 'store'])->name('characters.store');
    Route::get('/characters', [CharacterController::class, 'index'])->name('characters.index');
    Route::get('/characters/{character}/edit', [CharacterController::class, 'edit'])->name('characters.edit');
    Route::get('/characters/create', [CharacterController::class, 'create'])->name('characters.create');
    Route::get('/characters/{character}', [CharacterController::class, 'show'])->name('characters.show');
    Route::patch('/characters/{character}', [CharacterController::class, 'update'])->name('characters.update');
    Route::delete('/characters/{character}', [CharacterController::class, 'destroy'])->name('characters.destroy');

    //PLACE PAGES
    Route::get('/places', [PlaceController::class, 'index'])->name('places.index');
    Route::post('/places', [PlaceController::class, 'store'])->name('places.store');
    Route::get('/places/create', [PlaceController::class, 'create'])->name('places.create');
    Route::get('/places/{place}/edit', [PlaceController::class, 'edit'])->name('places.edit');
    // Route::get('/places/{place}', [PlaceController::class, 'index'])->name('places.show');
    Route::patch('/places/{place}', [PlaceController::class, 'update'])->name('places.update');
    Route::delete('/places/{place}', [PlaceController::class, 'destroy'])->name('places.destroy');

    //CONTEST PAGES
    Route::get('/contests/create', [ContestController::class, 'create'])->name('contests.create');
    Route::post('/contests', [ContestController::class, 'store'])->name('contests.store');
    Route::get('/contests/{contest}', [ContestController::class, 'show'])->name('contests.show');
    Route::patch('/contests/{contest}/{attackType}', [ContestController::class, 'update'])->name('contests.update');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';

Route::get('/{any}', function ($any) {
    return redirect()->route('index');
})->where('any', '.*');

