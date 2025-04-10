<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Program;
use App\Models\User;
use App\Models\ExamDate;
use App\Models\ExamRoom;
use App\Http\Requests\StoreApplicantRequest;
use App\Http\Requests\UpdateApplicantRequest;
use App\Http\Requests\UpdateApplicantVALIDRequest;
use App\Http\Resources\ApplicantResource;
use App\Http\Resources\ApplicantEditResource;
use App\Http\Resources\ApplicantValidateResource;
use App\Http\Resources\ApplicantPermitResource;


use App\Http\Resources\ExamDateResource;
use App\Http\Resources\ExamRoomResource;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Applicant::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $userID = auth()->user()->id;
        $activeDateID = ExamDate::where('status', 2)->value('id'); 
        $examRoomLimit = ExamRoom::where('set_user', $userID)->value('limit');
        $examRoomLimitStatus = Applicant::join('exam_rooms', 'applicants.exam_room', '=', 'exam_rooms.id')
                                    ->where('applicants.exam_date', $activeDateID )
                                    ->where('exam_rooms.set_user', $userID )
                                    ->count();
        
        if (request( "name" )) {
            $query->where(function ($q) {
                $q->where("f_name", "like", "%" . request("name") . "%")
                  ->orWhere("m_name", "like", "%" . request("name") . "%")
                  ->orWhere("sr_name", "like", "%" . request("name") . "%");
            });
        }

        if (request()->has( "status" )) {
            $query->where( "status" , request("status"));
        }

        // If sorting by "name", sort by f_name, m_name, and sr_name
        if ($sortField === "name") {
            $query->orderByRaw("CONCAT(f_name, ' ', m_name, ' ', sr_name) $sortDirection");
        } else {
            $query->orderBy($sortField, $sortDirection);
        }

        $applicants = $query->paginate(20)->onEachSide(1);

        return inertia('Applicant/Index', [
            'applicants' => ApplicantResource::collection($applicants),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'sucType' => session('sucType'),
            'examdate' => ExamDate::all() ,
            'examrooms' =>  ExamRoom::all() ,
            'examRoomLimit' => $examRoomLimit,
            'examRoomLimitStatus' => $examRoomLimitStatus,
        ]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicantRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Applicant $applicant)
    {
        return inertia('Applicant/Show', [
            'applicant' => new ApplicantResource($applicant) , 
        ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Applicant $applicant)
    {
        return inertia('Applicant/Edit', [
            'applicants' => new ApplicantEditResource($applicant) ,
            'programs'   => Program::all() , // Fetch all programs
        ]);
    }

    
    public function validate(Applicant $applicant)
    {
        return inertia('Applicant/Validate', [
            'applicant' => new ApplicantValidateResource($applicant) ,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicantRequest $request, Applicant $applicant)
    {
        $data = $request->validated();
        if ($data['status'] == 1 || $data['status'] == 2) {
            $data['status'] = 2;
        }

        $applicant->update($data);
        $name = ($data['f_name'] ?? '') . ' ' . ($data['m_name'] ?? '') . ' ' . ($data['sr_name'] ?? '');

        return to_route('applicant.index')->with([
            'success' => "Applicant \"$name\" was Updated" ,
            'sucType' => 'edit',
        
        ]);
    }

    public function valid(UpdateApplicantVALIDRequest $request, Applicant $applicant)
    {
        $data = $request->validated();
        $applicant->update($data);
        $name = ($data['f_name'] ?? '') . ' ' . ($data['m_name'] ?? '') . ' ' . ($data['sr_name'] ?? '');

        return to_route('applicant.index')->with([
            'success' => "Applicant \"$name\" was Validated as VALID" ,
            'sucType' => 'success',
        
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Applicant $applicant)
    {
        //
    }


    public function permit(Applicant $applicant)
    {
        return inertia('Applicant/Permit', [
            'applicants' => new ApplicantPermitResource($applicant) ,
            'users'      => User::all() ,    
            'examdates'  => ExamDate::all() ,
            'examrooms'  => ExamRoom::all() ,
        ]);
    }


}
