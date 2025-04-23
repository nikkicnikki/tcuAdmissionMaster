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
use Illuminate\Support\Facades\DB;

class DashbaordController extends Controller
{
    public function index()
    {
        // LIST OF PROGRAM 
        $program = Program::orderBy("created_at", "asc")->get();

        //$user = auth()->user();
        $totalApplicant = Applicant::count();
        $totalApplicantPending = Applicant::query()->where('status', 1)->count();
        $totalApplicantIncomplete = Applicant::query()->where('status', 2)->count();
        $totalApplicantValid = Applicant::query()->where('status', 3)->count();
        $totalApplicantHasPermit = Applicant::query()->where('status', 4)->count();
        $totalApplicantScored = Applicant::query()->where('status', 5)->count();

        $averages = DB::table('applicants')
            ->whereNotNull('score') // filters out null scores
            ->select('prog', DB::raw('ROUND(AVG(score), 2) as average'))
            ->groupBy('prog')
            ->pluck('average', 'prog'); // [prog_id => avg]


        $program_count_perc = Applicant::join('programs', 'applicants.prog', '=', 'programs.id')
            ->select(
                'applicants.prog',
                DB::raw('count(*) as applied'),
                DB::raw('count(applicants.score) as examined'),
                DB::raw('count(CASE WHEN applicants.score >= programs.passing_grade THEN 1 END) as pass'),
                DB::raw('count(CASE WHEN applicants.score < programs.passing_grade THEN 1 END) as failed')
            )
            ->groupBy('applicants.prog')
            ->orderByDesc('examined')
            ->with('program:id,acronym,name,passing_grade')
            ->get()
            ->filter(function ($item) use ($averages) {
                return isset($averages[$item->prog]); // only keep those with valid averages
            })
            ->map(function ($item) use ($totalApplicant, $averages) {
                $item->average = $averages[$item->prog];

                $item->prog_id = $item->program->id ?? null;
                $item->prog_acronym = $item->program->acronym ?? '';
                $item->prog_name = $item->program->name ?? '';
                $item->prog_passing = $item->program->passing_grade ?? 0;

                unset($item->program);
                unset($item->prog);

                $item->examined_perc = $item->applied > 0
                    ? round(($item->examined / $item->applied) * 100, 2)
                    : 0;

                $item->pass_perc = $item->examined > 0
                    ? round(($item->pass / $item->examined) * 100, 2)
                    : 0;

                $item->failed_perc = $item->examined > 0
                    ? round(($item->failed / $item->examined) * 100, 2)
                    : 0;

                $item->percentage = $totalApplicant > 0
                    ? round(($item->applied / $totalApplicant) * 100, 2)
                    : 0;

                return $item;
            });






        // INCOMPLETE
        $incompleteApplicant = Applicant::where('status', '=', 2)
            ->with('program:id,acronym', 'validateBy:id,name,role')
            ->select('id', 'sr_name', 'f_name', 'm_name', 'status', 'prog', 'remarks', 'validate_by')
            ->get()
            ->map(function ($item) {
                $item->name = strtoupper("{$item->sr_name}, {$item->f_name} {$item->m_name}");
                return $item;
            });


        // VALID
        $validatedApplicant = Applicant::whereNotNull('validate_by')
            ->with('program:id,acronym', 'validateBy:id,name,role')
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



        // HAS PERMIT 
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
                    'valid_by_role' => $applicant->validateBy->role,
                    'print_by' => $applicant->printedBy->name,
                    'print_by_role' => $applicant->printedBy->role,
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

            'program_count_perc' => $program_count_perc,

            // incomplete
            'incompleteApplicant' => $incompleteApplicant,

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
