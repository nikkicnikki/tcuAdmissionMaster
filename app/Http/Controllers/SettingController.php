<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;

use App\Models\Barangay;
use App\Http\Requests\StoreBarangayRequest;
use App\Http\Requests\UpdateBarangayRequest;

use App\Models\ExamDate;
use App\Http\Requests\StoreExamDateRequest;
use App\Http\Requests\UpdateExamDateRequest;

use App\Models\ExamRoom;
use App\Http\Requests\StoreExamRoomRequest;
use App\Http\Requests\UpdateExamRoomRequest;

use Carbon\Carbon;

class SettingController extends Controller
{
    public function index()
    {
        $examDateQuery = ExamDate::query(); 
        $examRoomQuery = ExamRoom::query();
        $programQuery  = Program::query(); 
        $barangayQuery  = Barangay::query(); 


        $examDates = $examDateQuery->paginate(20)->onEachSide(1);
        $examRooms = $examRoomQuery->paginate(20)->onEachSide(1);
        $programs = $programQuery->paginate(20)->onEachSide(1);
        $barangays = $barangayQuery->paginate(50)->onEachSide(1);

        return inertia('Setting/Index',[
            'examDates' => $examDates,
            'examRooms' => $examRooms,
            'programs'  => $programs,
            'barangays' => $barangays,
        ]);
    }

    public function examDateCreate()
    {
        // do something here
        return inertia("Setting/DateCreate");
    }

    public function examRoomCreate()
    {
        return inertia("Setting/RoomCreate");
    }

    public function programCreate()
    {
        return inertia("Setting/ProgramCreate");
    }

    public function barangayCreate()
    {
        return inertia("Setting/BarangayCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function examDateStore(StoreExamDateRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        ExamDate::create($data);

        return to_route('setting.index');

    }

    public function examRoomStore(StoreExamRoomRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        ExamRoom::create($data);

        return to_route('setting.index');

    }

    public function programStore(StoreProgramRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        Program::create($data);

        return to_route('setting.index');

    }


    public function barangayStore(StoreBarangayRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        Barangay::create($data);

        return to_route('setting.index');

    }
}
