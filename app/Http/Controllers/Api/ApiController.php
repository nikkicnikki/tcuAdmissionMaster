<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Applicant;

class ApiController extends Controller
{
    // public function index()
    // {
    //     return response()->json(['message' => 'API is working!']);
    // }
    public function index()
    {
        $passers = Applicant::with('program')
            ->where('status', 5)
            ->get([
                'id',
                'sr_name',
                'f_name',
                'm_name',
                'prog',  // foreign key
                'sex',
                'bday',
                'bplace',
                'cont',
                'email',
                'curr_add',
                'fb_acc',
                'fb_acc_link',
                'bs_degree',
                'l_schl_att',
                'curr_occ',
                'conn_com_ins',
                'l_serv',
                'gov_id',
                'voter_id',
                'tor',
                'score',
            ]);

        // To include program's name in the response, you can transform the collection:
        $passers->transform(function ($applicant) {
            $applicant->program_name = $applicant->program ? $applicant->program->name : null;
            return $applicant;
        });

        return response()->json($passers);
    }
}