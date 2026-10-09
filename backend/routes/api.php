<?php

use App\Http\Controllers\Api\Admin\ResourceController;
use App\Http\Controllers\Api\Admin\SettingsController;
use App\Http\Controllers\Api\Admin\SummaryController;
use App\Http\Controllers\Api\Admin\UploadController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API (read-only)
|--------------------------------------------------------------------------
*/
Route::get('/site', [SiteController::class, 'index']);
Route::get('/settings', [SiteController::class, 'settings']);
Route::get('/gallery', [SiteController::class, 'gallery']);
Route::get('/services/{slug}', [SiteController::class, 'service']);

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin resources (config-driven CRUD in config/cms.php)
    Route::get('/admin/summary', [SummaryController::class, 'index']);
    Route::get('/admin/settings', [SettingsController::class, 'index']);
    Route::put('/admin/settings', [SettingsController::class, 'update']);
    Route::post('/admin/uploads', [UploadController::class, 'store']);

    Route::patch('/admin/{resource}/reorder', [ResourceController::class, 'reorder']);
    Route::get('/admin/{resource}', [ResourceController::class, 'index']);
    Route::post('/admin/{resource}', [ResourceController::class, 'store']);
    Route::get('/admin/{resource}/{id}', [ResourceController::class, 'show']);
    Route::put('/admin/{resource}/{id}', [ResourceController::class, 'update']);
    Route::delete('/admin/{resource}/{id}', [ResourceController::class, 'destroy']);
});
