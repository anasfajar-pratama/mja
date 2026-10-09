<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| SPA (built React app served by Laravel in production)
|--------------------------------------------------------------------------
| Build the frontend first:  cd frontend && npm run build
| It is emitted into public/app and served here.
*/

$spa = function () {
    $path = public_path('app/index.html');
    abort_unless(is_file($path), 404, 'Frontend belum di-build. Jalankan: cd frontend && npm run build');

    return response()->file($path);
};

Route::get('/', fn () => redirect('/app'));
Route::get('/app', $spa);
Route::get('/app/{any}', $spa)->where('any', '.*');
