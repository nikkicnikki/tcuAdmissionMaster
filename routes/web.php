<?php

use App\Http\Controllers\DashbaordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ImportApplicantController;
use App\Http\Controllers\PermitController;


//use App\Http\Controllers\Auth\RegisteredUserController; //
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashbaordController::class, 'index'])->name('dashboard');


    Route::resource('applicant', ApplicantController::class);
    Route::resource('barangay', BarangayController::class);
    Route::resource('program', ProgramController::class);
    Route::resource('user', UserController::class);

    //setting
    Route::get('/setting', [SettingController::class,'index'])->name('setting.index');
    // setting create - redirect to create page
    Route::get('/setting/examdate/create', [SettingController::class,'examDateCreate'])->name('setting.examDateCreate');
    Route::get('/setting/examroom/create', [SettingController::class,'examRoomCreate'])->name('setting.examRoomCreate');
    Route::get('/setting/program/create', [SettingController::class,'programCreate'])->name('setting.programCreate');
    Route::get('/setting/barangay/create', [SettingController::class,'barangayCreate'])->name('setting.barangayCreate');
    // setting Add
    Route::post('/setting/add_date', [SettingController::class,'examDateStore'])->name('date.add');
    Route::post('/setting/add_room', [SettingController::class,'examRoomStore'])->name('room.add');
    Route::post('/setting/add_program', [SettingController::class,'programStore'])->name('program.add');
    Route::post('/setting/add_barangay', [SettingController::class,'barangayStore'])->name('barangay.add');
    // setting Destroy or Delete
    Route::delete('/setting/del_date/{examdate}', [SettingController::class, 'examDateDestroy'])->name('date.delete');
    Route::delete('/setting/del_room/{examroom}', [SettingController::class, 'examRoomDestroy'])->name('room.delete');
    Route::delete('/setting/del_program/{program}', [SettingController::class, 'programDestroy'])->name('program.delete');
    Route::delete('/setting/del_barangay/{barangay}', [SettingController::class, 'barangayDestroy'])->name('barangay.delete');
    // setting Edit - redirect you to edit page with your data as and array or object
    Route::get('/settings/{examdate}/edit_date', [SettingController::class, 'examDateEdit'])->name('date.edit');
    Route::get('/settings/{examroom}/edit_room', [SettingController::class, 'examRoomEdit'])->name('room.edit');
    Route::get('/settings/{program}/edit_program', [SettingController::class, 'programEdit'])->name('program.edit');
    Route::get('/settings/{barangay}/edit_barangay', [SettingController::class, 'barangayEdit'])->name('barangay.edit');
    // setting Update
    Route::put('/settings/update_date/{examdate}', [SettingController::class, 'examDateUpdate'])->name('date.update');
    Route::put('/settings/update_room/{examroom}', [SettingController::class, 'examRoomUpdate'])->name('room.update');
    Route::put('/settings/update_program/{program}', [SettingController::class, 'programUpdate'])->name('program.update');
    Route::put('/settings/update_barangay/{barangay}', [SettingController::class, 'barangayUpdate'])->name('barangay.update');
    // setting Patch
    Route::patch( 'settings/patchRoomLimit/{limit}', [SettingController::class, 'setLimit'] )->name('roomLimit.patch');

    // Validation
    Route::get('/applicant/{applicant}/validate', [ApplicantController::class, 'validate'])->name('applicant.validate');
    // Validation Valid
    Route::put('/applicant/valid/{applicant}', [ApplicantController::class, 'valid'])->name('applicant.valid');
    
    // Scoring
    Route::get('/applicant/{applicantId}/scoring', [ApplicantController::class,'scoring'])->name('applicant.scoring');
    // Score
    Route::put('/applicant/score/{applicantId}/{applicantScore}/{applicantName}', [ApplicantController::class, 'score'])->name('applicant.score');


    // Import Applicant data from Excel file
    Route::get('/excel', [ImportApplicantController::class, 'import' ])->name('import.applicant');
    Route::post('/excel', [ImportApplicantController::class, 'importing' ])->name('importing.applicant');
    //Route::get('/applicant/import', [ApplicantController::class, 'import']);

    // Permit Form
    Route::get('/applicant/{applicant}/permit', [ApplicantController::class, 'permit'])->name('applicant.permit');
    //create Route::put for the update of image_capture

    // Permit PDF then you can print there
    Route::get('/PDF/{applicant_id}/permit_print', [PermitController::class, 'permit_print'])->name('permit.print');
    Route::get('/PDF/{applicant_id}/permit_reprint', [PermitController::class, 'repermit_print'])->name('permit.reprint');
    
    

    // reports PDF
    Route::get('/PDF/date_room/{exam_date_id}/{exam_room_id}/{exam_date}/{exam_room}', [ReportController::class, 'dateRoomList'])->name('dateRoomList.pdf');

    //Route::get('/PDF/{applicant_id}/permit_generate', [PermitController::class, 'permit_generate'])->name('permit.generate');
    //Route::get('/PDF/{applicant}/permit_pdf', [PermitController::class, 'permit_pdf'])->name('permit.pdf');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
