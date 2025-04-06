<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Models\Program;
use App\Models\ExamDate;
use App\Models\ExamRoom;
use App\Http\Resources\ApplicantPermitResource;
use Inertia\Inertia;

class PermitController extends Controller
{

    public function permit_print(Request $request, $applicant_id)
    {
        $applicant = Applicant::findOrFail($applicant_id);

        $applicant->printed_by = $request->input('printed_by');
        $applicant->exam_date = $request->input('exam_date');
        $applicant->exam_room = $request->input('exam_room');
        $applicant->status = 4;
        $applicant->printed_date = now();
        $applicant->save();

    }

    public function permit_generate(Request $request, $applicant_id)
    {
        $applicant = Applicant::findOrFail($applicant_id);

        return Inertia::render('PDF/Print', [
            'applicant' => new ApplicantPermitResource($applicant),
            'exam_date_name' => $request->query('exam_date_name'),
            'exam_room_name' => $request->query('exam_room_name'),
        ]);
    }
}
