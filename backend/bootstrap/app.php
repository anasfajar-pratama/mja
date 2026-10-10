<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
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
| On shared hosting the application lives outside the web root and the
| public files are served from a sibling "public_html" directory. When that
| directory holds our front controller, point Laravel at it so public_path(),
| the storage symlink and the SPA route all resolve to the real web root.
| Locally (no sibling public_html) the default public/ directory is used.
*/
$projectRoot = dirname(__DIR__, 2);

for ($dir = dirname($projectRoot); $dir !== dirname($dir); $dir = dirname($dir)) {
    $webRoot = $dir.'/public_html';

    if (is_file($webRoot.'/index.php')) {
        $app->usePublicPath($webRoot);

        break;
    }
}

return $app;
