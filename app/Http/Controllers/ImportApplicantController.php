<?php

namespace App\Http\Controllers;

use App\Imports\ImportApplicant;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportApplicantController extends Controller
{
    public function import()
    {
        return view('excel');
    }

    public function importing(Request $request)
    {
        Excel::import(new ImportApplicant, $request->file('excel_applicant_data') );
    }
}
