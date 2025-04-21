<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use App\Models\User;
use Illuminate\Http\Request;

class ActionLogsController extends Controller
{
    public function index()
    {

        $logs = ActionLog::with('user')->latest()->get();

        return inertia('ActionLogs', [
            'logs' => $logs,
        ]);
    }

    
}
