<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictIpMiddleware
{
    protected array $allowedIps = [
        '127.0.0.1',
        // Add your IP here if needed
    ];

    public function handle(Request $request, Closure $next): Response
    {
        if (!in_array($request->ip(), $this->allowedIps)) {
            abort(403, 'Access denied: Unauthorized IP.');
        }

        return $next($request);
    }
}
