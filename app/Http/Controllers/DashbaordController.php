<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\ExamDate;
use App\Models\ExamRoom;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
class DashbaordController extends Controller
{
    public function index()
    {
        //$user = auth()->user();


        $totalApplicant = Applicant::count();
        $totalApplicantPending = Applicant::query()->where('status', 1)->count();
        $totalApplicantIncomplete = Applicant::query()->where('status', 2)->count();
        $totalApplicantValid = Applicant::query()->where('status', 3)->count();
        $totalApplicantHasPermit = Applicant::query()->where('status', 4)->count();
        $totalApplicantScored = Applicant::query()->where('status', 5)->count();

        $applicants = Applicant::with(['examDate', 'examRoom'])
            ->where('status', '=', 4)
            ->orderBy('status')
            ->get();

        $havePermitApplicants = $applicants->groupBy(function ($item) {
            return Carbon::parse($item->examDate->exam_date)->format('F j, Y') . ' | ' . $item->examRoom->exam_room;
        });

        // Convert to array so we can return as JSON
        $havePermitApplicants = $havePermitApplicants->map(function ($group) {
            return $group->map(function ($applicant) {
                return [
                    'id' => $applicant->id,
                    'f_name' => $applicant->f_name,
                    'm_name' => $applicant->m_name,
                    'sr_name' => $applicant->sr_name,
                    'exam_date' => $applicant->examDate->exam_date,
                    'exam_room' => $applicant->examRoom->exam_room,
                ];
            });
        });

        return inertia('Dashboard', [
            'totalApplicant' => $totalApplicant,
            'totalApplicantPending' => $totalApplicantPending,
            'totalApplicantIncomplete' => $totalApplicantIncomplete,
            'totalApplicantValid' => $totalApplicantValid,
            'totalApplicantHasPermit' => $totalApplicantHasPermit,
            'totalApplicantScored' => $totalApplicantScored,
            'havePermitApplicants' => $havePermitApplicants,  // Pass the grouped applicants here
        ]);
    }




}
