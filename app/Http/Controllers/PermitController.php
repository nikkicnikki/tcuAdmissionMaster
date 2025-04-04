<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Models\Program;
use App\Models\ExamDate;
use App\Models\ExamRoom;
use App\Http\Resources\ApplicantPermitResource;

class PermitController extends Controller
{
    public function permit_pdf(Applicant $applicant)
    {
        //dd(ExamRoom::all());

        return inertia('PDF/Print', [
            'applicant' => new ApplicantPermitResource($applicant) , 
            'examroom'  => ExamRoom::all(),
            'examdate'  => ExamDate::all(),
        ]);
    }
}
