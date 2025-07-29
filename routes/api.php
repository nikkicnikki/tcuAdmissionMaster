<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;

Route::get('/admission/passers', [ApiController::class, 'index']);

Route::get('/test', function () {
    return response()->json(['status' => 'api route works']);
});