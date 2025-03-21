<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExamRoom;
use App\Models\ExamDate;
use Carbon\Carbon;

class SettingController extends Controller
{
    public function index()
    {
        $examDateQuery = ExamDate::query(); 
        $examRoomQuery = ExamRoom::query(); 


        $examDates = $examDateQuery->paginate(20)->onEachSide(1);
        $examRooms = $examRoomQuery->paginate(20)->onEachSide(1);

        return inertia('Setting/Index',[
            'examDates' => $examDates,
            'examRooms' => $examRooms,
        ]);
    }
}
