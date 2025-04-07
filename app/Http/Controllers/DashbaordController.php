<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;

class DashbaordController extends Controller
{
    public function index()
    {
        //$user = auth()->user();

        
        $totalApplicant =  Applicant::count();
        $totalApplicantPending =  Applicant::query()->where('status', 1 )->count();
        $totalApplicantInomplete =  Applicant::query()->where('status', 2 )->count();
        $totalApplicantValid =  Applicant::query()->where('status', 3 )->count();
        $totalApplicantHasPermit =  Applicant::query()->where('status', 4 )->count();
        $totalApplicantScored =  Applicant::query()->where('status', 5 )->count();
        
        return inertia("Dashboard" , 
        compact(
            'totalApplicant', 
            'totalApplicantPending',
            'totalApplicantInomplete',
            'totalApplicantValid',
            'totalApplicantHasPermit',
            'totalApplicantScored',
        ));
    }
}
