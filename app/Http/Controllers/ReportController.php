<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function schedule($exam_date_id, $exam_time_id , $exam_room_id, $groupKey)
    {
        // dd($exam_date_id ." ". $exam_room_id ." ". $exam_date ." ". $exam_room);
        $roomDateApplicants = Applicant::where("exam_date", $exam_date_id)
            ->where("exam_time", $exam_time_id)
            ->where("exam_room", $exam_room_id)
            ->select(DB::raw("UPPER(CONCAT(sr_name, ', ', f_name, ' ', m_name )) as NAME , id"))
            ->get();

        return Inertia::render('PDF/RoomDateList', [
            'exam_date_id' => $exam_date_id,
            'exam_time_id' => $exam_time_id,
            'exam_room_id' => $exam_room_id,
            'groupKey' => $groupKey,
            'roomDateApplicants' => $roomDateApplicants,
        ]);
    }

    public function examResult($program_acronym = 'all')
    {
        $type = $program_acronym ? $program_acronym : 'all';

        $exam_result = $program_acronym === 'all' ?
            Applicant::where('status', '=', 5)
            ->with('program:id,acronym,passing_grade')
            ->select('id', 'f_name', 'm_name', 'sr_name', 'prog', 'score')
            ->orderBy('score', 'desc')
            ->get()
            ->map(function ($item) {
                $item->name = strtoupper("{$item->sr_name}, {$item->f_name} {$item->m_name}");
                unset($item->f_name, $item->m_name, $item->sr_name);

                $item->program_acronym = $item->program->acronym;
                $item->passing = $item->program->passing_grade;
                $item->result = $item->score >= $item->passing ? "pass" : "fail";
                unset($item->program);

                return $item;
            })
            :
            Applicant::where('status', '=', 5)
            ->whereHas('program', function ($query) use ($program_acronym) {
                $query->where('acronym', $program_acronym);
            })
            ->with('program:id,name,acronym,passing_grade')
            ->select('id', 'f_name', 'm_name', 'sr_name', 'prog', 'score')
            ->orderBy('score', 'desc')
            ->get()
            ->map(function ($item) {
                $item->name = strtoupper("{$item->sr_name}, {$item->f_name} {$item->m_name}");
                unset($item->f_name, $item->m_name, $item->sr_name);

                $item->program_name = $item->program->name;
                $item->program_acronym = $item->program->acronym;
                $item->passing = $item->program->passing_grade;
                $item->result = $item->score >= $item->passing ? "pass" : "fail";
                unset($item->program);

                return $item;
            });

        return Inertia::render('PDF/ExamResult', [
            'exam_result' => $exam_result,
            'type'=> $type,
        ]);
    }
}
