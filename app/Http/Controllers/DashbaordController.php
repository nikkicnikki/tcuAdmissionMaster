<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\ExamDate;
use App\Models\ExamRoom;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class DashbaordController extends Controller
{
    public function index()
    {
        // LIST OF PROGRAM 
        $program = Program::orderBy("created_at", "asc")->get();

        $pendingApplicant = Applicant::where('status', '=', 2)
                                    ->with('program:id,acronym', 'validateBy:id,name,role' )
                                    ->select('id', 'sr_name', 'f_name', 'm_name', 'status','prog', 'remarks', 'validate_by')
                                    ->get()
                                    ->map(function ($item) {
                                        $item->name = strtoupper("{$item->sr_name}, {$item->f_name} {$item->m_name}");
                                        return $item;
                                    });

       
        // VALID
        $validatedApplicant = Applicant::whereNotNull('validate_by')
                                ->with('program:id,acronym', 'validateBy:id,name,role' )        
                                ->select('id', 'sr_name', 'f_name', 'm_name', 'status', 'prog', 'validate_by')
                                ->get()
                                ->map(function ($item) {
                                    $item->name = strtoupper("{$item->sr_name}, {$item->f_name} {$item->m_name}");
                                    return $item;
                                });
        

        // SCORE
        $withScoreList = Applicant::whereNotNull('score_by')->with('program:id,name,acronym,passing_grade', 'scoreBy:id,name,role')
            ->select('id', 'sr_name', 'f_name', 'm_name', 'status', 'score', 'prog', 'score_by')
            ->orderBy('score', 'desc')
            ->get()
            ->map(function ($item) {
                $item->name = strtoupper("{$item->sr_name}, {$item->f_name} {$item->m_name}");
                return $item;
            });




        //$user = auth()->user();
        $totalApplicant = Applicant::count();
        $totalApplicantPending = Applicant::query()->where('status', 1)->count();
        $totalApplicantIncomplete = Applicant::query()->where('status', 2)->count();
        $totalApplicantValid = Applicant::query()->where('status', 3)->count();
        $totalApplicantHasPermit = Applicant::query()->where('status', 4)->count();
        $totalApplicantScored = Applicant::query()->where('status', 5)->count();

        //----------------HAS PERMIT MODULE-----------------------
        $scheduleListCount = Applicant::with('examDate')
            ->whereNotNull('exam_date')
            // ->where('status', '=' , 4)
            ->groupBy('exam_date')
            ->select('exam_date')
            ->selectRaw('exam_date, COUNT(*) as total')
            ->get()
            ->map(function ($item) {
                return [
                    'exam_date' => Carbon::parse($item->examDate->exam_date)->format('F j, Y'),
                    'total' => $item->total,
                ];
            });


        // GET THE SET LIMIT FROM SETTINGS FORM
        // go the first row of the ExamRoom and get the value of the column field 'limit'
        $roomLimit = optional(ExamRoom::first())->limit ?? 0;

        $applicants = Applicant::with(['examDate', 'examRoom', 'validateBy', 'printedBy'])
            ->whereNotNull('exam_date')
            // ->where('status', '=', 4)
            ->orderBy('exam_date')
            ->get();

        $havePermitApplicants = $applicants->groupBy(function ($item) {
            return Carbon::parse($item->examDate->exam_date)->format('F j, Y') . ' | Rm. ' . $item->examRoom->exam_room;
        });

        // Convert to array so we can return as JSON
        $havePermitApplicants = $havePermitApplicants->map(function ($group) {
            return $group->map(function ($applicant) {
                return [
                    'id' => $applicant->id,
                    'f_name' => $applicant->f_name,
                    'm_name' => $applicant->m_name,
                    'sr_name' => $applicant->sr_name,
                    'status' => $applicant->status,
                    'exam_date_id' => $applicant->examDate->id,
                    'exam_room_id' => $applicant->examRoom->id,
                    'exam_date' => $applicant->examDate->exam_date,
                    'exam_room' => $applicant->examRoom->exam_room,
                    'valid_by' => $applicant->validateBy->name,
                    'print_by' => $applicant->printedBy->name,
                    'print_by_id' => $applicant->printedBy->id,
                ];
            });
        });

        return inertia('Dashboard', [
            
            'programs' => $program,
            'totalApplicant' => $totalApplicant,
            'totalApplicantPending' => $totalApplicantPending,
            'totalApplicantIncomplete' => $totalApplicantIncomplete,
            'totalApplicantValid' => $totalApplicantValid,
            'totalApplicantHasPermit' => $totalApplicantHasPermit,
            'totalApplicantScored' => $totalApplicantScored,

            // pending
            'pendingApplicant' => $pendingApplicant,

            // valid
            'validatedApplicant' => $validatedApplicant,

            // has permit
            'havePermitApplicants' => $havePermitApplicants,  // Pass the grouped applicants here
            'roomLimit' => $roomLimit,
            'scheduleListCount' => $scheduleListCount,

            // score
            'withScoreList' => $withScoreList,

        ]);
    }
}
