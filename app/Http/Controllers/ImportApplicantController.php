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
        
        $request->validate([
            'excel_applicant_data' => [
                'required',
                'file',
            ],
        ]);
        
        Excel::import(new ImportApplicant, $request->file('excel_applicant_data') );

        return redirect()->back()->with('success','Imported Successfully');
    }
}
