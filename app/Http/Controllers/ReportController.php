<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function dateRoomList($exam_date_id, $exam_room_id, $exam_date, $exam_room)
    {
        // dd($exam_date_id ." ". $exam_room_id ." ". $exam_date ." ". $exam_room);
        $roomDateApplicants = Applicant::where("exam_date", $exam_date_id)
                                ->where("exam_room", $exam_room_id)
                                ->select(DB::raw("UPPER(CONCAT(sr_name, ', ', f_name, ' ', m_name )) as NAME , id"))
                                ->get();

        return Inertia::render('PDF/RoomDateList', [
            'exam_date_id' => $exam_date_id,
            'exam_room_id' => $exam_room_id,
            'exam_date' => $exam_date,
            'exam_room' => $exam_room,
            'roomDateApplicants' => $roomDateApplicants,
        ]);
    }

}
