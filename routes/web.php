<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingController;
//use App\Http\Controllers\Auth\RegisteredUserController; //
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');


    Route::resource('applicant', ApplicantController::class);
    Route::resource('barangay', BarangayController::class);
    Route::resource('program', ProgramController::class);
    Route::resource('user', UserController::class);

    //setting
    Route::get('/setting', [SettingController::class,'index'])->name('setting.index');
    Route::get('/setting/create_date', [SettingController::class,'examDateCreate'])->name('setting.examDateCreate');
    //Route::delete('/setting', [SettingController::class, 'destroy'])->name('profile.destroy');


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
