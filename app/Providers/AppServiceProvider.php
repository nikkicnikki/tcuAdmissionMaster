<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'error' => function () {
                return session('error');
            },
            'success' => function () {
                return session('success');
            },
            // optionally share more like 'flash' => session('flash')
        ]);
    }
}
