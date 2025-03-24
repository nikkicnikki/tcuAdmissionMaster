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
    // setting create
    Route::get('/setting/examdate/create', [SettingController::class,'examDateCreate'])->name('setting.examDateCreate');
    Route::get('/setting/examroom/create', [SettingController::class,'examRoomCreate'])->name('setting.examRoomCreate');
    Route::get('/setting/program/create', [SettingController::class,'programCreate'])->name('setting.programCreate');
    Route::get('/setting/barangay/create', [SettingController::class,'barangayCreate'])->name('setting.barangayCreate');

    Route::post('/setting/add_date', [SettingController::class,'examDateStore'])->name('date.add');
    Route::post('/setting/add_room', [SettingController::class,'examRoomStore'])->name('room.add');
    Route::post('/setting/program', [SettingController::class,'programStore'])->name('program.add');
    Route::post('/setting/barangay', [SettingController::class,'barangayStore'])->name('barangay.add');
    //Route::delete('/setting', [SettingController::class, 'destroy'])->name('profile.destroy');


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
