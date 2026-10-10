<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            /*
            | Serves the "public" disk under /storage without a filesystem
            | symlink, which some shared hosts (e.g. Hostinger) disable.
            */
            Route::get('/storage/{path}', function (string $path) {
                abort_if(str_contains($path, '..'), 404);

                $file = Storage::disk('public')->path($path);

                abort_unless(is_file($file), 404);

                return response()->file($file);
            })->where('path', '.*');
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn ($request) => $request->is('api/*') || $request->expectsJson()
        );
    })->create();

/*
|--------------------------------------------------------------------------
| Public / web directory
|--------------------------------------------------------------------------
| On shared hosting the application lives outside the web root, so Laravel
| must be told where the public files actually are. The document root of the
| running front controller is used first, which stays correct for subdomains
| whose web root is nested inside another vhost's public_html. For console
| commands we fall back to a sibling "public_html" directory. Locally (no
| document root, no sibling public_html) the default public/ is used.
*/
$webRoot = null;

$documentRoot = $_SERVER['DOCUMENT_ROOT'] ?? null;

if ($documentRoot && is_file($documentRoot.'/index.php')) {
    $webRoot = $documentRoot;
}

if ($webRoot === null) {
    $projectRoot = dirname(__DIR__, 2);

    for ($dir = dirname($projectRoot); $dir !== dirname($dir); $dir = dirname($dir)) {
        if (is_file($dir.'/public_html/index.php')) {
            $webRoot = $dir.'/public_html';

            break;
        }
    }
}

if ($webRoot !== null) {
    $app->usePublicPath($webRoot);
}

return $app;
